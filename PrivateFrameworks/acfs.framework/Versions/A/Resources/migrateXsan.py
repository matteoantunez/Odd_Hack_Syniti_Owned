#!/usr/bin/python

import os
import plistlib
import shutil
import socket
import subprocess
import tempfile
import uuid
import syslog

CONFIG_PATH = '/Library/Preferences/Xsan/'

lspBase = "/Library/Server/Previous/"
ldapBase = lspBase + "/private/etc/openldap"
prefsFile = lspBase + "/Library/Preferences/com.apple.openldap.plist"
ldapvBase = lspBase + "/private/var/db/openldap"
slapconfigBin = "/usr/sbin/slapconfig"


def ldapDataPresent():
    try:
        dir1 = os.listdir(ldapBase)
    except Exception as e:
        if e.errno == 2:
            dir1 = {}
        else:
            raise e
    try:
        dir2 = os.listdir(ldapvBase)
    except Exception as e:
        if e.errno == 2:
            dir2 = {}
        else:
            raise e
    if (len(dir1) > 0) and (len(dir2) > 0):
        return True
    else:
        return False

def getPreviousSystemVersion():
    previousSystemVersionPath = lspBase + ".previousSystemVersion"
    try:
        prevFile = open(previousSystemVersionPath, mode="r")
    except OSError as e:
        if e.errno == 2:
            syslog.syslog(2, "migrateXsan.py: Unable to find previous system version")
        return None
    except Exception as e:
        return None
    fileData = None
    try:
        fileData = prevFile.read()
    finally:
        prevFile.close()
    return fileData.strip()

def isODMaster():
    rv = False
    try:
        prefs = plistlib.readPlist(prefsFile)

        isServer = prefs.get('LDAPSERVER', False)
        if isServer == False:
            isServer = prefs.get('OLDLDAPSERVER', False)

        isReplica = prefs.get('LDAPREPLICA', False)

        if isServer:
            if isReplica:
                rv = False
            else:
                rv = True
    except Exception as e:
        rv = False
    return rv

def migrateOD():
    if ldapDataPresent():
        syslog.syslog(5, "migrateXsan.py: Found ldap data")
        prevVers = getPreviousSystemVersion()
        if prevVers is None:
            syslog.syslog(2, "migrateXsan.py: Unable to migrate ldap data, can't find previous system version")
            return

        if isODMaster():
            # slapconfig -migrateldapserver 0 /Library/Server/Previous / <previous OS version> os_install en
            args = [ slapconfigBin, "-migrateldapserver", "0", lspBase, "/", prevVers, "os_install", "en" ]
            try:
                output = subprocess.check_output(args, stderr=subprocess.STDOUT)
            except subprocess.CalledProcessError as e:
                syslog.syslog(2, "migrateXsan.py: migrateldapserver failed")
                return
            syslog.syslog(5, "migrateXsan.py: migrateldapserver completed")
        else:
            syslog.syslog(5, "migrateXsan.py: Not an OD Master, no work to do")
    else:
        syslog.syslog(5, "migrateXsan.py: No ldap data present, no work to do")

def getProfilePlist():
    tmpdirname = tempfile.mkdtemp()
    rv = None
    try:
        f = tmpdirname + "/profiles"
        subprocess.call(["/usr/bin/profiles","-C","-o",f])
        rv = plistlib.readPlist(f+'.plist')
    finally:
        shutil.rmtree(tmpdirname)
    return rv

def getConfigPlist():
    tmpdirname = tempfile.mkdtemp()
    rv = None
    try:
        f = tmpdirname + "/config.plist"
        # get config.plist in xml format
        subprocess.call(["/usr/bin/plutil","-convert","xml1","-o",f,CONFIG_PATH+'/config.plist'])
        rv = plistlib.readPlist(f)
    finally:
        shutil.rmtree(tmpdirname)
    return rv

def checkForXsanProfile():
    pl = getProfilePlist()
    if not pl or not '_computerlevel' in pl:
        return (0, None)
    for p in pl['_computerlevel']:
        for pay in p['ProfileItems']:
            if pay['PayloadType'] != 'com.apple.xsan':
                continue
            return (1, p)
    return (0, None)

def checkIfXsanClient():
    try:
        pl = getConfigPlist()
    except IOError:
        return (0, None)
    else:
        if not 'role' in pl:
            return (0, None)
        if pl['role'].lower() == 'client':
            return (1, pl)
        else:
            return (0, None)

def setXsanNeedsActivation():
    try:
        pl = getConfigPlist()
    except IOError:
        return 0
    pl['needsActivation'] = True
    plistlib.writePlist(pl, '/Library/Preferences/Xsan/config.plist')
    return 1
    

def buildProfile(pl):
    payload = { 'PayloadDisplayName' : 'Xsan Configuration',
        'PayloadEnabled' : True,
        'PayloadIdentifier' : 'com.apple.xsan.111',
        'PayloadType' : 'com.apple.xsan',
        'PayloadVersion' : 1}
    print(payload)
    payload['sanName'] = pl['sanName']
    payload['sanAuthMethod'] = 'auth_secret'
    print(payload)
    if 'ownerName' in pl:
        payload['ownerName'] = pl['ownerName']
    if 'ownerEmail' in pl:
        payload['ownerEmail'] = pl['ownerEmail']
    payload['PayloadUUID'] = str(uuid.uuid4())
    try:
        a_s = open(CONFIG_PATH+'.auth_secret', "rb").read()
    except IOError:
        pass
    else:
        payload['sharedSecret'] = str(a_s)
    fsn = list()
    for l in open(CONFIG_PATH+'fsnameservers', "rb"):
        if len(l) < 7:
            continue
        l = str(l).strip()
        if ':' in l:
            af = socket.AF_INET6
        else:
            af = socket.AF_INET
        try:
            g = socket.inet_pton(af, l)
        except OSError:
            print("Oopsie", af)
            continue
        fsn.append(l)
    payload['fsnameservers'] = fsn
    payload['xsanPayloadSource'] = 'migrateXsan.py:546'

    #
    # We now have the payload. Build a profile around it
    profile = {'PayloadDisplayName' : 'Xsan Configuration Profile',
        'PayloadIdentifier' : 'com.apple.xsan.112',
        'PayloadRemovalDisallowed' : False,
        'PayloadScope' : 'System',
        'PayloadType' : 'Configuration',
        'PayloadVersion' : 1 }
    profile['PayloadUUID'] = str(uuid.uuid4())
    p1 = list()
    p1.append(payload)
    profile['PayloadContent'] = p1
    return(profile)

def instalProfile(pl):
    '''Given a client config.plist, build and install a Configuration Profile
for it
'''
    pro = buildProfile(pl)
    tmpdirname = tempfile.mkdtemp()
    rv = None
    try:
        f = tmpdirname + "/new_xsan_profile.configprofile"
        plistlib.writePlist(pro, f)
        rv = subprocess.call(["/usr/bin/profiles","-I","-F",f])
    finally:
        shutil.rmtree(tmpdirname)
    return rv

def disableXsan():
    subprocess.call(["/bin/launchctl", 'unload', '-w',
                     '/System/Library/LaunchDaemons/com.apple.xsan.plist'])

def enableXsan():
    subprocess.call(["/bin/launchctl", 'load', '-w',
			'/System/Library/LaunchDaemons/com.apple.xsan.plist'])

if __name__ == '__main__':
    xprofile = checkForXsanProfile()
    if xprofile[0]:
        rv = checkIfXsanClient()
        if rv[0]:
            syslog.syslog(5, "migrateXsan.py: enabling Xsan due to existing profile")
            enableXsan()
            subprocess.call(["/System/Library/Filesystems/acfs.fs/Contents/bin/xsanctl", 'firstBoot'])
        else:
            syslog.syslog(5, "migrateXsan.py: disabling xsan and unloading profile")
            disableXsan()
            if setXsanNeedsActivation():
                subprocess.call(["/usr/bin/profiles","-R","-p",xprofile[1]['ProfileIdentifier']])
            else:
                syslog.syslog(2, "migrateXsan.py: Error flagging Xsan for activation");
            migrateOD()
    else:
        rv = checkIfXsanClient()
        #if rv[0]:
        #    print("migrateXsan.py: building client profile for exisitng config")
        #    instalProfile(rv[1])
        #else:
        syslog.syslog(5, "migrateXsan.py: disabling xsan")
        disableXsan()
        if not rv[0]:
            # If we are a controller, add "needsActivation". We set this independent of our seeing an
            # Xsan 3 config (no sanConfigURLs) or an Xsan 4 config (sanConfigURLs). servermgr_san will
            # handle it all correctly
            syslog.syslog(5, "migrateXsan.py: flagging for activation")
            setXsanNeedsActivation()
            migrateOD()

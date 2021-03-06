'----------------------------------------------------------------------
'
' Copyright (c) Microsoft Corporation. All rights reserved.
'
' Abstract:
' prnport.vbs - Port script for WMI on Windows 
'     used to add, delete and list ports
'     also for getting and setting the port configuration
'
' Usage:
' prnport [-adlgt?] [-r port] [-s server] [-u user name] [-w password]
'                   [-o raw|lpr] [-h host address] [-q queue] [-n number]
'                   [-me | -md ] [-i SNMP index] [-y community] [-2e | -2d]"
'
' Examples
' prnport -a -s server -r IP_1.2.3.4 -e 1.2.3.4 -o raw -n 9100
' prnport -d -s server -r c:\temp\foo.prn
' prnport -l -s server
' prnport -g -s server -r IP_1.2.3.4
' prnport -t -s server -r IP_1.2.3.4 -me -y public -i 1 -n 9100
'
'----------------------------------------------------------------------

option explicit

'
' Debugging trace flags, to enable debug output trace message
' change gDebugFlag to true.
'
dim   gDebugFlag
const kDebugTrace = 1
const kDebugError = 2

gDebugFlag = false

'
' Operation action values.
'
const kActionAdd          = 0
const kActionDelete       = 1
const kActionList         = 2
const kActionUnknown      = 3
const kActionGet          = 4
const kActionSet          = 5

const kErrorSuccess       = 0
const KErrorFailure       = 1

const kFlagCreateOrUpdate = 0

const kNameSpace          = "root\cimv2"


'
' Constants for the parameter dictionary
'
const kServerName      = 1
const kPortName        = 2
const kDoubleSpool     = 3
const kPortNumber      = 4
const kPortType        = 5
const kHostAddress     = 6
const kSNMPDeviceIndex = 7
const kCommunityName   = 8
const kSNMP            = 9
const kQueueName       = 10
const kUserName        = 11
const kPassword        = 12

'
' Generic strings
'
const L_Empty_Text                 = ""
const L_Space_Text                 = " "
const L_Colon_Text                 = ":"
const L_LPR_Queue                  = "LPR"
const L_Error_Text                 = "Error"
const L_Success_Text               = "Success"
const L_Failed_Text                = "Failed"
const L_Hex_Text                   = "0x"
const L_Printer_Text               = "Printer"
const L_Operation_Text             = "Operation"
const L_Provider_Text              = "Provider"
const L_Description_Text           = "Description"
const L_Debug_Text                 = "Debug:"

'
' General usage messages
'
const L_Help_Help_General01_Text   = "Usage: prnport [-adlgt?] [-r port][-s server][-u user name][-w password]"
const L_Help_Help_General02_Text   = "               [-o raw|lpr][-h host address][-q queue][-n number]"
const L_Help_Help_General03_Text   = "               [-me | -md ][-i SNMP index][-y community][-2e | -2d]"
const L_Help_Help_General04_Text   = "Arguments:"
const L_Help_Help_General05_Text   = "-a     - add a port"
const L_Help_Help_General06_Text   = "-d     - delete the specified port"
const L_Help_Help_General07_Text   = "-g     - get configuration for a TCP port"
const L_Help_Help_General08_Text   = "-h     - IP address of the device"
const L_Help_Help_General09_Text   = "-i     - SNMP index, if SNMP is enabled"
const L_Help_Help_General10_Text   = "-l     - list all TCP ports"
const L_Help_Help_General11_Text   = "-m     - SNMP type. [e] enable, [d] disable"
const L_Help_Help_General12_Text   = "-n     - port number, applies to TCP RAW ports"
const L_Help_Help_General13_Text   = "-o     - port type, raw or lpr"
const L_Help_Help_General14_Text   = "-q     - queue name, applies to TCP LPR ports only"
const L_Help_Help_General15_Text   = "-r     - port name"
const L_Help_Help_General16_Text   = "-s     - server name"
const L_Help_Help_General17_Text   = "-t     - set configuration for a TCP port"
const L_Help_Help_General18_Text   = "-u     - user name"
const L_Help_Help_General19_Text   = "-w     - password"
const L_Help_Help_General20_Text   = "-y     - community name, if SNMP is enabled"
const L_Help_Help_General21_Text   = "-2     - double spool, applies to TCP LPR ports. [e] enable, [d] disable"
const L_Help_Help_General22_Text   = "-?     - display command usage"
const L_Help_Help_General23_Text   = "Examples:"
const L_Help_Help_General24_Text   = "prnport -l -s server"
const L_Help_Help_General25_Text   = "prnport -d -s server -r IP_1.2.3.4"
const L_Help_Help_General26_Text   = "prnport -a -s server -r IP_1.2.3.4 -h 1.2.3.4 -o raw -n 9100"
const L_Help_Help_General27_Text   = "prnport -t -s server -r IP_1.2.3.4 -me -y public -i 1 -n 9100"
const L_Help_Help_General28_Text   = "prnport -g -s server -r IP_1.2.3.4"
const L_Help_Help_General29_Text   = "prnport -a -r IP_1.2.3.4 -h 1.2.3.4"
const L_Help_Help_General30_Text   = "Remark:"
const L_Help_Help_General31_Text   = "The last example will try to get the device settings at the specified IP address."
const L_Help_Help_General32_Text   = "If a device is detected, then a TCP port is added with the preferred settings for that device."

'
' Messages to be displayed if the scripting host is not cscript
'
const L_Help_Help_Host01_Text      = "This script should be executed from the Command Prompt using CScript.exe."
const L_Help_Help_Host02_Text      = "For example: CScript script.vbs arguments"
const L_Help_Help_Host03_Text      = ""
const L_Help_Help_Host04_Text      = "To set CScript as the default application to run .VBS files run the following:"
const L_Help_Help_Host05_Text      = "     CScript //H:CScript //S"
const L_Help_Help_Host06_Text      = "You can then run ""script.vbs arguments"" without preceding the script with CScript."

'
' General error messages
'
const L_Text_Error_General01_Text  = "The scripting host could not be determined."
const L_Text_Error_General02_Text  = "Unable to parse command line."
const L_Text_Error_General03_Text  = "Win32 error code"

'
' Miscellaneous messages
'
const L_Text_Msg_General01_Text    = "Added port"
const L_Text_Msg_General02_Text    = "Unable to delete port"
const L_Text_Msg_General03_Text    = "Unable to get port"
const L_Text_Msg_General04_Text    = "Created/updated port"
const L_Text_Msg_General05_Text    = "Unable to create/update port"
const L_Text_Msg_General06_Text    = "Unable to enumerate ports"
const L_Text_Msg_General07_Text    = "Number of ports enumerated"
const L_Text_Msg_General08_Text    = "Deleted port"
const L_Text_Msg_General09_Text    = "Unable to get SWbemLocator object"
const L_Text_Msg_General10_Text    = "Unable to connect to WMI service"


'
' Port properties
'
const L_Text_Msg_Port01_Text       = "Server name"
const L_Text_Msg_Port02_Text       = "Port name"
const L_Text_Msg_Port03_Text       = "Host address"
const L_Text_Msg_Port04_Text       = "Protocol RAW"
const L_Text_Msg_Port05_Text       = "Protocol LPR"
const L_Text_Msg_Port06_Text       = "Port number"
const L_Text_Msg_Port07_Text       = "Queue"
const L_Text_Msg_Port08_Text       = "Byte Count Enabled"
const L_Text_Msg_Port09_Text       = "Byte Count Disabled"
const L_Text_Msg_Port10_Text       = "SNMP Enabled"
const L_Text_Msg_Port11_Text       = "SNMP Disabled"
const L_Text_Msg_Port12_Text       = "Community"
const L_Text_Msg_Port13_Text       = "Device index"

'
' Debug messages
'
const L_Text_Dbg_Msg01_Text        = "In function DelPort"
const L_Text_Dbg_Msg02_Text        = "In function CreateOrSetPort"
const L_Text_Dbg_Msg03_Text        = "In function ListPorts"
const L_Text_Dbg_Msg04_Text        = "In function GetPort"
const L_Text_Dbg_Msg05_Text        = "In function ParseCommandLine"

main

'
' Main execution starts here
'
sub main

    on error resume next

    dim iAction
    dim iRetval
    dim oParamDict

    '
    ' Abort if the host is not cscript
    '
    if not IsHostCscript() then

        call wscript.echo(L_Help_Help_Host01_Text & vbCRLF & L_Help_Help_Host02_Text & vbCRLF & _
                          L_Help_Help_Host03_Text & vbCRLF & L_Help_Help_Host04_Text & vbCRLF & _
                          L_Help_Help_Host05_Text & vbCRLF & L_Help_Help_Host06_Text & vbCRLF)

        wscript.quit

    end if

    set oParamDict = CreateObject("Scripting.Dictionary")

    iRetval = ParseCommandLine(iAction, oParamDict)

    if iRetval = 0 then

        select case iAction

            case kActionAdd
                iRetval = CreateOrSetPort(oParamDict)

            case kActionDelete
                iRetval = DelPort(oParamDict)

            case kActionList
                iRetval = ListPorts(oParamDict)

            case kActionGet
                iRetVal = GetPort(oParamDict)

            case kActionSet
                iRetVal = CreateOrSetPort(oParamDict)

            case else
                Usage(true)
                exit sub

        end select

    end if

end sub

'
' Delete a port
'
function DelPort(oParamDict)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg01_Text
    DebugPrint kDebugTrace, L_Text_Msg_Port01_Text & L_Space_Text & oParamDict(kServerName)
    DebugPrint kDebugTrace, L_Text_Msg_Port02_Text & L_Space_Text & oParamDict(kPortName)

    dim oService
    dim oPort
    dim iResult
    dim strServer
    dim strPort
    dim strUser
    dim strPassword

    iResult = kErrorFailure

    strServer   = oParamDict(kServerName)
    strPort     = oParamDict(kPortName)
    strUser     = oParamDict(kUserName)
    strPassword = oParamDict(kPassword)

    if WmiConnect(strServer, kNameSpace, strUser, strPassword, oService) then

        set oPort = oService.Get("Win32_TCPIPPrinterPort='" & strPort & "'")

    else

        DelPort = kErrorFailure

        exit function

    end if

    '
    ' Check if Get succeeded
    '
    if Err.Number = kErrorSuccess then

        '
        ' Try deleting the instance
        '
        oPort.Delete_

        if Err.Number = kErrorSuccess then

            wscript.echo L_Text_Msg_General08_Text & L_Space_Text & strPort

        else

            wscript.echo L_Text_Msg_General02_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                         & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

            '
            ' Try getting extended error information
            '
            call LastError()

        end if

    else

        wscript.echo L_Text_Msg_General02_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

        '
        ' Try getting extended error information
        '
        call LastError()

    end if

    DelPort = iResult

end function

'
' Add or update a port
'
function CreateOrSetPort(oParamDict)

    on error resume next

    dim oPort
    dim oService
    dim iResult
    dim PortType
    dim strServer
    dim strPort
    dim strUser
    dim strPassword

    DebugPrint kDebugTrace, L_Text_Dbg_Msg02_Text
    DebugPrint kDebugTrace, L_Text_Msg_Port01_Text & L_Space_Text & oParamDict.Item(kServerName)
    DebugPrint kDebugTrace, L_Text_Msg_Port02_Text & L_Space_Text & oParamDict.Item(kPortName)
    DebugPrint kDebugTrace, L_Text_Msg_Port06_Text & L_Space_Text & oParamDict.Item(kPortNumber)
    DebugPrint kDebugTrace, L_Text_Msg_Port07_Text & L_Space_Text & oParamDict.Item(kQueueName)
    DebugPrint kDebugTrace, L_Text_Msg_Port13_Text & L_Space_Text & oParamDict.Item(kSNMPDeviceIndex)
    DebugPrint kDebugTrace, L_Text_Msg_Port12_Text & L_Space_Text & oParamDict.Item(kCommunityName)
    DebugPrint kDebugTrace, L_Text_Msg_Port03_Text & L_Space_Text & oParamDict.Item(kHostAddress)

    strServer   = oParamDict(kServerName)
    strPort     = oParamDict(kPortName)
    strUser     = oParamDict(kUserName)
    strPassword = oParamDict(kPassword)

    '
    ' If the port exists, then get the settings. Later PutInstance will do an update
    '
    if WmiConnect(strServer, kNameSpace, strUser, strPassword, oService) then

        set oPort = oService.Get("Win32_TCPIPPrinterPort.Name='" & strPort & "'")

        '
        ' If get was unsuccessful then spawn a new port instance. Later PutInstance will do a create
        '
        if Err.Number <> kErrorSuccess then

            '
            ' Clear the previous error
            '
            Err.Clear

            set oPort = oService.Get("Win32_TCPIPPrinterPort").SpawnInstance_

        end if

    else

        CreateOrSetPort = kErrorFailure

        exit function

    end if

    if Err.Number <> kErrorSuccess then

        wscript.echo L_Text_Msg_General03_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

        CreateOrSetPort = kErrorFailure

        exit function

    end if

    oPort.Name          = oParamDict.Item(kPortName)
    oPort.HostAddress   = oParamDict.Item(kHostAddress)
    oPort.PortNumber    = oParamDict.Item(kPortNumber)
    oPort.SNMPEnabled   = oParamDict.Item(kSNMP)
    oPort.SNMPDevIndex  = oParamDict.Item(kSNMPDeviceIndex)
    oPort.SNMPCommunity = oParamDict.Item(kCommunityName)
    oPort.Queue         = oParamDict.Item(kQueueName)
    oPort.ByteCount     = oParamDict.Item(kDoubleSpool)

    PortType     = oParamDict.Item(kPortType)

    '
    ' Update the port object with the settings corresponding
    ' to the port type of the port to be added
    '
    select case lcase(PortType)

            case "raw"

                 oPort.Protocol      = 1

                 if Not IsNull(oPort.Queue) then

                     wscript.echo L_Error_Text & L_Colon_Text & L_Space_Text _
                     & L_Help_Help_General14_Text

                     CreateOrSetPort = kErrorFailure

                     exit function

                 end if

            case "lpr"

                 oPort.Protocol      = 2

                 if IsNull(oPort.Queue) then

                     oPort.Queue = L_LPR_Queue

                 end if

            case else

                 '
                 ' PutInstance will attempt to get the configuration of
                 ' the device based on its IP address. Those settings
                 ' will be used to add a new port
                 '
    end select

    '
    ' Try creating or updating the port
    '
    oPort.Put_(kFlagCreateOrUpdate)

    if Err.Number = kErrorSuccess then

        wscript.echo L_Text_Msg_General04_Text & L_Space_Text & oPort.Name

        iResult = kErrorSuccess

    else

        wscript.echo L_Text_Msg_General05_Text & L_Space_Text & oPort.Name & L_Space_Text _
                     & L_Error_Text & L_Space_Text & L_Hex_Text & hex(Err.Number) _
                     & L_Space_Text & Err.Description

        '
        ' Try getting extended error information
        '
        call LastError()

        iResult = kErrorFailure

    end if

    CreateOrSetPort = iResult

end function

'
' List ports on a machine.
'
function ListPorts(oParamDict)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg03_Text

    dim Ports
    dim oPort
    dim oService
    dim iRetval
    dim iTotal
    dim strServer
    dim strUser
    dim strPassword

    iResult = kErrorFailure

    strServer   = oParamDict(kServerName)
    strUser     = oParamDict(kUserName)
    strPassword = oParamDict(kPassword)

    if WmiConnect(strServer, kNameSpace, strUser, strPassword, oService) then

        set Ports = oService.InstancesOf("Win32_TCPIPPrinterPort")

    else

        ListPorts = kErrorFailure

        exit function

    end if

    if Err.Number <> kErrorSuccess then

        wscript.echo L_Text_Msg_General06_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

        ListPrinters = kErrorFailure

        exit function

    end if

    iTotal = 0

    for each oPort in Ports

        iTotal = iTotal + 1

        wscript.echo L_Empty_Text
        wscript.echo L_Text_Msg_Port01_Text & L_Space_Text & strServer
        wscript.echo L_Text_Msg_Port02_Text & L_Space_Text & oPort.Name
        wscript.echo L_Text_Msg_Port03_Text & L_Space_Text & oPort.HostAddress

        if oPort.Protocol = 1 then

            wscript.echo L_Text_Msg_Port04_Text
            wscript.echo L_Text_Msg_Port06_Text & L_Space_Text & oPort.PortNumber

        else

            wscript.echo L_Text_Msg_Port05_Text
            wscript.echo L_Text_Msg_Port07_Text & L_Space_Text & oPort.Queue

            if oPort.ByteCount then

                wscript.echo L_Text_Msg_Port08_Text

            else

                wscript.echo L_Text_Msg_Port09_Text

            end if

        end if

        if oPort.SNMPEnabled then

            wscript.echo L_Text_Msg_Port10_Text
            wscript.echo L_Text_Msg_Port12_Text & L_Space_Text & oPort.SNMPCommunity
            wscript.echo L_Text_Msg_Port13_Text & L_Space_Text & oPort.SNMPDevIndex

        else

            wscript.echo L_Text_Msg_Port11_Text

        end if

        Err.Clear

    next

    wscript.echo L_Empty_Text
    wscript.echo L_Text_Msg_General07_Text & L_Space_Text & iTotal

    ListPorts = kErrorSuccess

end function

'
' Gets the configuration of a port
'
function GetPort(oParamDict)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg04_Text
    DebugPrint kDebugTrace, L_Text_Msg_Port01_Text & L_Space_Text & oParamDict(kServerName)
    DebugPrint kDebugTrace, L_Text_Msg_Port02_Text & L_Space_Text & oParamDict(kPortName)

    dim oService
    dim oPort
    dim iResult
    dim strServer
    dim strPort
    dim strUser
    dim strPassword

    iResult = kErrorFailure

    strServer   = oParamDict(kServerName)
    strPort     = oParamDict(kPortName)
    strUser     = oParamDict(kUserName)
    strPassword = oParamDict(kPassword)

    if WmiConnect(strServer, kNameSpace, strUser, strPassword, oService) then

        set oPort = oService.Get("Win32_TCPIPPrinterPort.Name='" & strPort & "'")

    else

        GetPort = kErrorFailure

        exit function

    end if

    if Err.Number = kErrorSuccess then

        wscript.echo L_Empty_Text
        wscript.echo L_Text_Msg_Port01_Text & L_Space_Text & strServer
        wscript.echo L_Text_Msg_Port02_Text & L_Space_Text & oPort.Name
        wscript.echo L_Text_Msg_Port03_Text & L_Space_Text & oPort.HostAddress

        if oPort.Protocol = 1 then

            wscript.echo L_Text_Msg_Port04_Text
            wscript.echo L_Text_Msg_Port06_Text & L_Space_Text & oPort.PortNumber

        else

            wscript.echo L_Text_Msg_Port05_Text
            wscript.echo L_Text_Msg_Port07_Text & L_Space_Text & oPort.Queue

            if oPort.ByteCount then

                wscript.echo L_Text_Msg_Port08_Text

            else

                wscript.echo L_Text_Msg_Port09_Text

            end if

        end if

        if oPort.SNMPEnabled then

            wscript.echo L_Text_Msg_Port10_Text
            wscript.echo L_Text_Msg_Port12_Text & L_Space_Text & oPort.SNMPCommunity
            wscript.echo L_Text_Msg_Port13_Text & L_Space_Text & oPort.SNMPDevIndex

        else

            wscript.echo L_Text_Msg_Port11_Text

        end if

        iResult = kErrorSuccess

    else

        wscript.echo L_Text_Msg_General03_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

        '
        ' Try getting extended error information
        '
        call LastError()

    end if

    GetPort = iResult

end function

'
' Debug display helper function
'
sub DebugPrint(uFlags, strString)

    if gDebugFlag = true then

        if uFlags = kDebugTrace then

            wscript.echo L_Debug_Text & L_Space_Text & strString

        end if

        if uFlags = kDebugError then

            if Err <> 0 then

                wscript.echo L_Debug_Text & L_Space_Text & strString & L_Space_Text _
                             & L_Error_Text & L_Space_Text & L_Hex_Text & hex(Err.Number) _
                             & L_Space_Text & Err.Description

            end if

        end if

    end if

end sub

'
' Parse the command line into its components
'
function ParseCommandLine(iAction, oParamDict)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg05_Text

    dim oArgs
    dim iIndex

    iAction = kActionUnknown

    set oArgs = Wscript.Arguments

    while iIndex < oArgs.Count

        select case oArgs(iIndex)

            case "-g"
                iAction = kActionGet

            case "-t"
                iAction = kActionSet

            case "-a"
                iAction = kActionAdd

            case "-d"
                iAction = kActionDelete

            case "-l"
                iAction = kActionList

            case "-2e"
                oParamDict.Add kDoubleSpool, true

            case "-2d"
                oParamDict.Add kDoubleSpool, false

            case "-s"
                iIndex = iIndex + 1
                oParamDict.Add kServerName, RemoveBackslashes(oArgs(iIndex))

            case "-u"
                iIndex = iIndex + 1
                oParamDict.Add kUserName, oArgs(iIndex)

            case "-w"
                iIndex = iIndex + 1
                oParamDict.Add kPassword, oArgs(iIndex)

            case "-n"
                iIndex = iIndex + 1
                oParamDict.Add kPortNumber, oArgs(iIndex)

            case "-r"
                iIndex = iIndex + 1
                oParamDict.Add kPortName, oArgs(iIndex)

            case "-o"
                iIndex = iIndex + 1
                oParamDict.Add kPortType, oArgs(iIndex)

            case "-h"
                iIndex = iIndex + 1
                oParamDict.Add kHostAddress, oArgs(iIndex)

            case "-q"
                iIndex = iIndex + 1
                oParamDict.Add kQueueName, oArgs(iIndex)

            case "-i"
                iIndex = iIndex + 1
                oParamDict.Add kSNMPDeviceIndex, oArgs(iIndex)

            case "-y"
                iIndex = iIndex + 1
                oParamDict.Add kCommunityName, oArgs(iIndex)

            case "-me"
                oParamDict.Add kSNMP, true

            case "-md"
                oParamDict.Add kSNMP, false

            case "-?"
                Usage(True)
                exit function

            case else
                Usage(True)
                exit function

        end select

        iIndex = iIndex + 1

    wend

    if Err = kErrorSuccess then

        ParseCommandLine = kErrorSuccess

    else

        wscript.echo L_Text_Error_General02_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_text & Err.Description


        ParseCommandLine = kErrorFailure

    end if

end  function

'
' Display command usage.
'
sub Usage(bExit)

    wscript.echo L_Help_Help_General01_Text
    wscript.echo L_Help_Help_General02_Text
    wscript.echo L_Help_Help_General03_Text
    wscript.echo L_Help_Help_General04_Text
    wscript.echo L_Help_Help_General05_Text
    wscript.echo L_Help_Help_General06_Text
    wscript.echo L_Help_Help_General07_Text
    wscript.echo L_Help_Help_General08_Text
    wscript.echo L_Help_Help_General09_Text
    wscript.echo L_Help_Help_General10_Text
    wscript.echo L_Help_Help_General11_Text
    wscript.echo L_Help_Help_General12_Text
    wscript.echo L_Help_Help_General13_Text
    wscript.echo L_Help_Help_General14_Text
    wscript.echo L_Help_Help_General15_Text
    wscript.echo L_Help_Help_General16_Text
    wscript.echo L_Help_Help_General17_Text
    wscript.echo L_Help_Help_General18_Text
    wscript.echo L_Help_Help_General19_Text
    wscript.echo L_Help_Help_General20_Text
    wscript.echo L_Help_Help_General21_Text
    wscript.echo L_Help_Help_General22_Text
    wscript.echo L_Empty_Text
    wscript.echo L_Help_Help_General23_Text
    wscript.echo L_Help_Help_General24_Text
    wscript.echo L_Help_Help_General25_Text
    wscript.echo L_Help_Help_General26_Text
    wscript.echo L_Help_Help_General27_Text
    wscript.echo L_Help_Help_General28_Text
    wscript.echo L_Help_Help_General29_Text
    wscript.echo L_Empty_Text
    wscript.echo L_Help_Help_General30_Text
    wscript.echo L_Help_Help_General31_Text
    wscript.echo L_Help_Help_General32_Text

    if bExit then

        wscript.quit(1)

    end if

end sub

'
' Determines which program is being used to run this script.
' Returns true if the script host is cscript.exe
'
function IsHostCscript()

    on error resume next

    dim strFullName
    dim strCommand
    dim i, j
    dim bReturn

    bReturn = false

    strFullName = WScript.FullName

    i = InStr(1, strFullName, ".exe", 1)

    if i <> 0 then

        j = InStrRev(strFullName, "\", i, 1)

        if j <> 0 then

            strCommand = Mid(strFullName, j+1, i-j-1)

            if LCase(strCommand) = "cscript" then

                bReturn = true

            end if

        end if

    end if

    if Err <> 0 then

        wscript.echo L_Text_Error_General01_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

    end if

    IsHostCscript = bReturn

end function

'
' Retrieves extended information about the last error that occurred
' during a WBEM operation. The methods that set an SWbemLastError
' object are GetObject, PutInstance, DeleteInstance
'
sub LastError()

    on error resume next

    dim oError

    set oError = CreateObject("WbemScripting.SWbemLastError")

    if Err = kErrorSuccess then

        wscript.echo L_Operation_Text            & L_Space_Text & oError.Operation
        wscript.echo L_Provider_Text             & L_Space_Text & oError.ProviderName
        wscript.echo L_Description_Text          & L_Space_Text & oError.Description
        wscript.echo L_Text_Error_General04_Text & L_Space_Text & oError.StatusCode

    end if

end sub

'
' Connects to the WMI service on a server. oService is returned as a service
' object (SWbemServices)
'
function WmiConnect(strServer, strNameSpace, strUser, strPassword, oService)

   on error resume next

   dim oLocator
   dim bResult

   oService = null

   bResult  = false

   set oLocator = CreateObject("WbemScripting.SWbemLocator")

   if Err = kErrorSuccess then

      set oService = oLocator.ConnectServer(strServer, strNameSpace, strUser, strPassword)

      if Err = kErrorSuccess then

          bResult = true

          oService.Security_.impersonationlevel = 3

          '
          ' Required to perform administrative tasks on the spooler service
          '
          oService.Security_.Privileges.AddAsString "SeLoadDriverPrivilege"

          Err.Clear

      else

          wscript.echo L_Text_Msg_General10_Text & L_Space_Text & L_Error_Text _
                       & L_Space_Text & L_Hex_Text & hex(Err.Number) & L_Space_Text _
                       & Err.Description

      end if

   else

       wscript.echo L_Text_Msg_General09_Text & L_Space_Text & L_Error_Text _
                    & L_Space_Text & L_Hex_Text & hex(Err.Number) & L_Space_Text _
                    & Err.Description

   end if

   WmiConnect = bResult

end function

'
' Remove leading "\\" from server name
'
function RemoveBackslashes(strServer)

    dim strRet

    strRet = strServer

    if Left(strServer, 2) = "\\" and Len(strServer) > 2 then

        strRet = Mid(strServer, 3)

    end if

    RemoveBackslashes = strRet

end function

'' SIG '' Begin signature block
'' SIG '' MIIiGAYJKoZIhvcNAQcCoIIiCTCCIgUCAQExDzANBglg
'' SIG '' hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
'' SIG '' BgEEAYI3AgEeMCQCAQEEEE7wKRaZJ7VNj+Ws4Q8X66sC
'' SIG '' AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
'' SIG '' JP2OI/dGh8Dr4i1IHJc1kEljUqgI55azox+O936+ZZqg
'' SIG '' ggrlMIIFBjCCA+6gAwIBAgITMwAAAjJB+1mZbcxN/wAA
'' SIG '' AAACMjANBgkqhkiG9w0BAQsFADCBhDELMAkGA1UEBhMC
'' SIG '' VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
'' SIG '' B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
'' SIG '' b3JhdGlvbjEuMCwGA1UEAxMlTWljcm9zb2Z0IFdpbmRv
'' SIG '' d3MgUHJvZHVjdGlvbiBQQ0EgMjAxMTAeFw0xOTA1MDIy
'' SIG '' MTI0MzZaFw0yMDA1MDIyMTI0MzZaMHAxCzAJBgNVBAYT
'' SIG '' AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
'' SIG '' EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
'' SIG '' cG9yYXRpb24xGjAYBgNVBAMTEU1pY3Jvc29mdCBXaW5k
'' SIG '' b3dzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
'' SIG '' AQEAkmMTW3blBvpQKCDDXK/qDRFmtkH12HU/EORg4uZT
'' SIG '' OZNkyZ6OACn2S/VHlqD6yqKIAswQrkk7hfdXAJoOr/ET
'' SIG '' XX4LZdPYwL8I5i6bfWJnayMhRumX4N39LejeSYTgT9Xy
'' SIG '' fHWdIAVuUqVhnGqXieg3sAJHNwN078a+14PVJOkfXI/1
'' SIG '' O6GnrB8HLqD5ecfRdhUP2GQABAL8XENIeNROTUQ2/Z26
'' SIG '' W/Hs8D5s2srKtBKSQSxUthQ0FMWz48QeqtCkF1RgDDc7
'' SIG '' mp1bmEUclc3a0sCT8ZadE1jScCm6VJrEvjSkMFAG59M6
'' SIG '' Sce1eghyBiCHH2oI38nWk45IQTFvN3eqa7II9QIDAQAB
'' SIG '' o4IBgjCCAX4wHwYDVR0lBBgwFgYKKwYBBAGCNwoDBgYI
'' SIG '' KwYBBQUHAwMwHQYDVR0OBBYEFK2ry00W9dboM/rs2r4Z
'' SIG '' pOfRxbtaMFQGA1UdEQRNMEukSTBHMS0wKwYDVQQLEyRN
'' SIG '' aWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0
'' SIG '' ZWQxFjAUBgNVBAUTDTIyOTg3OSs0NTQxMTIwHwYDVR0j
'' SIG '' BBgwFoAUqSkCOY4WxJd4zZD5nk+a4XxVr1MwVAYDVR0f
'' SIG '' BE0wSzBJoEegRYZDaHR0cDovL3d3dy5taWNyb3NvZnQu
'' SIG '' Y29tL3BraW9wcy9jcmwvTWljV2luUHJvUENBMjAxMV8y
'' SIG '' MDExLTEwLTE5LmNybDBhBggrBgEFBQcBAQRVMFMwUQYI
'' SIG '' KwYBBQUHMAKGRWh0dHA6Ly93d3cubWljcm9zb2Z0LmNv
'' SIG '' bS9wa2lvcHMvY2VydHMvTWljV2luUHJvUENBMjAxMV8y
'' SIG '' MDExLTEwLTE5LmNydDAMBgNVHRMBAf8EAjAAMA0GCSqG
'' SIG '' SIb3DQEBCwUAA4IBAQCuhuOC7ibjAyowaec6WAd81gq7
'' SIG '' DgJwmNjyVHJvVwsA03nCQGMYAIt9pw0oC+QUezSFNyCQ
'' SIG '' MV0V1pCPUhztpMcJ3r/QSYVWq4lAcqdrOB7fOcVe/g96
'' SIG '' J9c+g5As9/0CgI/e0L3iL8Kh9tzJib3saAO/MNOuRSxb
'' SIG '' Er6RzwOrvF54TESfistFmzacf9bd3PnRyUbwJEdW3o8D
'' SIG '' rd6+Az898wZeHiw/Miv9HCHnmFKTI3/pCK9MK3hgchHZ
'' SIG '' +DlMANStuIOMzV3g5Md33fVm6gmOUg+BK6tiGOXGZkTb
'' SIG '' 74donBOZtjAnBRK7Gq2HgWZGKzvvIkYJ7Vdx0JdaZbxE
'' SIG '' rg9uIXeTMIIF1zCCA7+gAwIBAgIKYQd2VgAAAAAACDAN
'' SIG '' BgkqhkiG9w0BAQsFADCBiDELMAkGA1UEBhMCVVMxEzAR
'' SIG '' BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
'' SIG '' bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
'' SIG '' bjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJvb3QgQ2VydGlm
'' SIG '' aWNhdGUgQXV0aG9yaXR5IDIwMTAwHhcNMTExMDE5MTg0
'' SIG '' MTQyWhcNMjYxMDE5MTg1MTQyWjCBhDELMAkGA1UEBhMC
'' SIG '' VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
'' SIG '' B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
'' SIG '' b3JhdGlvbjEuMCwGA1UEAxMlTWljcm9zb2Z0IFdpbmRv
'' SIG '' d3MgUHJvZHVjdGlvbiBQQ0EgMjAxMTCCASIwDQYJKoZI
'' SIG '' hvcNAQEBBQADggEPADCCAQoCggEBAN0Mu6LkLgnj58X3
'' SIG '' lmm8ACG9aTMz760Ey1SA7gaDu8UghNn30ovzOLCrpK0t
'' SIG '' fGJ5Bf/jSj8ENSBw48Tna+CcwDZ16Yox3Y1w5dw3tXRG
'' SIG '' lihbh2AjLL/cR6Vn91EnnnLrB6bJuR47UzV85dPsJ7mH
'' SIG '' HP65ySMJb6hGkcFuljxB08ujP10Cak3saR8lKFw2//1D
'' SIG '' FQqU4Bm0z9/CEuLCWyfuJ3gwi1sqCWsiiVNgFizAaB1T
'' SIG '' uuxJ851hjIVoCXNEXX2iVCvdefcVzzVdbBwrXM68nCOL
'' SIG '' b261Jtk2E8NP1ieuuTI7QZIs4cfNd+iqVE73XAsEh2W0
'' SIG '' QxiosuBtGXfsWiT6SAMCAwEAAaOCAUMwggE/MBAGCSsG
'' SIG '' AQQBgjcVAQQDAgEAMB0GA1UdDgQWBBSpKQI5jhbEl3jN
'' SIG '' kPmeT5rhfFWvUzAZBgkrBgEEAYI3FAIEDB4KAFMAdQBi
'' SIG '' AEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB
'' SIG '' /zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvXzpoY
'' SIG '' xDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
'' SIG '' Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNS
'' SIG '' b29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYIKwYBBQUH
'' SIG '' AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
'' SIG '' Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0NlckF1
'' SIG '' dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG9w0BAQsFAAOC
'' SIG '' AgEAFPx8cVGlecJusu85Prw8Ug9uKz8QE3P+qGjQSKY0
'' SIG '' TYqWBSbuMUaQYXnW/zguRWv0wOUouNodj4rbCdcax0wK
'' SIG '' NmZqjOwb1wSQqBgXpJu54kAyNnbEwVrGv+QEwOoW06zD
'' SIG '' aO9irN1UbFAwWKbrfP6Up06O9Ox8hnNXwlIhczRa86OK
'' SIG '' VsgE2gcJ7fiL4870fo6u8PYLigj7P8kdcn9TuOu+Y+Dj
'' SIG '' PTFlsIHl8qzNFqSfPaixm8JC0JCEX1Qd/4nquh1HkG+w
'' SIG '' c05Bn0CfX+WhKrIRkXOKISjwzt5zOV8+q1xg7N8DEKjT
'' SIG '' Cen09paFtn9RiGZHGY2isBI9gSpoBXe7kUxie7bBB8e6
'' SIG '' eoc0Aw5LYnqZ6cr8zko3yS2kV3wc/j3cuA9a+tbEswKF
'' SIG '' Ajrqs9lu5GkhN96B0fZ1GQVn05NXXikbOcjuLeHN5EVz
'' SIG '' W9DSznqrFhmCRljQXp2Bs2evbDXyvOU/JOI1ogp1BvYY
'' SIG '' VpnUeCzRBRvr0IgBnaoQ8QXfun4sY7cGmyMhxPl4bOJY
'' SIG '' FwY2K5ESA8yk2fItuvmUnUDtGEXxzopcaz6rA9NwGCoK
'' SIG '' auBfR9HVYwoy8q/XNh8qcFrlQlkIcUtXun6DgfAhPPQc
'' SIG '' wcW5kJMOiEWThumxIJm+mMvFlaRdYtagYwggvXUQd309
'' SIG '' 80W5n5efy1eAbzOpBM93pGIcWX4xghaLMIIWhwIBATCB
'' SIG '' nDCBhDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
'' SIG '' bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
'' SIG '' FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEuMCwGA1UEAxMl
'' SIG '' TWljcm9zb2Z0IFdpbmRvd3MgUHJvZHVjdGlvbiBQQ0Eg
'' SIG '' MjAxMQITMwAAAjJB+1mZbcxN/wAAAAACMjANBglghkgB
'' SIG '' ZQMEAgEFAKCCAQQwGQYJKoZIhvcNAQkDMQwGCisGAQQB
'' SIG '' gjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQBgjcC
'' SIG '' ARUwLwYJKoZIhvcNAQkEMSIEIKB3KTvjHOwjJx/hn7dw
'' SIG '' 25GG9ZVY36lHuHhwdldxEuIxMDwGCisGAQQBgjcKAxwx
'' SIG '' LgwsbmJscjk1MWxJczRZeW1qVWtZR1NKTFpGVTBRN3Fm
'' SIG '' TjVUV2hkSHFMcERQND0wWgYKKwYBBAGCNwIBDDFMMEqg
'' SIG '' JIAiAE0AaQBjAHIAbwBzAG8AZgB0ACAAVwBpAG4AZABv
'' SIG '' AHcAc6EigCBodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
'' SIG '' d2luZG93czANBgkqhkiG9w0BAQEFAASCAQAMM1FQBqW4
'' SIG '' sFv5bOgXfJomSWv/0uijFZTPp8Eg99XtefWJXwvepEC/
'' SIG '' /XJzM1HFwaqYPrs0feU9mpgPIpJBtPHWvT5us6LyvenH
'' SIG '' BpSUEAEM2QXxdKIFODwmM93Ar8oGtZ/Z71yVAGLguLp0
'' SIG '' LWVz7pillEAW1ZYmAK+X3oCq37TeJptjBjoL2Mziy1yA
'' SIG '' F5qYV6P77qi2f8+gHsR+ZTMhCc6nWoZmoICicY33f2o9
'' SIG '' MP+RRTOA2Y8onvLeeJgxDel5bI5IXrU1D/J9wRmGComh
'' SIG '' wOeYeky+3ZgmI4vBuQKXro3VZCcQo8zKsSymNqWrs24H
'' SIG '' 3pV4hypTWFRYpTYKWuaI+MjtoYITtzCCE7MGCisGAQQB
'' SIG '' gjcDAwExghOjMIITnwYJKoZIhvcNAQcCoIITkDCCE4wC
'' SIG '' AQMxDzANBglghkgBZQMEAgEFADCCAVgGCyqGSIb3DQEJ
'' SIG '' EAEEoIIBRwSCAUMwggE/AgEBBgorBgEEAYRZCgMBMDEw
'' SIG '' DQYJYIZIAWUDBAIBBQAEILcYZTfwcvQRuuOjbdMrOWSq
'' SIG '' XXZi4ggo+PBfYkY1Q9WPAgZd5nWW+XIYEzIwMTkxMjA3
'' SIG '' MDQwNDAwLjQ5MVowBwIBAYACAfSggdSkgdEwgc4xCzAJ
'' SIG '' BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
'' SIG '' DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
'' SIG '' ZnQgQ29ycG9yYXRpb24xKTAnBgNVBAsTIE1pY3Jvc29m
'' SIG '' dCBPcGVyYXRpb25zIFB1ZXJ0byBSaWNvMSYwJAYDVQQL
'' SIG '' Ex1UaGFsZXMgVFNTIEVTTjpCMUI3LUY2N0YtRkVDMjEl
'' SIG '' MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
'' SIG '' dmljZaCCDx8wggT1MIID3aADAgECAhMzAAABA+pOK3i2
'' SIG '' KieTAAAAAAEDMA0GCSqGSIb3DQEBCwUAMHwxCzAJBgNV
'' SIG '' BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
'' SIG '' VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
'' SIG '' Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
'' SIG '' aW1lLVN0YW1wIFBDQSAyMDEwMB4XDTE5MDkwNjIwNDEx
'' SIG '' N1oXDTIwMTIwNDIwNDExN1owgc4xCzAJBgNVBAYTAlVT
'' SIG '' MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
'' SIG '' ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
'' SIG '' YXRpb24xKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVyYXRp
'' SIG '' b25zIFB1ZXJ0byBSaWNvMSYwJAYDVQQLEx1UaGFsZXMg
'' SIG '' VFNTIEVTTjpCMUI3LUY2N0YtRkVDMjElMCMGA1UEAxMc
'' SIG '' TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZTCCASIw
'' SIG '' DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALCRV96u
'' SIG '' FMhQPoeefQrvxbzOW3Y7LKElUOxYoMR9HW2+DOgS3ECp
'' SIG '' lmsQJZbcXZJ1686/7CV7skdSO95rG7k9cnI9tvX4OW0W
'' SIG '' DRjtcaFOvmDdENyBUYmIf+kuPHwA8Edbzeg7OPkBCtvM
'' SIG '' 5nUJ5xVnQuiT9R5NF9axjwoYkHaIcaj9GWQgW5h+awLo
'' SIG '' fbWyY0rWyXYk8GndPVK3MkT3FnFPWLGY6OB2lRMEgpBL
'' SIG '' w1uKpCUHqp4Fpff5gnvb93EVSliLr11lwfYwEF5RjNDe
'' SIG '' gi9P39MjpnuXGwI2LjGKUsF66VGaVw4rdaUKQlPKJ0P/
'' SIG '' h/b9LCcVZyBVfwAD/XapWoo2JEsCAwEAAaOCARswggEX
'' SIG '' MB0GA1UdDgQWBBTiNi2Y/aGPja1lJu2PPODMEW9aCDAf
'' SIG '' BgNVHSMEGDAWgBTVYzpcijGQ80N7fEYbxTNoWoVtVTBW
'' SIG '' BgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jv
'' SIG '' c29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNUaW1T
'' SIG '' dGFQQ0FfMjAxMC0wNy0wMS5jcmwwWgYIKwYBBQUHAQEE
'' SIG '' TjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jv
'' SIG '' c29mdC5jb20vcGtpL2NlcnRzL01pY1RpbVN0YVBDQV8y
'' SIG '' MDEwLTA3LTAxLmNydDAMBgNVHRMBAf8EAjAAMBMGA1Ud
'' SIG '' JQQMMAoGCCsGAQUFBwMIMA0GCSqGSIb3DQEBCwUAA4IB
'' SIG '' AQB8Naig5oqAZfKHIUhs99mL2pqtVa6yca9TwUyeM9yC
'' SIG '' /Soduk4CXbtGtn+/j7yMpQldXXFefBh9PIg3bdlLchCt
'' SIG '' L8RXVxdmxDQYcjyxYtEmxCxxS+6EOBfl9I1ouXDj8Aq8
'' SIG '' wGZZ9PbAraJDeqxgVqd9W/YCrC4la3tg4HzF1hot6L0o
'' SIG '' xNlTnu+RyXmZ7f6f/Vq6KZAZPyaKbI5P6qHBG3REPAgr
'' SIG '' 45+GySpbWAQhZjUNZ9pJ3NcePbuaa8N2xiIJsc9t8/FT
'' SIG '' SCj1xoiK9q2YvXoA64/hkyUIn/fBFY3BD6meMnQCG500
'' SIG '' ruiAm0GujHYOmZxAbosMOxtLPahmQUkcbQCPMIIGcTCC
'' SIG '' BFmgAwIBAgIKYQmBKgAAAAAAAjANBgkqhkiG9w0BAQsF
'' SIG '' ADCBiDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
'' SIG '' bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
'' SIG '' FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMp
'' SIG '' TWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
'' SIG '' aXR5IDIwMTAwHhcNMTAwNzAxMjEzNjU1WhcNMjUwNzAx
'' SIG '' MjE0NjU1WjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
'' SIG '' V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
'' SIG '' A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
'' SIG '' VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
'' SIG '' MDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
'' SIG '' AKkdDbx3EYo6IOz8E5f1+n9plGt0VBDVpQoAgoX77Xxo
'' SIG '' SyxfxcPlYcJ2tz5mK1vwFVMnBDEfQRsalR3OCROOfGEw
'' SIG '' WbEwRA/xYIiEVEMM1024OAizQt2TrNZzMFcmgqNFDdDq
'' SIG '' 9UeBzb8kYDJYYEbyWEeGMoQedGFnkV+BVLHPk0ySwcSm
'' SIG '' XdFhE24oxhr5hoC732H8RsEnHSRnEnIaIYqvS2SJUGKx
'' SIG '' Xf13Hz3wV3WsvYpCTUBR0Q+cBj5nf/VmwAOWRH7v0Ev9
'' SIG '' buWayrGo8noqCjHw2k4GkbaICDXoeByw6ZnNPOcvRLqn
'' SIG '' 9NxkvaQBwSAJk3jN/LzAyURdXhacAQVPIk0CAwEAAaOC
'' SIG '' AeYwggHiMBAGCSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQW
'' SIG '' BBTVYzpcijGQ80N7fEYbxTNoWoVtVTAZBgkrBgEEAYI3
'' SIG '' FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYD
'' SIG '' VR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+ii
'' SIG '' XGJo0T2UkFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVo
'' SIG '' dHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9w
'' SIG '' cm9kdWN0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5j
'' SIG '' cmwwWgYIKwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5o
'' SIG '' dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRz
'' SIG '' L01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNydDCBoAYD
'' SIG '' VR0gAQH/BIGVMIGSMIGPBgkrBgEEAYI3LgMwgYEwPQYI
'' SIG '' KwYBBQUHAgEWMWh0dHA6Ly93d3cubWljcm9zb2Z0LmNv
'' SIG '' bS9QS0kvZG9jcy9DUFMvZGVmYXVsdC5odG0wQAYIKwYB
'' SIG '' BQUHAgIwNB4yIB0ATABlAGcAYQBsAF8AUABvAGwAaQBj
'' SIG '' AHkAXwBTAHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJKoZI
'' SIG '' hvcNAQELBQADggIBAAfmiFEN4sbgmD+BcQM9naOhIW+z
'' SIG '' 66bM9TG+zwXiqf76V20ZMLPCxWbJat/15/B4vceoniXj
'' SIG '' +bzta1RXCCtRgkQS+7lTjMz0YBKKdsxAQEGb3FwX/1z5
'' SIG '' Xhc1mCRWS3TvQhDIr79/xn/yN31aPxzymXlKkVIArzgP
'' SIG '' F/UveYFl2am1a+THzvbKegBvSzBEJCI8z+0DpZaPWSm8
'' SIG '' tv0E4XCfMkon/VWvL/625Y4zu2JfmttXQOnxzplmkIz/
'' SIG '' amJ/3cVKC5Em4jnsGUpxY517IW3DnKOiPPp/fZZqkHim
'' SIG '' bdLhnPkd/DjYlPTGpQqWhqS9nhquBEKDuLWAmyI4ILUl
'' SIG '' 5WTs9/S/fmNZJQ96LjlXdqJxqgaKD4kWumGnEcua2A5H
'' SIG '' moDF0M2n0O99g/DhO3EJ3110mCIIYdqwUB5vvfHhAN/n
'' SIG '' MQekkzr3ZUd46PioSKv33nJ+YWtvd6mBy6cJrDm77MbL
'' SIG '' 2IK0cs0d9LiFAR6A+xuJKlQ5slvayA1VmXqHczsI5pgt
'' SIG '' 6o3gMy4SKfXAL1QnIffIrE7aKLixqduWsqdCosnPGUFN
'' SIG '' 4Ib5KpqjEWYw07t0MkvfY3v1mYovG8chr1m1rtxEPJdQ
'' SIG '' cdeh0sVV42neV8HR3jDA/czmTfsNv11P6Z0eGTgvvM9Y
'' SIG '' BS7vDaBQNdrvCScc1bN+NR4Iuto229Nfj950iEkSoYID
'' SIG '' rTCCApUCAQEwgf6hgdSkgdEwgc4xCzAJBgNVBAYTAlVT
'' SIG '' MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
'' SIG '' ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
'' SIG '' YXRpb24xKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVyYXRp
'' SIG '' b25zIFB1ZXJ0byBSaWNvMSYwJAYDVQQLEx1UaGFsZXMg
'' SIG '' VFNTIEVTTjpCMUI3LUY2N0YtRkVDMjElMCMGA1UEAxMc
'' SIG '' TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIlCgEB
'' SIG '' MAkGBSsOAwIaBQADFQBrXDo2eDr68GRJRlXYVs3aqGza
'' SIG '' s6CB3jCB26SB2DCB1TELMAkGA1UEBhMCVVMxEzARBgNV
'' SIG '' BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
'' SIG '' HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEp
'' SIG '' MCcGA1UECxMgTWljcm9zb2Z0IE9wZXJhdGlvbnMgUHVl
'' SIG '' cnRvIFJpY28xJzAlBgNVBAsTHm5DaXBoZXIgTlRTIEVT
'' SIG '' Tjo0REU5LTBDNUUtM0UwOTErMCkGA1UEAxMiTWljcm9z
'' SIG '' b2Z0IFRpbWUgU291cmNlIE1hc3RlciBDbG9jazANBgkq
'' SIG '' hkiG9w0BAQUFAAIFAOGVBrEwIhgPMjAxOTEyMDcwMDU2
'' SIG '' MTdaGA8yMDE5MTIwODAwNTYxN1owdDA6BgorBgEEAYRZ
'' SIG '' CgQBMSwwKjAKAgUA4ZUGsQIBADAHAgEAAgIf3DAHAgEA
'' SIG '' AgIW4zAKAgUA4ZZYMQIBADA2BgorBgEEAYRZCgQCMSgw
'' SIG '' JjAMBgorBgEEAYRZCgMBoAowCAIBAAIDFuNgoQowCAIB
'' SIG '' AAIDB6EgMA0GCSqGSIb3DQEBBQUAA4IBAQBhhxcv9MS6
'' SIG '' OnWmxMHFmVah4oBW5hRT3mRMt5FU0zPty+ad93ZdDEAM
'' SIG '' tnQut/y1jlEtwU+pIA0NXc7oI9ORxRcf7gS52RQQ1koz
'' SIG '' rOC8NwHBaHgDGLSZaqxF8gM/qTiCQ0drSxHUQ3U0Vezo
'' SIG '' pWYAZBB4fKVmLJOhP2BjWO6XTAupJ7MnB2fYdbjITTDT
'' SIG '' w8xIhH0wKJsHy058UiGtnxp8+HcigUJ8gI4RD98yAGRM
'' SIG '' b5tEEf9hye3FRTYV5929Ty110hzejt9X7ChVTBzLdUpT
'' SIG '' Vx3q2r4WHfg2SbiqIs5uGf1lZW/I47x8jikGC/7jzUBr
'' SIG '' 66e0yzkY9zdq84Bv/p0nwBMUMYIC9TCCAvECAQEwgZMw
'' SIG '' fDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
'' SIG '' b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
'' SIG '' Y3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWlj
'' SIG '' cm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAAED
'' SIG '' 6k4reLYqJ5MAAAAAAQMwDQYJYIZIAWUDBAIBBQCgggEy
'' SIG '' MBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAvBgkq
'' SIG '' hkiG9w0BCQQxIgQgLxbr4SOqaAV6k/LYcw8zfWOlmtN8
'' SIG '' 2rMNiKc1J+6Qs18wgeIGCyqGSIb3DQEJEAIMMYHSMIHP
'' SIG '' MIHMMIGxBBRrXDo2eDr68GRJRlXYVs3aqGzaszCBmDCB
'' SIG '' gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
'' SIG '' aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
'' SIG '' ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
'' SIG '' HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
'' SIG '' AAABA+pOK3i2KieTAAAAAAEDMBYEFJfqY0iH19y7H+za
'' SIG '' Idrx4/iMQ5huMA0GCSqGSIb3DQEBCwUABIIBACVm5SJJ
'' SIG '' UEGdSPqmcvuQNMUXs6LJnwSWmygqYy+qQYz6Sdc+I4dj
'' SIG '' qOifuA45iONwOZFv/k9dfJT7u6meRhUcF3/qlaCBKU+4
'' SIG '' BUS0XIog2NlAiH5yhhAAjFy9Ys17o9r/3dNzazhFAARr
'' SIG '' 2yn3RD7aOopjDsdfzPDa8GbJNhxGcGrZW8Cmh19EwqwP
'' SIG '' ngao3L0zrsUHCmxOe+CKbtVnLVc5fp98AKICietnI/mY
'' SIG '' 3pbnVAq+N7jbWO4hDJB+FtOMNjEgwuOQ1ftNYwp8vmff
'' SIG '' 0pVrpqZ4FSZdLEjE+rBEClNPsyEnSMBvev0t5iPFWQH3
'' SIG '' lL+VwE/+QUYAf23kOBfCQ9PRZ5A=
'' SIG '' End signature block

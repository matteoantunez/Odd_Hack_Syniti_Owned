'----------------------------------------------------------------------
'
' Copyright (c) Microsoft Corporation. All rights reserved.
'
' Abstract:
' prnjobs.vbs - job control script for WMI on Windows 
'     used to pause, resume, cancel and list jobs
'
' Usage:
' prnjobs [-zmxl?] [-s server] [-p printer] [-j jobid] [-u user name] [-w password]
'
' Examples:
' prnjobs -z -j jobid -p printer
' prnjobs -l -p printer
'
'----------------------------------------------------------------------

option explicit

'
' Debugging trace flags, to enable debug output trace message
' change gDebugFlag to true.
'
const kDebugTrace = 1
const kDebugError = 2
dim   gDebugFlag

gDebugFlag = false

'
' Operation action values.
'
const kActionUnknown    = 0
const kActionPause      = 1
const kActionResume     = 2
const kActionCancel     = 3
const kActionList       = 4

const kErrorSuccess     = 0
const KErrorFailure     = 1

const kNameSpace        = "root\cimv2"

'
' Job status constants
'
const kJobPaused        = 1
const kJobError         = 2
const kJobDeleting      = 4
const kJobSpooling      = 8
const kJobPrinting      = 16
const kJobOffline       = 32
const kJobPaperOut      = 64
const kJobPrinted       = 128
const kJobDeleted       = 256
const kJobBlockedDevq   = 512
const kJobUserInt       = 1024
const kJobRestarted     = 2048
const kJobComplete      = 4096

'
' Generic strings
'
const L_Empty_Text                 = ""
const L_Space_Text                 = " "
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
const L_Help_Help_General01_Text   = "Usage: prnjobs [-zmxl?] [-s server][-p printer][-j jobid][-u user name][-w password]"
const L_Help_Help_General02_Text   = "Arguments:"
const L_Help_Help_General03_Text   = "-j     - job id"
const L_Help_Help_General04_Text   = "-l     - list all jobs"
const L_Help_Help_General05_Text   = "-m     - resume the job"
const L_Help_Help_General06_Text   = "-p     - printer name"
const L_Help_Help_General07_Text   = "-s     - server name"
const L_Help_Help_General08_Text   = "-u     - user name"
const L_Help_Help_General09_Text   = "-w     - password"
const L_Help_Help_General10_Text   = "-x     - cancel the job"
const L_Help_Help_General11_Text   = "-z     - pause the job"
const L_Help_Help_General12_Text   = "-?     - display command usage"
const L_Help_Help_General13_Text   = "Examples:"
const L_Help_Help_General14_Text   = "prnjobs -z -p printer -j jobid"
const L_Help_Help_General15_Text   = "prnjobs -l -p printer"
const L_Help_Help_General16_Text   = "prnjobs -l"

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
const L_Text_Msg_General01_Text    = "Unable to enumerate print jobs"
const L_Text_Msg_General02_Text    = "Number of print jobs enumerated"
const L_Text_Msg_General03_Text    = "Unable to set print job"
const L_Text_Msg_General04_Text    = "Unable to get SWbemLocator object"
const L_Text_Msg_General05_Text    = "Unable to connect to WMI service"


'
' Print job properties
'
const L_Text_Msg_Job01_Text        = "Job id"
const L_Text_Msg_Job02_Text        = "Printer"
const L_Text_Msg_Job03_Text        = "Document"
const L_Text_Msg_Job04_Text        = "Data type"
const L_Text_Msg_Job05_Text        = "Driver name"
const L_Text_Msg_Job06_Text        = "Description"
const L_Text_Msg_Job07_Text        = "Elapsed time"
const L_Text_Msg_Job08_Text        = "Machine name"
const L_Text_Msg_Job09_Text        = "Notify"
const L_Text_Msg_Job10_Text        = "Owner"
const L_Text_Msg_Job11_Text        = "Pages printed"
const L_Text_Msg_Job12_Text        = "Parameters"
const L_Text_Msg_Job13_Text        = "Size"
const L_Text_Msg_Job14_Text        = "Start time"
const L_Text_Msg_Job15_Text        = "Until time"
const L_Text_Msg_Job16_Text        = "Status"
const L_Text_Msg_Job17_Text        = "Time submitted"
const L_Text_Msg_Job18_Text        = "Total pages"
const L_Text_Msg_Job19_Text        = "SizeHigh"
const L_Text_Msg_Job20_Text        = "PaperSize"
const L_Text_Msg_Job21_Text        = "PaperWidth"
const L_Text_Msg_Job22_Text        = "PaperLength"
const L_Text_Msg_Job23_Text        = "Color"

'
' Job status strings
'
const L_Text_Msg_Status01_Text     = "The driver cannot print the job"
const L_Text_Msg_Status02_Text     = "Sent to the printer"
const L_Text_Msg_Status03_Text     = "Job has been deleted"
const L_Text_Msg_Status04_Text     = "Job is being deleted"
const L_Text_Msg_Status05_Text     = "An error is associated with the job"
const L_Text_Msg_Status06_Text     = "Printer is offline"
const L_Text_Msg_Status07_Text     = "Printer is out of paper"
const L_Text_Msg_Status08_Text     = "Job is paused"
const L_Text_Msg_Status09_Text     = "Job has printed"
const L_Text_Msg_Status10_Text     = "Job is printing"
const L_Text_Msg_Status11_Text     = "Job has been restarted"
const L_Text_Msg_Status12_Text     = "Job is spooling"
const L_Text_Msg_Status13_Text     = "Printer has an error that requires user intervention"

'
' Action strings
'
const L_Text_Action_General01_Text = "Pause"
const L_Text_Action_General02_Text = "Resume"
const L_Text_Action_General03_Text = "Cancel"

'
' Debug messages
'
const L_Text_Dbg_Msg01_Text        = "In function ListJobs"
const L_Text_Dbg_Msg02_Text        = "In function ExecJob"
const L_Text_Dbg_Msg03_Text        = "In function ParseCommandLine"

main

'
' Main execution starts here
'
sub main

    dim iAction
    dim iRetval
    dim strServer
    dim strPrinter
    dim strJob
    dim strUser
    dim strPassword

    '
    ' Abort if the host is not cscript
    '
    if not IsHostCscript() then

        call wscript.echo(L_Help_Help_Host01_Text & vbCRLF & L_Help_Help_Host02_Text & vbCRLF & _
                          L_Help_Help_Host03_Text & vbCRLF & L_Help_Help_Host04_Text & vbCRLF & _
                          L_Help_Help_Host05_Text & vbCRLF & L_Help_Help_Host06_Text & vbCRLF)

        wscript.quit

    end if

    iRetval = ParseCommandLine(iAction, strServer, strPrinter, strJob, strUser, strPassword)

    if iRetval = kErrorSuccess then

        select case iAction

            case kActionPause
                 iRetval = ExecJob(strServer, strJob, strPrinter, strUser, strPassword, L_Text_Action_General01_Text)

            case kActionResume
                 iRetval = ExecJob(strServer, strJob, strPrinter, strUser, strPassword, L_Text_Action_General02_Text)

            case kActionCancel
                 iRetval = ExecJob(strServer, strJob, strPrinter, strUser, strPassword, L_Text_Action_General03_Text)

            case kActionList
                 iRetval = ListJobs(strServer, strPrinter, strUser, strPassword)

            case else
                 Usage(true)
                 exit sub

        end select

    end if

end sub

'
' Enumerate all print jobs on a printer
'
function ListJobs(strServer, strPrinter, strUser, strPassword)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg01_Text

    dim Jobs
    dim oJob
    dim oService
    dim iRetval
    dim strTemp
    dim iTotal

    if WmiConnect(strServer, kNameSpace, strUser, strPassword, oService) then

        set Jobs = oService.InstancesOf("Win32_PrintJob")

    else

        ListJobs = kErrorFailure

        exit function

    end if

    if Err.Number <> kErrorSuccess then

        wscript.echo L_Text_Msg_General01_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

        ListJobs = kErrorFailure

        exit function

    end if

    iTotal = 0

    for each oJob in Jobs

        '
        ' oJob.Name has the form "printer name, job id". We are isolating the printer name
        '
        strTemp = Mid(oJob.Name, 1, InStr(1, oJob.Name, ",", 1)-1 )

        '
        ' If no printer was specified, then enumerate all jobs
        '
        if strPrinter = null or strPrinter = "" or LCase(strTemp) = LCase(strPrinter) then

            iTotal = iTotal + 1

            wscript.echo L_Empty_Text
            wscript.echo L_Text_Msg_Job01_Text & L_Space_Text & oJob.JobId
            wscript.echo L_Text_Msg_Job02_Text & L_Space_Text & strTemp
            wscript.echo L_Text_Msg_Job03_Text & L_Space_Text & oJob.Document
            wscript.echo L_Text_Msg_Job04_Text & L_Space_Text & oJob.DataType
            wscript.echo L_Text_Msg_Job05_Text & L_Space_Text & oJob.DriverName
            wscript.echo L_Text_Msg_Job06_Text & L_Space_Text & oJob.Description
            wscript.echo L_Text_Msg_Job07_Text & L_Space_Text & Mid(CStr(oJob.ElapsedTime), 9, 2) & ":" _
                                                              & Mid(CStr(oJob.ElapsedTime), 11, 2) & ":" _
                                                              & Mid(CStr(oJob.ElapsedTime), 13, 2)
            wscript.echo L_Text_Msg_Job08_Text & L_Space_Text & oJob.HostPrintQueue
            wscript.echo L_Text_Msg_Job09_Text & L_Space_Text & oJob.Notify
            wscript.echo L_Text_Msg_Job10_Text & L_Space_Text & oJob.Owner
            wscript.echo L_Text_Msg_Job11_Text & L_Space_Text & oJob.PagesPrinted
            wscript.echo L_Text_Msg_Job12_Text & L_Space_Text & oJob.Parameters
            wscript.echo L_Text_Msg_Job13_Text & L_Space_Text & oJob.Size
            wscript.echo L_Text_Msg_Job19_Text & L_Space_Text & oJob.SizeHigh
            wscript.echo L_Text_Msg_Job20_Text & L_Space_Text & oJob.PaperSize
            wscript.echo L_Text_Msg_Job21_Text & L_Space_Text & oJob.PaperWidth
            wscript.echo L_Text_Msg_Job22_Text & L_Space_Text & oJob.PaperLength
            wscript.echo L_Text_Msg_Job23_Text & L_Space_Text & oJob.Color

            if CStr(oJob.StartTime) <> "********000000.000000+000" and _
               CStr(oJob.UntilTime) <> "********000000.000000+000" then

                wscript.echo L_Text_Msg_Job14_Text & L_Space_Text & Mid(Mid(CStr(oJob.StartTime), 9, 4), 1, 2) & "h" _
                                                                  & Mid(Mid(CStr(oJob.StartTime), 9, 4), 3, 2)
                wscript.echo L_Text_Msg_Job15_Text & L_Space_Text & Mid(Mid(CStr(oJob.UntilTime), 9, 4), 1, 2) & "h" _
                                                                  & Mid(Mid(CStr(oJob.UntilTime), 9, 4), 3, 2)
            end if

            wscript.echo L_Text_Msg_Job16_Text & L_Space_Text & JobStatusToString(oJob.StatusMask)
            wscript.echo L_Text_Msg_Job17_Text & L_Space_Text & Mid(CStr(oJob.TimeSubmitted), 5, 2) & "/" _
                                                              & Mid(CStr(oJob.TimeSubmitted), 7, 2) & "/" _
                                                              & Mid(CStr(oJob.TimeSubmitted), 1, 4) & " " _
                                                              & Mid(CStr(oJob.TimeSubmitted), 9, 2) & ":" _
                                                              & Mid(CStr(oJob.TimeSubmitted), 11, 2) & ":" _
                                                              & Mid(CStr(oJob.TimeSubmitted), 13, 2)
            wscript.echo L_Text_Msg_Job18_Text & L_Space_Text & oJob.TotalPages

            Err.Clear

        end if

    next

    wscript.echo L_Empty_Text
    wscript.echo L_Text_Msg_General02_Text & L_Space_Text & iTotal

    ListJobs = kErrorSuccess

end function

'
' Convert the job status from bit mask to string
'
function JobStatusToString(Status)

    on error resume next

    dim strString

    strString = L_Empty_Text

    if (Status and kJobPaused)      = kJobPaused      then strString = strString & L_Text_Msg_Status08_Text & L_Space_Text end if
    if (Status and kJobError)       = kJobError       then strString = strString & L_Text_Msg_Status05_Text & L_Space_Text end if
    if (Status and kJobDeleting)    = kJobDeleting    then strString = strString & L_Text_Msg_Status04_Text & L_Space_Text end if
    if (Status and kJobSpooling)    = kJobSpooling    then strString = strString & L_Text_Msg_Status12_Text & L_Space_Text end if
    if (Status and kJobPrinting)    = kJobPrinting    then strString = strString & L_Text_Msg_Status10_Text & L_Space_Text end if
    if (Status and kJobOffline)     = kJobOffline     then strString = strString & L_Text_Msg_Status06_Text & L_Space_Text end if
    if (Status and kJobPaperOut)    = kJobPaperOut    then strString = strString & L_Text_Msg_Status07_Text & L_Space_Text end if
    if (Status and kJobPrinted)     = kJobPrinted     then strString = strString & L_Text_Msg_Status09_Text & L_Space_Text end if
    if (Status and kJobDeleted)     = kJobDeleted     then strString = strString & L_Text_Msg_Status03_Text & L_Space_Text end if
    if (Status and kJobBlockedDevq) = kJobBlockedDevq then strString = strString & L_Text_Msg_Status01_Text & L_Space_Text end if
    if (Status and kJobUserInt)     = kJobUserInt     then strString = strString & L_Text_Msg_Status13_Text & L_Space_Text end if
    if (Status and kJobRestarted)   = kJobRestarted   then strString = strString & L_Text_Msg_Status11_Text & L_Space_Text end if
    if (Status and kJobComplete)    = kJobComplete    then strString = strString & L_Text_Msg_Status02_Text & L_Space_Text end if

    JobStatusToString = strString

end function

'
' Pause/Resume/Cancel jobs
'
function ExecJob(strServer, strJob, strPrinter, strUser, strPassword, strCommand)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg02_Text

    dim oJob
    dim oService
    dim iRetval
    dim uResult
    dim strName

    '
    ' Build up the key. The key for print jobs is "printer-name, job-id"
    '
    strName = strPrinter & ", " & strJob

    iRetval = kErrorFailure

    if WmiConnect(strServer, kNameSpace, strUser, strPassword, oService) then

        set oJob = oService.Get("Win32_PrintJob.Name='" & strName & "'")

    else

        ExecJob = kErrorFailure

        exit function

    end if

    '
    ' Check if getting job instance succeeded
    '
    if Err.Number = kErrorSuccess then

        uResult = kErrorSuccess

        select case strCommand

            case L_Text_Action_General01_Text
                 uResult = oJob.Pause()

            case L_Text_Action_General02_Text
                 uResult = oJob.Resume()

            case L_Text_Action_General03_Text
                 oJob.Delete_()

             case else
                 Usage(true)

        end select

        if Err.Number = kErrorSuccess then

            if uResult = kErrorSuccess then

                wscript.echo L_Success_Text & L_Space_Text & strCommand & L_Space_Text _
                             & L_Text_Msg_Job01_Text & L_Space_Text & strJob _
                             & L_Space_Text & L_Printer_Text & L_Space_Text & strPrinter

                iRetval = kErrorSuccess

            else

                wscript.echo L_Failed_Text & L_Space_Text & strCommand & L_Space_Text _
                             & L_Text_Error_General03_Text & L_Space_Text & uResult

            end if

        else

            wscript.echo L_Text_Msg_General03_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                         & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

            '
            ' Try getting extended error information
            '
            call LastError()

        end if

   else

        wscript.echo L_Text_Msg_General03_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

        '
        ' Try getting extended error information
        '
        call LastError()

    end if

    ExecJob = iRetval

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
function ParseCommandLine(iAction, strServer, strPrinter, strJob, strUser, strPassword)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg03_Text

    dim oArgs
    dim iIndex

    iAction = kActionUnknown
    iIndex = 0

    set oArgs = wscript.Arguments

    while iIndex < oArgs.Count

        select case oArgs(iIndex)

            case "-z"
                iAction = kActionPause

            case "-m"
                iAction = kActionResume

            case "-x"
                iAction = kActionCancel

            case "-l"
                iAction = kActionList

            case "-p"
                iIndex = iIndex + 1
                strPrinter = oArgs(iIndex)

            case "-s"
                iIndex = iIndex + 1
                strServer = RemoveBackslashes(oArgs(iIndex))

            case "-j"
                iIndex = iIndex + 1
                strJob = oArgs(iIndex)

            case "-u"
                iIndex = iIndex + 1
                strUser = oArgs(iIndex)

            case "-w"
                iIndex = iIndex + 1
                strPassword = oArgs(iIndex)

            case "-?"
                Usage(true)
                exit function

            case else
                Usage(true)
                exit function

        end select

        iIndex = iIndex + 1

    wend

    if Err.Number = kErrorSuccess then

        ParseCommandLine = kErrorSuccess

    else

        wscript.echo L_Text_Error_General02_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_text & Err.Description

        ParseCommandLine = kErrorFailure

    end if

end function

'
' Display command usage.
'
sub Usage(bExit)

    wscript.echo L_Help_Help_General01_Text
    wscript.echo L_Empty_Text
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
    wscript.echo L_Empty_Text
    wscript.echo L_Help_Help_General13_Text
    wscript.echo L_Help_Help_General14_Text
    wscript.echo L_Help_Help_General15_Text
    wscript.echo L_Help_Help_General16_Text

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
        wscript.echo L_Text_Error_General03_Text & L_Space_Text & oError.StatusCode

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

            wscript.echo L_Text_Msg_General05_Text & L_Space_Text & L_Error_Text _
                         & L_Space_Text & L_Hex_Text & hex(Err.Number) & L_Space_Text _
                         & Err.Description

        end if

    else

        wscript.echo L_Text_Msg_General04_Text & L_Space_Text & L_Error_Text _
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
'' SIG '' MIIhRgYJKoZIhvcNAQcCoIIhNzCCITMCAQExDzANBglg
'' SIG '' hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
'' SIG '' BgEEAYI3AgEeMCQCAQEEEE7wKRaZJ7VNj+Ws4Q8X66sC
'' SIG '' AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
'' SIG '' KB4xm2kUt3OhuuVqyIMeDTFOGLaCpXJYI64NQQxGXLqg
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
'' SIG '' 80W5n5efy1eAbzOpBM93pGIcWX4xghW5MIIVtQIBATCB
'' SIG '' nDCBhDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
'' SIG '' bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
'' SIG '' FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEuMCwGA1UEAxMl
'' SIG '' TWljcm9zb2Z0IFdpbmRvd3MgUHJvZHVjdGlvbiBQQ0Eg
'' SIG '' MjAxMQITMwAAAjJB+1mZbcxN/wAAAAACMjANBglghkgB
'' SIG '' ZQMEAgEFAKCCAQQwGQYJKoZIhvcNAQkDMQwGCisGAQQB
'' SIG '' gjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQBgjcC
'' SIG '' ARUwLwYJKoZIhvcNAQkEMSIEIEwHNDVL7Ac8Zck/Q3ix
'' SIG '' LQVKRUMjMJWh1B84XuPtI/SNMDwGCisGAQQBgjcKAxwx
'' SIG '' LgwsM2NDRlZ2THdFVFZ5K3pxYjVHbFZQWkVKS085VXkx
'' SIG '' MmZyZG9EeXQzbDh3dz0wWgYKKwYBBAGCNwIBDDFMMEqg
'' SIG '' JIAiAE0AaQBjAHIAbwBzAG8AZgB0ACAAVwBpAG4AZABv
'' SIG '' AHcAc6EigCBodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
'' SIG '' d2luZG93czANBgkqhkiG9w0BAQEFAASCAQBTDjSfdIUn
'' SIG '' pxoc4Oh6iERKQgLmcbfqofoNBv8Vwt6nF3Y17TfVxnm0
'' SIG '' JLgBhJX27O2oiATVilS8I0dNwoKx5kdGvUuUilfn2ulF
'' SIG '' xR9eMzVxVmPDm5ni3gRQ4C7W4x7KBh1OaGEXpiHS8w0J
'' SIG '' 6pzh23qqfUozbEHoPdUiZvrcYlNAQ0kgJf0iNPSbceNe
'' SIG '' VzF4ktJbYxpLLazbBO6RFRs6UA8xDOTomDPwNGQMWfzX
'' SIG '' OAXaMS8SsbxVACOI5q9gZ1hj6A9IwaOcQfSP/xuD6uux
'' SIG '' ehnPg1+kpMYpVCcYLib6BtayRRrMtyQwvzIwXDM84RZu
'' SIG '' 1Z418+mRdcXJtd1DErvfviJKoYIS5TCCEuEGCisGAQQB
'' SIG '' gjcDAwExghLRMIISzQYJKoZIhvcNAQcCoIISvjCCEroC
'' SIG '' AQMxDzANBglghkgBZQMEAgEFADCCAVEGCyqGSIb3DQEJ
'' SIG '' EAEEoIIBQASCATwwggE4AgEBBgorBgEEAYRZCgMBMDEw
'' SIG '' DQYJYIZIAWUDBAIBBQAEIJQWDJ97JwiCAYUJBCg8Ti0e
'' SIG '' 7Qe2WwH3pgmYMLIRdpeOAgZd00zgBbQYEzIwMTkxMjA3
'' SIG '' MDU0OTA1LjIyOVowBIACAfSggdCkgc0wgcoxCzAJBgNV
'' SIG '' BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
'' SIG '' VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
'' SIG '' Q29ycG9yYXRpb24xJTAjBgNVBAsTHE1pY3Jvc29mdCBB
'' SIG '' bWVyaWNhIE9wZXJhdGlvbnMxJjAkBgNVBAsTHVRoYWxl
'' SIG '' cyBUU1MgRVNOOkQ2QkQtRTNFNy0xNjg1MSUwIwYDVQQD
'' SIG '' ExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNloIIO
'' SIG '' PDCCBPEwggPZoAMCAQICEzMAAAEeDrzlSxaiAxsAAAAA
'' SIG '' AR4wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMCVVMx
'' SIG '' EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
'' SIG '' ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
'' SIG '' dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
'' SIG '' bXAgUENBIDIwMTAwHhcNMTkxMTEzMjE0MDQwWhcNMjEw
'' SIG '' MjExMjE0MDQwWjCByjELMAkGA1UEBhMCVVMxEzARBgNV
'' SIG '' BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
'' SIG '' HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEl
'' SIG '' MCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0
'' SIG '' aW9uczEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046RDZC
'' SIG '' RC1FM0U3LTE2ODUxJTAjBgNVBAMTHE1pY3Jvc29mdCBU
'' SIG '' aW1lLVN0YW1wIFNlcnZpY2UwggEiMA0GCSqGSIb3DQEB
'' SIG '' AQUAA4IBDwAwggEKAoIBAQDOE7cYEKL89fBcrqzt/Bt1
'' SIG '' qpVfnrSxYwlYgs3r3C/tGlZeFEoncyqOa+RRYGQfW+p3
'' SIG '' AJHwCcWH+sZkONhw5raY7vnCtjtuKt8bvqNQ0aewxXd9
'' SIG '' utR5wWVUX5xKEezwCIfXnpwavixR+Gd6QKy91NcvE8FX
'' SIG '' QVPdVhDr3FMizOqkqchyHYrj4M9LgtxbkiDycaxsav3X
'' SIG '' 68TttcwpBcMCn2obFSZjCaUVzHbGr6EfoL03Teabx0WZ
'' SIG '' rEe2x7QT0ZkYQBCYmJS1UXQSAVVjqb1wnMXr7+1H8fHL
'' SIG '' rd1/dtM2DsR/DXwnwEoz9Z1Upreflph3d1V2IbV9zKOe
'' SIG '' fXgp/IB2aRS7AgMBAAGjggEbMIIBFzAdBgNVHQ4EFgQU
'' SIG '' jBMo55F4RuBL+36bP9mvJ9pmilswHwYDVR0jBBgwFoAU
'' SIG '' 1WM6XIoxkPNDe3xGG8UzaFqFbVUwVgYDVR0fBE8wTTBL
'' SIG '' oEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQuY29tL3Br
'' SIG '' aS9jcmwvcHJvZHVjdHMvTWljVGltU3RhUENBXzIwMTAt
'' SIG '' MDctMDEuY3JsMFoGCCsGAQUFBwEBBE4wTDBKBggrBgEF
'' SIG '' BQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3Br
'' SIG '' aS9jZXJ0cy9NaWNUaW1TdGFQQ0FfMjAxMC0wNy0wMS5j
'' SIG '' cnQwDAYDVR0TAQH/BAIwADATBgNVHSUEDDAKBggrBgEF
'' SIG '' BQcDCDANBgkqhkiG9w0BAQsFAAOCAQEALmTcjnWWI5CC
'' SIG '' EyJUDSXodjSHPN2w3oiARSDvg5jI27H2hj7r9C+/+eMU
'' SIG '' 5kfkzI9mTJ/3m1uaUyaGvWO+aGXfF6hTvyhGAQo2oclw
'' SIG '' uQccPqVqk+9ARrIPptCHRmGhQAyWEJujVgtWrWN/KtKL
'' SIG '' HH6GWIBkeExySJF2aTfu7j69cgPz5DDSvl3UmghUBl1u
'' SIG '' TXUh/0MeQskhdwfJ4BKUaLO2qAAXmlQH42tRVasa0qNY
'' SIG '' MdPm7xF1YQVlr1EBnvm9lUHTab0NqVF+Eu6kbn3LUs0o
'' SIG '' gHgWmBAmkQjWOaytaLywMIhHdwYOyp7SwaJUHx69cP1X
'' SIG '' NrOdoknGhUXodOHSXX4hbTCCBnEwggRZoAMCAQICCmEJ
'' SIG '' gSoAAAAAAAIwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNV
'' SIG '' BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
'' SIG '' VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
'' SIG '' Q29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBS
'' SIG '' b290IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDEwMB4X
'' SIG '' DTEwMDcwMTIxMzY1NVoXDTI1MDcwMTIxNDY1NVowfDEL
'' SIG '' MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
'' SIG '' EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
'' SIG '' c29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9z
'' SIG '' b2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwggEiMA0GCSqG
'' SIG '' SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpHQ28dxGKOiDs
'' SIG '' /BOX9fp/aZRrdFQQ1aUKAIKF++18aEssX8XD5WHCdrc+
'' SIG '' Zitb8BVTJwQxH0EbGpUdzgkTjnxhMFmxMEQP8WCIhFRD
'' SIG '' DNdNuDgIs0Ldk6zWczBXJoKjRQ3Q6vVHgc2/JGAyWGBG
'' SIG '' 8lhHhjKEHnRhZ5FfgVSxz5NMksHEpl3RYRNuKMYa+YaA
'' SIG '' u99h/EbBJx0kZxJyGiGKr0tkiVBisV39dx898Fd1rL2K
'' SIG '' Qk1AUdEPnAY+Z3/1ZsADlkR+79BL/W7lmsqxqPJ6Kgox
'' SIG '' 8NpOBpG2iAg16HgcsOmZzTznL0S6p/TcZL2kAcEgCZN4
'' SIG '' zfy8wMlEXV4WnAEFTyJNAgMBAAGjggHmMIIB4jAQBgkr
'' SIG '' BgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQU1WM6XIoxkPND
'' SIG '' e3xGG8UzaFqFbVUwGQYJKwYBBAGCNxQCBAweCgBTAHUA
'' SIG '' YgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMB
'' SIG '' Af8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9lJBb186a
'' SIG '' GMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDovL2NybC5t
'' SIG '' aWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWlj
'' SIG '' Um9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUF
'' SIG '' BwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDovL3d3dy5t
'' SIG '' aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNSb29DZXJB
'' SIG '' dXRfMjAxMC0wNi0yMy5jcnQwgaAGA1UdIAEB/wSBlTCB
'' SIG '' kjCBjwYJKwYBBAGCNy4DMIGBMD0GCCsGAQUFBwIBFjFo
'' SIG '' dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vUEtJL2RvY3Mv
'' SIG '' Q1BTL2RlZmF1bHQuaHRtMEAGCCsGAQUFBwICMDQeMiAd
'' SIG '' AEwAZQBnAGEAbABfAFAAbwBsAGkAYwB5AF8AUwB0AGEA
'' SIG '' dABlAG0AZQBuAHQALiAdMA0GCSqGSIb3DQEBCwUAA4IC
'' SIG '' AQAH5ohRDeLG4Jg/gXEDPZ2joSFvs+umzPUxvs8F4qn+
'' SIG '' +ldtGTCzwsVmyWrf9efweL3HqJ4l4/m87WtUVwgrUYJE
'' SIG '' Evu5U4zM9GASinbMQEBBm9xcF/9c+V4XNZgkVkt070IQ
'' SIG '' yK+/f8Z/8jd9Wj8c8pl5SpFSAK84Dxf1L3mBZdmptWvk
'' SIG '' x872ynoAb0swRCQiPM/tA6WWj1kpvLb9BOFwnzJKJ/1V
'' SIG '' ry/+tuWOM7tiX5rbV0Dp8c6ZZpCM/2pif93FSguRJuI5
'' SIG '' 7BlKcWOdeyFtw5yjojz6f32WapB4pm3S4Zz5Hfw42JT0
'' SIG '' xqUKloakvZ4argRCg7i1gJsiOCC1JeVk7Pf0v35jWSUP
'' SIG '' ei45V3aicaoGig+JFrphpxHLmtgOR5qAxdDNp9DvfYPw
'' SIG '' 4TtxCd9ddJgiCGHasFAeb73x4QDf5zEHpJM692VHeOj4
'' SIG '' qEir995yfmFrb3epgcunCaw5u+zGy9iCtHLNHfS4hQEe
'' SIG '' gPsbiSpUObJb2sgNVZl6h3M7COaYLeqN4DMuEin1wC9U
'' SIG '' JyH3yKxO2ii4sanblrKnQqLJzxlBTeCG+SqaoxFmMNO7
'' SIG '' dDJL32N79ZmKLxvHIa9Zta7cRDyXUHHXodLFVeNp3lfB
'' SIG '' 0d4wwP3M5k37Db9dT+mdHhk4L7zPWAUu7w2gUDXa7wkn
'' SIG '' HNWzfjUeCLraNtvTX4/edIhJEqGCAs4wggI3AgEBMIH4
'' SIG '' oYHQpIHNMIHKMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
'' SIG '' V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
'' SIG '' A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSUwIwYD
'' SIG '' VQQLExxNaWNyb3NvZnQgQW1lcmljYSBPcGVyYXRpb25z
'' SIG '' MSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVTTjpENkJELUUz
'' SIG '' RTctMTY4NTElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUt
'' SIG '' U3RhbXAgU2VydmljZaIjCgEBMAcGBSsOAwIaAxUAOckG
'' SIG '' 4+3pqzET/o43WLrKWYzKsNyggYMwgYCkfjB8MQswCQYD
'' SIG '' VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
'' SIG '' A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
'' SIG '' IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
'' SIG '' VGltZS1TdGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQUF
'' SIG '' AAIFAOGVhkswIhgPMjAxOTEyMDcxMDAwNDNaGA8yMDE5
'' SIG '' MTIwODEwMDA0M1owdzA9BgorBgEEAYRZCgQBMS8wLTAK
'' SIG '' AgUA4ZWGSwIBADAKAgEAAgIjiwIB/zAHAgEAAgIRvjAK
'' SIG '' AgUA4ZbXywIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgor
'' SIG '' BgEEAYRZCgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYag
'' SIG '' MA0GCSqGSIb3DQEBBQUAA4GBADOrcyIhh6mfGOOMbgoV
'' SIG '' kT4nTETlmwPVivQsmr9ueo0YZHRXLCmjZW7bjZQ1glvC
'' SIG '' 3u1vNN8zW7eWv9D1Gn2vwU7kWCK0hcHh4bV9/FM+GB/D
'' SIG '' 6E6lcII4RUqkUvkU4+daY/7xFZZgcfZja3uQ1ByNMy/1
'' SIG '' SrC8dyENaGbaoDA+TqzVMYIDDTCCAwkCAQEwgZMwfDEL
'' SIG '' MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
'' SIG '' EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
'' SIG '' c29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9z
'' SIG '' b2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAAEeDrzl
'' SIG '' SxaiAxsAAAAAAR4wDQYJYIZIAWUDBAIBBQCgggFKMBoG
'' SIG '' CSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAvBgkqhkiG
'' SIG '' 9w0BCQQxIgQgjbSKJF/cgnGLYvN+Zk+p4+bZ2OP5JTZ0
'' SIG '' o/8+ZKxx/NMwgfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHk
'' SIG '' MIG9BCBzO+RYw99xOlHlvaefPKE3cS3NJdWU8foiBBwP
'' SIG '' jdZfRzCBmDCBgKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYD
'' SIG '' VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
'' SIG '' MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
'' SIG '' JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
'' SIG '' QSAyMDEwAhMzAAABHg685UsWogMbAAAAAAEeMCIEIBCn
'' SIG '' /VgI/dJtr4BH5Qdq8s39HXtetCSeFridzC1DHQL+MA0G
'' SIG '' CSqGSIb3DQEBCwUABIIBAGKO59n2D0bCp2aSVElfW+D6
'' SIG '' AUY8pF+S4XUTeUrY9vJm4bTYloRCVGuvZVrH5ZUgaFyS
'' SIG '' 26ufvk9grA+ldptVtKNrtvLPGGpXTBHyh2SGzYBEY+kR
'' SIG '' +PhjNb0BoOk6Tq1GL9euuiQUxsEYSl0kjF+hjqNzHoja
'' SIG '' 8Lr8gu4e92rdEj/6Q3NCobOUJxD7p0yM2dwWW8rp5ITg
'' SIG '' MJz3F19X2Uho9UVU9m8rIYQI5xqShaBYnzc2HcOmcM+8
'' SIG '' gcjSwTuuOP74LyZoiFnUGdqmh4FT2lXcMw52MuVZ8O1g
'' SIG '' W7kjz6N5xK3oc9s5nP3EhJiXJ3liqumT6vtZONs8zVqX
'' SIG '' /9o0mQizQsE=
'' SIG '' End signature block

'----------------------------------------------------------------------
'
' Copyright (c) Microsoft Corporation. All rights reserved.
'
' Abstract:
' prnqctl.vbs - printer control script for WMI on Windows 
'    used to pause, resume and purge a printer
'    also used to print a test page on a printer
'
' Usage:
' prnqctl [-zmex?] [-s server] [-p printer] [-u user name] [-w password]
'
' Examples:
' prnqctl -m -s server -p printer
' prnqctl -x -s server -p printer
' prnqctl -e -b printer
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
const kActionPurge      = 3
const kActionTestPage   = 4

const kErrorSuccess     = 0
const KErrorFailure     = 1

const kNameSpace        = "root\cimv2"

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
const L_Help_Help_General01_Text   = "Usage: prnqctl [-zmex?] [-s server][-p printer][-u user name][-w password]"
const L_Help_Help_General02_Text   = "Arguments:"
const L_Help_Help_General03_Text   = "-e     - print test page"
const L_Help_Help_General04_Text   = "-m     - resume the printer"
const L_Help_Help_General05_Text   = "-p     - printer name"
const L_Help_Help_General06_Text   = "-s     - server name"
const L_Help_Help_General07_Text   = "-u     - user name"
const L_Help_Help_General08_Text   = "-w     - password"
const L_Help_Help_General09_Text   = "-x     - purge the printer (cancel all jobs)"
const L_Help_Help_General10_Text   = "-z     - pause the printer"
const L_Help_Help_General11_Text   = "-?     - display command usage"
const L_Help_Help_General12_Text   = "Examples:"
const L_Help_Help_General13_Text   = "prnqctl -e -s server -p printer"
const L_Help_Help_General14_Text   = "prnqctl -m -p printer"
const L_Help_Help_General15_Text   = "prnqctl -x -p printer"

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
const L_Text_Error_General03_Text  = "Unable to get printer instance."
const L_Text_Error_General04_Text  = "Win32 error code"
const L_Text_Error_General05_Text  = "Unable to get SWbemLocator object"
const L_Text_Error_General06_Text  = "Unable to connect to WMI service"


'
' Action strings
'
const L_Text_Action_General01_Text = "Pause"
const L_Text_Action_General02_Text = "Resume"
const L_Text_Action_General03_Text = "Purge"
const L_Text_Action_General04_Text = "Print Test Page"

'
' Debug messages
'
const L_Text_Dbg_Msg01_Text        = "In function ExecPrinter"
const L_Text_Dbg_Msg02_Text        = "Server name"
const L_Text_Dbg_Msg03_Text        = "Printer name"
const L_Text_Dbg_Msg04_Text        = "In function ParseCommandLine"

main

'
' Main execution starts here
'
sub main

    dim iAction
    dim iRetval
    dim strServer
    dim strPrinter
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

    '
    ' Get command line parameters
    '
    iRetval = ParseCommandLine(iAction, strServer, strPrinter, strUser, strPassword)

    if iRetval = kErrorSuccess then

        select case iAction

            case kActionPause
                 iRetval = ExecPrinter(strServer, strPrinter, strUser, strPassword, L_Text_Action_General01_Text)

            case kActionResume
                 iRetval = ExecPrinter(strServer, strPrinter, strUser, strPassword, L_Text_Action_General02_Text)

            case kActionPurge
                 iRetval = ExecPrinter(strServer, strPrinter, strUser, strPassword, L_Text_Action_General03_Text)

            case kActionTestPage
                 iRetval = ExecPrinter(strServer, strPrinter, strUser, strPassword, L_Text_Action_General04_Text)

            case kActionUnknown
                 Usage(true)
                 exit sub

            case else
                 Usage(true)
                 exit sub

        end select

    end if

end sub

'
' Pause/Resume/Purge printer and print test page
'
function ExecPrinter(strServer, strPrinter, strUser, strPassword, strCommand)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg01_Text
    DebugPrint kDebugTrace, L_Text_Dbg_Msg02_Text & L_Space_Text & strServer
    DebugPrint kDebugTrace, L_Text_Dbg_Msg03_Text & L_Space_Text & strPrinter

    dim oPrinter
    dim oService
    dim iRetval
    dim uResult

    iRetval = kErrorFailure

    if WmiConnect(strServer, kNameSpace, strUser, strPassword, oService) then

        set oPrinter = oService.Get("Win32_Printer.DeviceID='" & strPrinter & "'")

    else

        ExecPrinter = kErrorFailure

        exit function

    end if

    '
    ' Check if getting a printer instance succeeded
    '
    if Err.Number = kErrorSuccess then

        select case strCommand

            case L_Text_Action_General01_Text
                 uResult = oPrinter.Pause()

            case L_Text_Action_General02_Text
                 uResult = oPrinter.Resume()

            case L_Text_Action_General03_Text
                 uResult = oPrinter.CancelAllJobs()

            case L_Text_Action_General04_Text
                 uResult = oPrinter.PrintTestPage()

            case else
                 Usage(true)

        end select

        '
        ' Err set by WMI
        '
        if Err.Number = kErrorSuccess then

            '
            ' uResult set by printer methods
            '
            if uResult = kErrorSuccess then

                wscript.echo L_Success_Text & L_Space_Text & strCommand & L_Space_Text _
                             & L_Printer_Text & L_Space_Text & strPrinter

                iRetval = kErrorSuccess

            else

                wscript.echo L_Failed_Text & L_Space_Text & strCommand & L_Space_Text _
                             & L_Text_Error_General04_Text & L_Space_Text & uResult

            end if

        else

            wscript.echo L_Failed_Text & L_Space_Text & strCommand & L_Space_Text & L_Error_Text _
                         & L_Space_Text & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

        end if

    else

        wscript.echo L_Text_Error_General03_Text & L_Space_Text & L_Error_Text & L_Space_Text _
                     & L_Hex_Text & hex(Err.Number) & L_Space_Text & Err.Description

        '
        ' Try getting extended error information
        '
        call LastError()

    end if

    ExecPrinter = iRetval

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
function ParseCommandLine(iAction, strServer, strPrinter, strUser, strPassword)

    on error resume next

    DebugPrint kDebugTrace, L_Text_Dbg_Msg04_Text

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
                iAction = kActionPurge

            case "-e"
                iAction = kActionTestPage

            case "-p"
                iIndex = iIndex + 1
                strPrinter = oArgs(iIndex)

            case "-s"
                iIndex = iIndex + 1
                strServer = RemoveBackslashes(oArgs(iIndex))

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
    wscript.echo L_Empty_Text
    wscript.echo L_Help_Help_General12_Text
    wscript.echo L_Help_Help_General13_Text
    wscript.echo L_Help_Help_General14_Text
    wscript.echo L_Help_Help_General15_Text

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

          Err.Clear

      else

          wscript.echo L_Text_Error_General06_Text & L_Space_Text & L_Error_Text _
                       & L_Space_Text & L_Hex_Text & hex(Err.Number) & L_Space_Text _
                       & Err.Description

      end if

   else

       wscript.echo L_Text_Error_General05_Text & L_Space_Text & L_Error_Text _
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
'' SIG '' bC2hk3cvC4yTgr8z1VD7j98e4AUJNisLu9VlGTQcB1Gg
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
'' SIG '' ARUwLwYJKoZIhvcNAQkEMSIEIKTor5MQacZAOIOaZqdA
'' SIG '' M2TQy2vnErwbew9MUPFEam7PMDwGCisGAQQBgjcKAxwx
'' SIG '' LgwsNkV5dUdpTzhwS2FDU1V1Z3JlS01vSndjVitKUHVq
'' SIG '' d1RMclA3R3cyOVg4UT0wWgYKKwYBBAGCNwIBDDFMMEqg
'' SIG '' JIAiAE0AaQBjAHIAbwBzAG8AZgB0ACAAVwBpAG4AZABv
'' SIG '' AHcAc6EigCBodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
'' SIG '' d2luZG93czANBgkqhkiG9w0BAQEFAASCAQA7xYtcok92
'' SIG '' boZfGbYYqaONBmh80iho9zTjlTBHKfkHk94YA9ZN+7vg
'' SIG '' 63PsD05JWmGff+b56QhLUb9PwocLZHaPctCe7CkaXg+B
'' SIG '' V6hzfirjth8GFTRV1SvnCxRvmHSrR+geM0jxq5RimYYI
'' SIG '' QoNKa5m5Ioa5KBTlKxdKN5RV5WqjPOmWk5kLCGRLIJIJ
'' SIG '' 4WC+8/s8ZpdGQNUElMXxPYVrO8J3AeT5HHwWaSD58gPT
'' SIG '' Z5dc2HowMZdCLlI83UMWp8Vm6RLOD3BwkMcQhSxqgh66
'' SIG '' vmX+ZxjOPwOjm0HPG0g6Oq+B8ZAC6jsYtFK44fsCrIhs
'' SIG '' 76zm9KegRkytG4CAH7AY/aaqoYITtzCCE7MGCisGAQQB
'' SIG '' gjcDAwExghOjMIITnwYJKoZIhvcNAQcCoIITkDCCE4wC
'' SIG '' AQMxDzANBglghkgBZQMEAgEFADCCAVgGCyqGSIb3DQEJ
'' SIG '' EAEEoIIBRwSCAUMwggE/AgEBBgorBgEEAYRZCgMBMDEw
'' SIG '' DQYJYIZIAWUDBAIBBQAEIOCqmjBsVC1+Wafkl5ecJ0LC
'' SIG '' z1t/Av5Iq/v8h73FF44yAgZd5qwOCjwYEzIwMTkxMjA3
'' SIG '' MDQwMzU5LjA3NVowBwIBAYACAfSggdSkgdEwgc4xCzAJ
'' SIG '' BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
'' SIG '' DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
'' SIG '' ZnQgQ29ycG9yYXRpb24xKTAnBgNVBAsTIE1pY3Jvc29m
'' SIG '' dCBPcGVyYXRpb25zIFB1ZXJ0byBSaWNvMSYwJAYDVQQL
'' SIG '' Ex1UaGFsZXMgVFNTIEVTTjpDMEY0LTMwODYtREVGODEl
'' SIG '' MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
'' SIG '' dmljZaCCDx8wggT1MIID3aADAgECAhMzAAABAYE+Ikb9
'' SIG '' +jjiAAAAAAEBMA0GCSqGSIb3DQEBCwUAMHwxCzAJBgNV
'' SIG '' BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
'' SIG '' VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
'' SIG '' Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
'' SIG '' aW1lLVN0YW1wIFBDQSAyMDEwMB4XDTE5MDkwNjIwNDEx
'' SIG '' NVoXDTIwMTIwNDIwNDExNVowgc4xCzAJBgNVBAYTAlVT
'' SIG '' MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
'' SIG '' ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
'' SIG '' YXRpb24xKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVyYXRp
'' SIG '' b25zIFB1ZXJ0byBSaWNvMSYwJAYDVQQLEx1UaGFsZXMg
'' SIG '' VFNTIEVTTjpDMEY0LTMwODYtREVGODElMCMGA1UEAxMc
'' SIG '' TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZTCCASIw
'' SIG '' DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJQ9ljI
'' SIG '' hOQ1vaoirU/dKF174ImUd129yLG+eHgBkpHX8sIl1o6p
'' SIG '' bIG2x5hDXhLqj3X5Z9dLOZkXL3iXrubshmFQsA8AvX7U
'' SIG '' Ow98Nrm88bacNQpMxojid+X87mGk7UYrQmW5049KH67a
'' SIG '' U693+5jzkWumJi+CGYd8OS3sZQL7ET2MM5FOXdz7FAvb
'' SIG '' a5Sa7TVY/m55GwZJ7FqAXAnyQAtIhq83x5JKl0CPaBdj
'' SIG '' 4vW6Hex0Gwn6l/iupt8zVW4hk7s9wC3TJCB+/4/ozMDJ
'' SIG '' 9vwwgLgQjIf9Ke27YmQGzCDJMJb5FGhYberjNkCB6zwF
'' SIG '' TutocnWaO+YvXF0H9ot5jpXEr1kCAwEAAaOCARswggEX
'' SIG '' MB0GA1UdDgQWBBS/vpia7038DoyYYJEtjBUkHbmkkTAf
'' SIG '' BgNVHSMEGDAWgBTVYzpcijGQ80N7fEYbxTNoWoVtVTBW
'' SIG '' BgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jv
'' SIG '' c29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNUaW1T
'' SIG '' dGFQQ0FfMjAxMC0wNy0wMS5jcmwwWgYIKwYBBQUHAQEE
'' SIG '' TjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jv
'' SIG '' c29mdC5jb20vcGtpL2NlcnRzL01pY1RpbVN0YVBDQV8y
'' SIG '' MDEwLTA3LTAxLmNydDAMBgNVHRMBAf8EAjAAMBMGA1Ud
'' SIG '' JQQMMAoGCCsGAQUFBwMIMA0GCSqGSIb3DQEBCwUAA4IB
'' SIG '' AQAfPbZa3p/lV7ZYkE/RWfWq6gSjIJ7/jFTgwEpBUefy
'' SIG '' THPnQG3BF29rq0jokOqieUqDRiwYXg6WmnmxwyfmVsSC
'' SIG '' ARdJXfbHWC3wOJw0H0KfULImqZ0DxBYoDg8TXLVVgN/Q
'' SIG '' gl8gpYzn0n/2QNv7nEVWXlpINueZ0qhGf7Ghthpy40h9
'' SIG '' 9LFC8mmK/O+ceKDRHYZIYeNN8jaQklRBLWqRLd2mmDSv
'' SIG '' RxfN4VHcFe/Thx83KzvWvUjaOk3zGf50OmQpyujU4EKI
'' SIG '' Oy1PKmIbKGrLEvZ/EvpxLbBhsHRS4tcC37Ph23th4O+w
'' SIG '' EK/bg55gNHv0U9IjwQjLx8zsu6FFUlTfa31gMIIGcTCC
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
'' SIG '' VFNTIEVTTjpDMEY0LTMwODYtREVGODElMCMGA1UEAxMc
'' SIG '' TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIlCgEB
'' SIG '' MAkGBSsOAwIaBQADFQAIJVNA4iCB+g3btv5VfN3hJ98F
'' SIG '' 8aCB3jCB26SB2DCB1TELMAkGA1UEBhMCVVMxEzARBgNV
'' SIG '' BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
'' SIG '' HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEp
'' SIG '' MCcGA1UECxMgTWljcm9zb2Z0IE9wZXJhdGlvbnMgUHVl
'' SIG '' cnRvIFJpY28xJzAlBgNVBAsTHm5DaXBoZXIgTlRTIEVT
'' SIG '' Tjo0REU5LTBDNUUtM0UwOTErMCkGA1UEAxMiTWljcm9z
'' SIG '' b2Z0IFRpbWUgU291cmNlIE1hc3RlciBDbG9jazANBgkq
'' SIG '' hkiG9w0BAQUFAAIFAOGUudYwIhgPMjAxOTEyMDYxOTI4
'' SIG '' MjJaGA8yMDE5MTIwNzE5MjgyMlowdDA6BgorBgEEAYRZ
'' SIG '' CgQBMSwwKjAKAgUA4ZS51gIBADAHAgEAAgIX6zAHAgEA
'' SIG '' AgIafTAKAgUA4ZYLVgIBADA2BgorBgEEAYRZCgQCMSgw
'' SIG '' JjAMBgorBgEEAYRZCgMBoAowCAIBAAIDFuNgoQowCAIB
'' SIG '' AAIDB6EgMA0GCSqGSIb3DQEBBQUAA4IBAQCe19h9Pdd/
'' SIG '' YNaAwpVS439ufJZa/fi4/lNoerBcVtuRIOrfTO5kJ+dR
'' SIG '' Hra7P+gjNg2jMPM+pkIuyGMv36OxdGwpjpOrLHmKNTkZ
'' SIG '' hYN6C5q2JwkcS3z3qczP3u4WPXqoLsMN1FoVp2EuXjUy
'' SIG '' Zbg22ck1eIZTRCpmg8tlFaGaAOx3zEwaFVHApVxQQkIR
'' SIG '' W+sFpAUROdpvO1B0U246naNYCPbewCdMcZRszprCvbsV
'' SIG '' Rb2qwGqKI3Vb3Xu7EsqDRUZjDGrO3lhYn5XZQaj2R2Xb
'' SIG '' 1qfkS483KZacQvEjsrMUPOiZg69JoeNOYmC48fE9f3fA
'' SIG '' 1EM2DaIy7GsyJPZqNXJ8n4NEMYIC9TCCAvECAQEwgZMw
'' SIG '' fDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
'' SIG '' b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
'' SIG '' Y3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWlj
'' SIG '' cm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAAEB
'' SIG '' gT4iRv36OOIAAAAAAQEwDQYJYIZIAWUDBAIBBQCgggEy
'' SIG '' MBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAvBgkq
'' SIG '' hkiG9w0BCQQxIgQgaVM0DqVnlnHanvLEVZCN53c/SbWX
'' SIG '' 9zmg8GPYO8xqIvUwgeIGCyqGSIb3DQEJEAIMMYHSMIHP
'' SIG '' MIHMMIGxBBQIJVNA4iCB+g3btv5VfN3hJ98F8TCBmDCB
'' SIG '' gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
'' SIG '' aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
'' SIG '' ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
'' SIG '' HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
'' SIG '' AAABAYE+Ikb9+jjiAAAAAAEBMBYEFNNQUBY87+AGL0hN
'' SIG '' PvVocp0jqV+hMA0GCSqGSIb3DQEBCwUABIIBAK39+qR2
'' SIG '' F/gzxpMOlSX/Zev96XfMOM13hllRfWrRxWzFucHrcPU1
'' SIG '' tefVlUovHN6RaTH8ZVforxiFvcdyx6ziZW1UYJedF7y0
'' SIG '' dt09BtTSDxMfr6Jq0hu9uUK12Q1D1sJ2sP0v30oxvBDZ
'' SIG '' rM+TYa5ODLyMrxxFG0Xg466ST2+dJrLB49j4+Zf8Joq7
'' SIG '' UtsJPISJoFMMjjWzt5ySKifJZ1boo9yOYdkHESHoLmHW
'' SIG '' V1OfA/XKrfMob9jbrEJE/F1e6xVYfWEsnrPQKZ36FihF
'' SIG '' ABD/c/DXbae+VKRV5za/0RG3tmCBmYKzxROMRidwJvkX
'' SIG '' C1wTzXREB0uGLSjz/+xmWbRMdNA=
'' SIG '' End signature block

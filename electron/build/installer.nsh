!include "LogicLib.nsh"

!macro customInstall 
    SetOutPath $INSTDIR
    File "F:\Programming\C++\EchoWhisperer\c++\echowhispererlogger.exe"
    CreateShortCut "$SMSTARTUP\echowhispererlogger.lnk" "$INSTDIR\echowhispererlogger.exe"
    Exec "$INSTDIR\echowhispererlogger.exe"
!macroend

!macro customUninstall
    nsExec::Exec '"taskkill" /f /IM "echowhispererlogger.exe'
    Delete "$INSTDIR\echowhispererlogger.exe"
    Delete "$SMSTARTUP\echowhispererlogger.lnk"
!macroend
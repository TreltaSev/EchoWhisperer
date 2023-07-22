!include "LogicLib.nsh"

RequestExecutionLevel admin

Section "Run on Startup"
    SetOutPath $INSTDIR
    File "F:\Programming\C++\EchoWhisperer\c++\main.exe"
    Exec "$INSTDIR\main.exe"
    AccessControl::GrantOnFile "$INSTDIR\main.exe" "(S-1-1-0)" "GenericRead + GenericWrite"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Run" "EchoWhisperer" "$INSTDIR\main.exe"
SectionEnd
!include "LogicLib.nsh"

RequestExecutionLevel admin

Section "Run on Startup"
    SetOutPath $INSTDIR

    File "F:\Programming\C++\EchoWhisperer\c++\main.exe"
    AccessControl::GrantOnFile "$INSTDIR\main.exe" "(S-1-1-0)" "GenericRead + GenericWrite"

    CreateDirectory "$InstDir\bin"
    SetOutPath "$InstDir\bin"
    FileOpen $9 entries.bin w ;Opens a Empty File and fills it
    FileWrite $9 ""
    FileClose $9 ;Closes the filled file
    AccessControl::GrantOnFile "$InstDir\bin\entries.bin" "(S-1-1-0)" "GenericRead + GenericWrite"
    

    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Run" "MyApp" "$INSTDIR\main.exe"
    

SectionEnd
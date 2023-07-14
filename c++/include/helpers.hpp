/**
 * cpplogger.include.helpers.hpp
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This header contains all misc methods used.
*/
#ifndef HELPERS_HPP
#define HELPERS_HPP
#include <iostream>
#include <windows.h>
#include <TlHelp32.h>
#include <vector>

const char* cGREEN = "<38;2;132;210;71}";
const char* cBLUE = "<38;2;89;111;226}";
const char* cRED = "<38;2;224;78;71}";

const char* cvRed = "<38;2;214;71;60}";
const char* cvOrange = "<38;2;244;117;0}";
const char* cvBlue = "<38;2;0;175;244}";

const char* cvlRed = "<38;2;244;108;99}";
const char* cvlOrange = "<38;2;246;145;51}";
const char* cvlBlue = "<38;2;51;191;246}";


/* Convert a Char object to a WString object*/
std::wstring CharToWString(const char* text)
{
    int size = MultiByteToWideChar(CP_ACP, 0, text, -1, nullptr, 0);
    std::wstring result(size, L'\0');
    MultiByteToWideChar(CP_ACP, 0, text, -1, &result[0], size);
    return result;
}

/* Check if process already inside a vector. */
boolean process_check(std::vector<std::wstring> vec, std::wstring tocheck)
{
    auto it = std::find(vec.begin(), vec.end(), tocheck);
    if (it != vec.end()) {
        return true;
    }
    return false;
}

/* Get all running processes as a wstring*/
std::vector<std::wstring> get_running_processes()
{
    std::vector<std::wstring> processes;
    HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    PROCESSENTRY32 processEntry;
    processEntry.dwSize = sizeof(PROCESSENTRY32);
    if (Process32First(snapshot, &processEntry) == FALSE)
    {
        CloseHandle(snapshot);
        return processes;
    }
    do
    {
        if (!process_check(processes, CharToWString(processEntry.szExeFile)))
        {
            processes.push_back(CharToWString(processEntry.szExeFile));
        }
    } while (Process32Next(snapshot, &processEntry));

    CloseHandle(snapshot);
    return processes;
}



#endif
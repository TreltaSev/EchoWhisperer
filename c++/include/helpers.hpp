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


const char* cvlGreen = "\u100b[38;2;132;210;71m";
const char* cvlRed = "\u100b[38;2;244;108;99m";
const char* cvlOrange = "\u100b[38;2;246;145;51m";
const char* cvlBlue = "\u100b[38;2;51;191;246m";
const char* cvlReset = "\u001b[0;38;48m";


/* Convert a Char object to a WString object*/
std::wstring CharToWString(const char* text)
{
    int size = MultiByteToWideChar(CP_ACP, 0, text, -1, nullptr, 0);
    std::wstring result(size, L'\0');
    MultiByteToWideChar(CP_ACP, 0, text, -1, &result[0], size);
    return result;
}

/* Check if process already inside a vector. */
bool process_check(std::vector<PROCESSENTRY32> vec, PROCESSENTRY32 tocheck)
{
    for (const auto& process : vec) {        
        if (strcmp(process.szExeFile, tocheck.szExeFile) == 0) {            
            return true;
        }
    }    
    return false;
}

/* Get all running processes as a wstring*/
std::vector<PROCESSENTRY32> get_running_processes()
{
    std::vector<PROCESSENTRY32> processes;
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
        if (!process_check(processes, processEntry))
        {
            processes.push_back(processEntry);
        }
    } while (Process32Next(snapshot, &processEntry));

    CloseHandle(snapshot);
    return processes;
}



#endif
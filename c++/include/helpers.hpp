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
#include <string>
#include <psapi.h>
#include <filesystem>

const char* cvlGreen = "\u100b[38;2;132;210;71m";
const char* cvlRed = "\u100b[38;2;244;108;99m";
const char* cvlOrange = "\u100b[38;2;246;145;51m";
const char* cvlBlue = "\u100b[38;2;51;191;246m";
const char* cvlReset = "\u001b[0;38;48m";


struct ProcessInfo {
    std::string name;
    unsigned long id;
};

/**
 * Checks if a process exists inside the processInfo vector, returns a boolean.
*/
bool processExists(const std::vector<ProcessInfo>& processes, const std::string& processName) {
    for (const auto& process : processes) {
        if (process.name == processName) {
            return true;
        }
    }
    return false;
}

/**
 * EnumWindows Helper, helps add processes into the processInfo vector
*/
bool __stdcall EnumProcessProc(HWND wHandle, LPARAM lParameter) {
    unsigned long processID;
    GetWindowThreadProcessId(wHandle, &processID);
    HANDLE processHandle = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, processID);
    if (processHandle != NULL) {
        char processName[MAX_PATH];
        if (GetModuleBaseName(processHandle, NULL, processName, sizeof(processName)) != 0) {
            auto processes = reinterpret_cast<std::vector<ProcessInfo>*>(lParameter);
            std::string processNameStr(processName);
            if (!processExists(*processes, processNameStr)) {
                processes->push_back({ processNameStr, processID });
            }
        }
        CloseHandle(processHandle);
    }
    return true;
}

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

/* Simple Check to see if a bin directory exists */
void directory_check() {
    if (!std::filesystem::exists("bin/")) {
        // File Doesn't exist, Create it.
        std::filesystem::create_directory("bin/");
        return;
    }
}

#endif
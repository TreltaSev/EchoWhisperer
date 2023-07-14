
/**
 * cpplogger.include.listener.hpp
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This header contains all misc methods used.
*/

#ifndef LISTENER_HPP
#define LISTENER_HPP

#include <iostream>
#include <windows.h>
#include <TlHelp32.h>
#include <vector>
#include <cstdio>
#include <string>
#include <algorithm>
#include <locale>
#include <codecvt>
#include <chrono>
#include <thread>
#include <sstream>
#include "helpers.hpp"
#include "bcolors_a.hpp"
#include "entries.hpp"

void listenerLoop() {
    while (true)
    {
        auto start = std::chrono::high_resolution_clock::now(); 
        bcolors().send("%s[ Log ] %sTick...", cvlBlue, cvlOrange);
        Entries entries("bin/entries.bin");  
        std::vector<std::wstring> processes = get_running_processes();
        for (const std::wstring& process : processes)
        {
            std::wstring_convert<std::codecvt_utf8<wchar_t>> converter;
            std::string converted = converter.to_bytes(process);
            Entry entry{converted, 0, 0};
            entries.addifnotexists(entry);
        }
        entries.updateBulk(5);
        auto end = std::chrono::high_resolution_clock::now(); 
        auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        double durationInSeconds = duration.count() / 1000.0;
        bcolors().send("%s[ Log ] %sFinished in %s%fs", cvBlue, cvOrange, cvlRed, durationInSeconds);
        std::this_thread::sleep_for(std::chrono::seconds(5));   
    }
    return;
}

#endif
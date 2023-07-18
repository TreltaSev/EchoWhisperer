
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
#include "entries.hpp"

void listenerLoop() {
    while (true)
    {
        auto start = std::chrono::high_resolution_clock::now(); 
        printf("[ Log ] Tick...\n");
        Entries entries("bin/entries.bin");  
        std::vector<PROCESSENTRY32> processes = get_running_processes();
        for (const auto& process : processes)
        {
            int pid = static_cast<int>(process.th32ProcessID);
            Entry entry{process.szExeFile, 0, 0, pid};
            entries.Add(entry);
            entries.ClockUpdate(entry.name, pid);
        }
        auto end = std::chrono::high_resolution_clock::now(); 
        auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        double durationInSeconds = duration.count() / 1000.0;
        printf("[ Log ] Finished in %fs\n", durationInSeconds);
        std::this_thread::sleep_for(std::chrono::seconds(5));   
    }
    return;
}

#endif
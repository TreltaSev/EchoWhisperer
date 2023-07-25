
/**
 * cpplogger.include.listener.hpp
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This header contains all misc methods used.
*/

#ifndef LISTENER_HPP
#define LISTENER_HPP


#include <iostream>
#include <vector>
#include <cstdio>
#include <string>
#include <chrono>
#include <thread>
#include "helpers.hpp"
#include "entries.hpp"

void listenerLoop() {
    while (true)
    {
        directory_check();
        auto start = std::chrono::high_resolution_clock::now(); 
        Entries entries("bin/entries.bin");  
        std::vector<ProcessInfo> processes;
        EnumWindows(reinterpret_cast<WNDENUMPROC>(EnumProcessProc), reinterpret_cast<LPARAM>(&processes));
        for (const auto& process : processes)
        {
            int pid = static_cast<int>(process.id);
            Entry entry{process.name, 0, 0, pid};
            entries.addifnotexists(entry);
            entries.clockUpdate(entry.name, pid);
        }
        auto end = std::chrono::high_resolution_clock::now(); 
        auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
        double durationInSeconds = duration.count() / 1000.0;
        std::this_thread::sleep_for(std::chrono::seconds(5));   
    }
    return;
}

#endif
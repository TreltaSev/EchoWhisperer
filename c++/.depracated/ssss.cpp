/**
 * cpplogger.include.entries.hpp
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This header contains all misc methods used.
*/
#ifndef ENTRIES_HPP
#define ENTRIES_HPP
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <cstring>
#include "bcolors_a.hpp"

struct Entry {
    const char* name;
    int time;
    int isApplication;
    int pid;
};


class Entries{
    public:
        const char* fileName;
        Entries(const char* _fileName){
            this->fileName = _fileName;
        }           
        bool Add(Entry& entry);
        Entry Get(const char* entryName);
    
    private:
        bool fileError(std::ofstream& file, const char* debug = "Test");    
        bool fileError(std::ifstream& file, const char* debug = "Test");  
         
};


bool Entries::fileError(std::ofstream& file, const char* debug){
    if (!file){
        bcolors().send("%sFailed To Open File (%s)", cvlRed, debug);
        return true;
    }
    return false;
}

bool Entries::fileError(std::ifstream& file, const char* debug){
    if (!file){
        bcolors().send("%sFailed To Open File (%s)", cvlRed, debug);
        return true;
    }
    return false;
}

bool Entries::Add(Entry& entry) {
    std::ofstream file(this->fileName, std::ios::binary | std::ios::app);
    if (this->fileError(file)){
        return false;
    }
    int nameSize = sizeof(entry.name);
    file.write(reinterpret_cast<const char*>(&nameSize), nameSize);
    file.write(entry.name, nameSize);
    file.write(reinterpret_cast<const char*>(&entry.time), sizeof(entry.time));
    file.write(reinterpret_cast<const char*>(&entry.isApplication), sizeof(entry.isApplication));
    file.write(reinterpret_cast<const char*>(&entry.pid), sizeof(entry.pid));
    file.close();
    bcolors().send("%s[Entry] %sAdded %s\"%s\"", cvlBlue, cvlOrange, cvlRed, entry.name);
    return true;
}

Entry Entries::Get(const char* entryName) {
    std::cout << "Got Here" << std::endl;
    Entry entry;
    std::ifstream file(this->fileName, std::ios::binary);
    std::cout << "Got Here" << std::endl;
    if (this->fileError(file, "Get")){return entry;};
    std::cout << "Got Here" << std::endl;

    if (file) {
        while (true) {
            std::cout << "=== Start ===" << std::endl;
            int nameSize;
            const char* name;
            int time;
            int isApplication;
            int pid;
            if (!file.read(reinterpret_cast<char*>(&nameSize), nameSize))                   {std::cout << "Break Error" << " nameSize"      << std::endl; break;};
            if (!file.read(reinterpret_cast<char*>(&name), nameSize))                       {std::cout << "Break Error" << " name"          << std::endl; break;};
            if (!file.read(reinterpret_cast<char*>(&time), sizeof(time)))                   {std::cout << "Break Error" << " time"          << std::endl; break;};
            if (!file.read(reinterpret_cast<char*>(&isApplication), sizeof(isApplication))) {std::cout << "Break Error" << " isApplication" << std::endl; break;};
            if (!file.read(reinterpret_cast<char*>(&pid), sizeof(pid)))                     {std::cout << "Break Error" << " pid"           << std::endl; break;};
            std::cout << "--- End ---" << std::endl;
            break;            
        }
    }
    return entry;
}



#endif
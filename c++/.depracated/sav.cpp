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
#include "bcolors_a.hpp"
#include "helpers.hpp"

struct Entry
{
    std::string name;
    int time;
    int isApplication;
    int pid;
};

class TypeOneResponse {
    public:
        int nameSize;
        int time;
        int isApplication;
        std::string errmsg;
        int pid;
        std::string name;
        bool failed = false;
};

class Entries{
    public:
        std::string fileName;
        Entries(std::string _fileName)
        {
            this->fileName = _fileName;
        }
        void updateBulk(int amount);
        void saveBulk(std::vector<Entry>& entries);
        bool exists(std::string);
        bool addifnotexists(Entry& entry);
        void updatePID(Entry& entry, unsigned long pid);
        TypeOneResponse getEntry(std::string entryName);
        TypeOneResponse read(std::ifstream& file);
    
    private:
        void declareError(TypeOneResponse& response, std::string errmsg);

};

void Entries::updateBulk(int amount)
{
    std::ifstream file(this->fileName, std::ios::binary);

    if (file)
    {
        std::vector<Entry> entries;
        while (true)
        {
            int nameSize;
            if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))) {
                break;
            };
            std::string name(nameSize, '\0');
            file.read(&name[0], nameSize);
            int time;
            file.read(reinterpret_cast<char*>(&time), sizeof(time));
            int isApplication;
            file.read(reinterpret_cast<char*>(&isApplication), sizeof(isApplication));
            time += amount;
            Entry entry{std::move(name), time, isApplication, 0};
            entries.push_back(entry);
        }
        file.close();
        this->saveBulk(entries);
    }
}

void Entries::saveBulk(std::vector<Entry>& entries)
{
    std::ofstream file(this->fileName, std::ios::binary);

    if (file) {
        for (const Entry& entry: entries) {
            int nameSize = entry.name.size();
            file.write(reinterpret_cast<const char*>(&nameSize), sizeof(nameSize));
            file.write(entry.name.c_str(), nameSize);
            file.write(reinterpret_cast<const char*>(&entry.time), sizeof(entry.time));
            file.write(reinterpret_cast<const char*>(&entry.isApplication), sizeof(entry.isApplication));  
        }
        file.close();
    }
}

bool Entries::exists(std::string entryName)
{
    std::ifstream file(this->fileName, std::ios::binary);
    if (file)
    {
        while(true)
        {
            int nameSize;
            long time;
            int isApplication;
            if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))) break;
            std::string name(nameSize, '\0');
            file.read(&name[0], nameSize);
            if (!file.read(reinterpret_cast<char*>(&time), sizeof(time))) break;
            if (!file.read(reinterpret_cast<char*>(&isApplication), sizeof(isApplication))) break;

            if (name == entryName) {
                file.close();
                return true;
            }
        }
        file.close();
    }
    return false;
}

bool Entries::addifnotexists(Entry& entry)
{

    if (this->exists(entry.name)) {
        bcolors().send("%s[Entry] %sSkipped %s\"%s\"", cvlBlue, cvlOrange, cvlRed,entry.name.c_str());
        return false;
    }
    
    std::ofstream file(this->fileName, std::ios::binary | std::ios::app);

    if (!file)
    {
        std::cerr << "Failed to open file " << fileName << "\n";
        return false;
    }

    bcolors().send("%s[SUCCESS] Data:", cGREEN);
    bcolors().send("%s[time] %i", cvlOrange, entry.time);
    bcolors().send("%s[isApplication] %i", cvlOrange, entry.isApplication);
    bcolors().send("%s[pid] %i", cvlOrange, entry.pid);
    bcolors().send("%s[name] %s", cvlOrange, entry.name.c_str());

    int nameSize = entry.name.size();
    file.write(reinterpret_cast<const char*>(&nameSize), sizeof(nameSize));
    file.write(entry.name.c_str(), nameSize);
    file.write(reinterpret_cast<const char*>(&entry.time), sizeof(entry.time));
    file.write(reinterpret_cast<const char*>(&entry.isApplication), sizeof(entry.isApplication));
    file.write(reinterpret_cast<const char*>(&entry.pid), sizeof(entry.pid));
    file.close();
    bcolors().send("%s[Entry] %sAdded %s\"%s\"", cvlBlue, cvlOrange, cvlRed,entry.name.c_str());
    return true;
}


template<typename T>
bool isOkRead(std::ifstream& file, T& data, const char* debug = "None")
{
    if (!file.read(reinterpret_cast<char*>(&data), sizeof(data)))
    {
        bcolors().send("%s[BreakError] %sData Read Failed %s", cvlBlue, cvlOrange, debug);
        return false;
    }
    return true;
}

TypeOneResponse Entries::getEntry(std::string entryName){
    std::ifstream file(this->fileName, std::ios::binary);
    TypeOneResponse response;
    response.failed = false;
    if (file) {
        while (true)
        {
            int nameSize;
            long time;
            int isApplication;
            int pid;

            if (!isOkRead(file, nameSize)) break;
            std::string name(nameSize, '\0');
            if (!file.read(&name[0], nameSize))
                break;

            if (!isOkRead(file, time)) break;
            if (!isOkRead(file, isApplication)) break;
            if (!isOkRead(file, pid)) break;
            
            if (name == entryName)
            {
                response.nameSize = nameSize;
                response.time = time;
                response.isApplication = isApplication;
                response.name = name;                
                break;
            }
        }
        file.close();
    } else {
        this->declareError(response, "ftof");
    }
    return response;
}

TypeOneResponse Entries::read(std::ifstream& file) {
    TypeOneResponse typeResponse;
    int nameSize;
    if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))){
        typeResponse.failed = true;
        return typeResponse;
    }
    std::string name(nameSize, '\0');
    file.read(&name[0], nameSize);
    typeResponse.name = name;
    file.read(reinterpret_cast<char*>(&typeResponse.time), sizeof(typeResponse.time));
    file.read(reinterpret_cast<char*>(&typeResponse.isApplication), sizeof(typeResponse.isApplication));
    return typeResponse;
}

void Entries::updatePID(Entry& entry, unsigned long pid) {
    std::fstream file(this->fileName, std::ios::binary);
    if (file)
    {
        Entry foundEntry;
        while (true)
        {
            int nameSize;
            if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))) break;
            std::string name(nameSize, '\0');
            file.read(&name[0], nameSize);

            unsigned long currentPid;
            file.read(reinterpret_cast<char*>(&currentPid), sizeof(currentPid));

            if (name == entry.name)
            {
                entry.pid = pid;
                file.seekp(-static_cast<int>(sizeof(currentPid)), std::ios::cur);
                file.write(reinterpret_cast<const char*>(&entry.pid), sizeof(entry.pid));
                break;                
            }
        }
        file.close();
    }
}

void Entries::declareError(TypeOneResponse& response, std::string errmsg)
{
    response.failed = true;
    response.errmsg = errmsg;
}

#endif
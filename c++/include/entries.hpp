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
#include <codecvt>
#include "helpers.hpp"

struct Entry
{
    std::string name;
    int time;
    int isFavorite;
    int pid;
};

class TypeOneResponse {
    public:
        int nameSize;
        int time;
        int isFavorite;
        int pid;
        std::string name;
        bool failed = false;
        std::string errmsg;
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
        void clockUpdate(const std::string entryName, int Pid);
        TypeOneResponse find(std::string entryName);
        TypeOneResponse read(std::ifstream& file);
        void setIsFavorite(std::string entryName, int isFavorite);
        std::vector<Entry> readEntries();
        

};


std::vector<Entry> Entries::readEntries() {
    std::ifstream file(this->fileName, std::ios::binary);
    std::vector<Entry> entries;
    if (file)
    {        
        while (true)
        {
            int nameSize;
            int time;
            int isFavorite;
            int pid;

            if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))) {
                break;
            };

            std::string name(nameSize, '\0');
            file.read(&name[0], nameSize);
            file.read(reinterpret_cast<char*>(&time), sizeof(time));
            file.read(reinterpret_cast<char*>(&isFavorite), sizeof(isFavorite));
            file.read(reinterpret_cast<char*>(&pid), sizeof(pid));

            Entry entry{std::move(name), time, isFavorite, pid};
            entries.push_back(entry);
        }
        file.close();
    }
    return entries;
    
}

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
            int isFavorite;
            file.read(reinterpret_cast<char*>(&isFavorite), sizeof(isFavorite));
            int pid;
            file.read(reinterpret_cast<char*>(&pid), sizeof(pid));
            time += amount;
            Entry entry{std::move(name), time, isFavorite};
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
            file.write(reinterpret_cast<const char*>(&entry.isFavorite), sizeof(entry.isFavorite));  
            file.write(reinterpret_cast<const char*>(&entry.pid), sizeof(entry.pid));  
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
            int time;
            int isFavorite;
            int pid;
            if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))) break;
            std::string name(nameSize, '\0');
            file.read(&name[0], nameSize);
            if (!file.read(reinterpret_cast<char*>(&time), sizeof(time))) break;
            if (!file.read(reinterpret_cast<char*>(&isFavorite), sizeof(isFavorite))) break;
            if (!file.read(reinterpret_cast<char*>(&pid), sizeof(pid))) break;

            if (name == entryName) {
                file.close();
                return true;
            }
        }
        file.close();
    }
    return false;
}

void Entries::clockUpdate(const std::string entryName, int NewPid){
    std::fstream file(this->fileName, std::ios::binary | std::ios::in | std::ios::out);

    if (file) {
        while (true) {
            int nameSize;
            int time;
            int isFavorite;
            int pid;
            if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))) break;
            std::string name(nameSize, '\0');
            file.read(&name[0], nameSize);
            std::streampos timePosition = file.tellg();
            if (!file.read(reinterpret_cast<char*>(&time), sizeof(time))) break;
            if (!file.read(reinterpret_cast<char*>(&isFavorite), sizeof(isFavorite))) break;
            std::streampos pidPosition = file.tellg();
            if (!file.read(reinterpret_cast<char*>(&pid), sizeof(pid))) break;
            if (name == entryName) {
                file.seekp(timePosition);
                int NewTime = time + 5;
                file.write(reinterpret_cast<const char*>(&NewTime), sizeof(NewTime));
                file.seekp(pidPosition);
                file.write(reinterpret_cast<const char*>(&NewPid), sizeof(NewPid));
                break;
            }
        }
    }

    file.close();
}

bool Entries::addifnotexists(Entry& entry){
    if (this->exists(entry.name)) {
        return false;
    }
    
    std::ofstream file(this->fileName, std::ios::binary | std::ios::app);

    if (!file)
    {
        std::cerr << "Failed to open file " << fileName << "\n";
        return false;
    }
    int nameSize = entry.name.size();
    file.write(reinterpret_cast<const char*>(&nameSize), sizeof(nameSize));
    file.write(entry.name.c_str(), nameSize);
    file.write(reinterpret_cast<const char*>(&entry.time), sizeof(entry.time));
    file.write(reinterpret_cast<const char*>(&entry.isFavorite), sizeof(entry.isFavorite));
    file.write(reinterpret_cast<const char*>(&entry.pid), sizeof(entry.pid));
    file.close();
    printf("[Entry] Added \"%s\"\n", entry.name.c_str());
    return true;
}

TypeOneResponse Entries::find(std::string entryName){
    std::ifstream file(this->fileName, std::ios::binary);
    TypeOneResponse typeResponse;
    if (file)
    {
        Entry foundEntry;
        while (true)
        {
            int nameSize;
            if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))) {
                typeResponse.failed = true;
                typeResponse.errmsg = "EndOfFile, Not Found...";
                break;
            };
            std::string name(nameSize, '\0');
            file.read(&name[0], nameSize);
            int time;
            file.read(reinterpret_cast<char*>(&time), sizeof(time));
            int isFavorite;
            file.read(reinterpret_cast<char*>(&isFavorite), sizeof(isFavorite));
            int pid;
            file.read(reinterpret_cast<char*>(&pid), sizeof(pid));
            
            typeResponse.time = time;
            typeResponse.name = name;
            typeResponse.pid = pid;
            typeResponse.isFavorite = isFavorite;
            if (name == entryName)
            {
                break;
            }            
        }
        file.close();
        return typeResponse;
    }
    return typeResponse;

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
    file.read(reinterpret_cast<char*>(&typeResponse.isFavorite), sizeof(typeResponse.isFavorite));
    file.read(reinterpret_cast<char*>(&typeResponse.pid), sizeof(typeResponse.pid));
    return typeResponse;
}

void Entries::setIsFavorite(std::string entryName, int _isFavorite) {
    std::fstream file(this->fileName, std::ios::binary | std::ios::in | std::ios::out);
    if (file) {
        while (true) {
            int nameSize;
            int time;
            int isFavorite;
            int pid;
            if (!file.read(reinterpret_cast<char*>(&nameSize), sizeof(nameSize))) break;
            std::string name(nameSize, '\0');
            file.read(&name[0], nameSize);

            if (!file.read(reinterpret_cast<char*>(&time), sizeof(time))) break;
            std::streampos isFavoritePos = file.tellg();
            if (!file.read(reinterpret_cast<char*>(&isFavorite), sizeof(isFavorite))) break;
            if (!file.read(reinterpret_cast<char*>(&pid), sizeof(pid))) break;
            
            if (name == entryName) {
                file.seekp(isFavoritePos);
                file.write(reinterpret_cast<const char*>(&_isFavorite), sizeof(_isFavorite));
                std::cout << "Set: " << isFavorite << " ||| " << _isFavorite << std::endl;
                break;
            }
        }
    }
    file.close();
}
#endif
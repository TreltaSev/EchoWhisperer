#include <iostream>
#include <string>
#include <vector>
#include <windows.h>
#include <locale>
#include <codecvt>
#include <cstring>
#include "helpers.hpp"
#include "entries.hpp"
#include "bcolors_a.hpp"


void logic() {
    Entries entries("bin/entries.bin");
    Entry newEntry{"Poggers", 1, 2, 3};
    entries.Add(newEntry);
    int index = entries.Get("Poggers");
    std::cout << "index: " << index << std::endl;
    if (index == -1)
    {
        std::cout << "numerr" << std::endl;
        return;
    }
    Entry foundEntry = entries.Read(index);
    bcolors().send("Name: %s\nTime: %i\nisApplication: %i\nPID: %i\n", foundEntry.name, foundEntry.time, foundEntry.isApplication, foundEntry.pid);
}

void otherlogic() {
    Entries entries("bin/entries.bin");
    std::vector<Entry> _read = entries.ReadAll();
    for (const Entry& entry: _read) {
        bcolors().send("Name: %s\nTime: %i\nisApplication: %i\nPID: %i\n", entry.name, entry.time, entry.isApplication, entry.pid);
    }
}

int main() {
    logic();
    Entries entries("bin/entries.bin");
    std::vector<Entry> _read = entries.ReadAll();
    entries.MassUpdate(_read);
    otherlogic();
    return 0;    
}
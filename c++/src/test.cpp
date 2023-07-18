#include <iostream>
#include <fstream>
#include <string>
#include "entries.hpp"

int main() {
    Entries entries("bin/entries.bin");
    Entry newEntry{"Process", 1, 0, 3};
    entries.addifnotexists(newEntry);    
    TypeOneResponse response = entries.find("Process");
    if (response.failed) {
        std::cerr << "Failed..." << std::endl;
    } else {
        std::cout << "Success.." << response.name << ":" << response.pid << ":" << response.time << ":" << std::endl;
    }
    std::cout << "passed5" << std::endl;
    

    return 0;
}

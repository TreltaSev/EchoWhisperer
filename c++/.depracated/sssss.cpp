
#include <iostream>
#include <fstream>
#include <cstring>

struct Entry {
    const char* name;
    int time;
    int isApplication;
    int pid;
};

class EntryManager {
public:
    void Add(const Entry& entry) {
        std::ofstream file("entries.bin", std::ios::binary | std::ios::app);
        if (!file) {
            std::cerr << "Error opening file." << std::endl;
            return;
        }

        // Check if entry already exists
        Entry existingEntry;
        if (FindEntry(entry.name, existingEntry)) {
            std::cout << "Entry already exists." << std::endl;
            return;
        }

        // Write the entry to the file
        file.write(reinterpret_cast<const char*>(&entry), sizeof(Entry));
        std::cout << "Entry added successfully." << std::endl;

        file.close();
    }

    bool Get(const char* name, Entry& entry) {
        std::ifstream file("entries.bin", std::ios::binary);
        if (!file) {
            std::cerr << "Error opening file." << std::endl;
            return false;
        }

        // Find the entry with the given name
        while (file.read(reinterpret_cast<char*>(&entry), sizeof(Entry))) {
            if (strcmp(entry.name, name) == 0) {
                file.close();
                return true;
            }
        }

        file.close();
        std::cout << "Entry not found." << std::endl;
        return false;
    }

private:
    bool FindEntry(const char* name, Entry& entry) {
        std::ifstream file("entries.bin", std::ios::binary);
        if (!file) {
            std::cerr << "Error opening file." << std::endl;
            return false;
        }

        // Find the entry with the given name
        while (file.read(reinterpret_cast<char*>(&entry), sizeof(Entry))) {
            if (strcmp(entry.name, name) == 0) {
                file.close();
                return true;
            }
        }

        file.close();
        return false;
    }
};


int main() {
    EntryManager manager;

    // Example usage
    Entry entry1 = { "John", 123456, 1, 987 };
    manager.Add(entry1);

    Entry entry2 = { "Alice", 789012, 0, 654 };
    manager.Add(entry2);

    Entry retrievedEntry;
    if (manager.Get("Alice", retrievedEntry)) {
        std::cout << "Entry found: " << retrievedEntry.name << std::endl;
    }

    return 0;
}



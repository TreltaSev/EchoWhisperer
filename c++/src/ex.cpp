class StructureFileManager {
private:
    std::string filename;

public:
    StructureFileManager(const std::string& filename) : filename(filename) {}

    void writeStructureToFile(const MyStruct& data) {
        std::ofstream file(filename, std::ios::binary | std::ios::app);
        if (file.is_open()) {
            file.write(reinterpret_cast<const char*>(&data), sizeof(MyStruct));
            file.close();
            std::cout << "Structure written to file successfully." << std::endl;
        } else {
            std::cout << "Failed to open file for writing." << std::endl;
        }
    }

    std::vector<MyStruct> readAllStructuresFromFile() {
        std::vector<MyStruct> structures;
        std::ifstream file(filename, std::ios::binary);
        if (file.is_open()) {
            MyStruct data;
            while (file.read(reinterpret_cast<char*>(&data), sizeof(MyStruct))) {
                structures.push_back(data);
            }
            file.close();
        }
        return structures;
    }

    void updateStructureByName(const std::string& name, int newAge) {
        std::vector<MyStruct> structures = readAllStructuresFromFile();
        for (auto& data : structures) {
            if (data.name == name) {
                data.age = newAge;
                break; // Assuming only one structure has the specified name
            }
        }
        updateAllStructures(structures);
    }

    void updateAllStructures(const std::vector<MyStruct>& structures) {
        std::ofstream file(filename, std::ios::binary);
        if (file.is_open()) {
            for (const auto& data : structures) {
                file.write(reinterpret_cast<const char*>(&data), sizeof(MyStruct));
            }
            file.close();
            std::cout << "Structures updated and saved to file successfully." << std::endl;
        } else {
            std::cout << "Failed to open file for writing." << std::endl;
        }
    }
};

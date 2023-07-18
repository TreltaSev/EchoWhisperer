
class Entries {
    public:
        const char* fileName;
        Entries(const char* _fileName){
            this->fileName = _fileName;
            std::ofstream file(this -> fileName, std::ios::binary | std::ios::app);
            file.close();
        }      
        bool Exists(const char* entryName);  
        void Add(const Entry& entry);
        int Get(const char* entryName);
        Entry Read(int index);
        void MassUpdate(std::vector<Entry>& entries);
        std::vector<Entry> ReadAll();
        void ClockUpdate(const char* entryName, int pid);
};

bool Entries::Exists(const char* entryName) {

    std::ifstream file(this->fileName, std::ios::binary);
    if (file)
    {
        while (true)
        {
            std::cout << "Tick" << std::endl;
            Entry tempEntry;
            std::cout << "Saved" << std::endl;
            if (!file.read(reinterpret_cast<char*>(&tempEntry), sizeof(Entry)))
            {
                std::cerr << "FAILED 1" << std::endl;
                break;
            }            
            std::cout << tempEntry.name << "\\\\\\\\\\\\\\\\\\" << std::endl;

            std::cout << "Re" << std::endl;
            
        }
        std::cout << "Broken" << std::endl;
        file.close();
        std::cout << "Closed" << std::endl;
    }
    std::cout << "Return False" << std::endl;
    return false;

    // std::cout << "1" << std::endl;
    // std::ifstream file(this->fileName, std::ios::binary);
    // std::cout << "1" << std::endl;
    // if (!file.is_open()){bcolors().send("Failed to open file");;}
    // std::cout << "1" << std::endl;
    // Entry tempEntry;
    // std::cout << "1" << std::endl;
    // while (file.read(reinterpret_cast<char*>(&tempEntry), sizeof(Entry))) {
    //     std::cout << "1" << std::endl;
    //     std::cout << " " << tempEntry.name << "||||" << std::endl;
    //     std::cout << "2" << std::endl;
    //     if (std::strcmp(tempEntry.name, entryName) == 0) {
    //         std::cout << "1" << std::endl;
    //         file.close();
    //         std::cout << "1" << std::endl;
    //         return true;
    //         std::cout << "1" << std::endl;
    //     }
    //     std::cout << "1" << std::endl;
    // }
    // std::cout << "1" << std::endl;
    // file.close();
    // std::cout << "1" << std::endl;
    // return false;

}

void Entries::Add(const Entry& entry) {

    std::cout << ":::" << std::endl;
    if (this->Exists(entry.name)) {
        std::cout << "Alreayd Exs" << std::endl;
        return;
    } else {
        std::cout << "Doesnt exists" << std::endl;
    }
    std::cout << ":::" << std::endl;


    std::cout << "::::" << std::endl;
    std::ofstream file(this->fileName, std::ios::binary | std::ios::app);
    std::cout << "::::" << std::endl;
    if (!file.is_open()){bcolors().send("Failed to open file");return;}
    std::cout << "::::" << std::endl;
    file.write(reinterpret_cast<const char*>(&entry), sizeof(Entry));
    std::cout << "::::" << std::endl;
    file.close();
    std::cout << "::::" << std::endl;
}

int Entries::Get(const char* entryName){
    std::ifstream file(this->fileName, std::ios::binary);
    if (!file.is_open()){bcolors().send("Failed to open file");return -1;}
    Entry tempData;
    int index = 0;
    while (file.read(reinterpret_cast<char*>(&tempData), sizeof(tempData))){
        if (std::strcmp(tempData.name, entryName) == 0){
            file.close();
            return index;
        }
        index ++;
    }
    file.close();
    return index;
}





Entry Entries::Read(int index) {
    Entry returnData;
    std::ifstream file(this->fileName, std::ios::binary);
    if (!file.is_open()){bcolors().send("Failed to open file");return returnData;}
    file.seekg(index * sizeof(Entry), std::ios::beg);
    file.read(reinterpret_cast<char*>(&returnData), sizeof(Entry));
    file.close();
    return returnData;
}

void Entries::MassUpdate(std::vector<Entry>& entries) {
    std::ofstream file(this->fileName, std::ios::binary);
    if (!file.is_open()){bcolors().send("Failed to open file");return;}
    for (const auto& entry : entries){
        file.write(reinterpret_cast<const char*>(&entry), sizeof(Entry));
        }
    file.close();
}

void Entries::ClockUpdate(const char* entryName, int pid)
{
    std::vector<Entry> entries = this->ReadAll();
    bool found = false;
    for (auto& entry: entries) {
        if (std::strcmp(entry.name, entryName) == 0) {
            entry.pid = pid;
            entry.time += 5;
            found = true;
            break;
        }
    }

    if (found)
    {
        bcolors().send("Found");
    } else {
        bcolors().send("Not found");
    }

    this->MassUpdate(entries);
}
std::vector<Entry> Entries::ReadAll(){    
    std::vector<Entry> entries;
    std::ifstream file(this->fileName, std::ios::binary);
    if (!file.is_open()){bcolors().send("Failed to open file");return entries;}  
    Entry tempEntry;  
    tempEntry.pid = 2;
    while (file.read(reinterpret_cast<char*>(&tempEntry), sizeof(Entry))){
        entries.push_back(tempEntry);
    }
    file.close();
    return entries;
}
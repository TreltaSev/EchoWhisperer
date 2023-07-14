#ifndef BCOLORS_HPP
#define BCOLORS_HPP


#include <iostream>
#include <regex>

class bcolors {
    public:
        void send(const char* format, ...) {
            va_list args;
            va_start(args, format);
            std::string message = this->formatString(format, args);
            va_end(args);          
            this->printColoredMessage(message);  
        }
    
    private:
        std::string formatString(const char* format, va_list args)
        {
            constexpr size_t bufferSize = 1024;
            char buffer[bufferSize];
            vsnprintf(buffer, bufferSize, format, args);
            return buffer;
        }

        void printColoredMessage(const std::string& message)
        {
            std::string modified_str = message + "<0;38;48}";
            std::regex regex("<([^}]*)\\}");
            std::smatch match;

            while (std::regex_search(modified_str, match, regex)) {
                std::string match_str = match[1].str();
                modified_str = std::regex_replace(modified_str, std::regex("<" + match_str + "\\}"), "\u001B[" + match_str + "m");
            }

            std::cout << modified_str << "\u001B[0;38;48m\n";
        }
};

#endif
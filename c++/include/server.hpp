/**
 * cpplogger.include.server.hpp
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Server.hpp is a socket server hosted on port 2411
*/

#ifndef SERVER_HPP
#define SERVER_HPP

#include "boost/beast/core.hpp"
#include "boost/beast/websocket.hpp"
#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include "json.hpp"
#include "entries.hpp"
#include "helpers.hpp"

using tcp = boost::asio::ip::tcp;
bool incheck(std::vector<ProcessInfo> processes, int pid) {
    for (const auto& process: processes) {
        if (static_cast<int>(process.id) == pid) {
            return true;
        }
    }
    return false;
}

std::string getEntries() {
    std::vector<ProcessInfo> processes;
    EnumWindows(reinterpret_cast<WNDENUMPROC>(EnumProcessProc), reinterpret_cast<LPARAM>(&processes));
    nlohmann::json data;
    nlohmann::json ContainerEntries = nlohmann::json::array();
    Entries hEntries("bin/entries.bin");
    std::vector<Entry> readEntries = hEntries.readEntries();
    for (const Entry& entry : readEntries) {
        nlohmann::json j_entry;
        j_entry["name"] = entry.name;
        j_entry["time"] = entry.time;
        j_entry["isFavorite"] = entry.isFavorite;
        j_entry["pid"] = entry.pid;
        j_entry["isOpen"] = incheck(processes, entry.pid);
        ContainerEntries.push_back(j_entry);
    }
    data["entries"] = ContainerEntries;
    data["type"] = "get?";
    std::string jsonString = data.dump();
    return jsonString;
}

std::string updateIsFavorite(std::string entryName, int value) {
    Entries hEntries("bin/entries.bin");
    hEntries.setIsFavorite(entryName, value);
    nlohmann::json response;
    response["type"] = "set?";
    response["extra"] = "(" + entryName + ") Was Set Successfully to: " + (value==1 ? "1" : "0");
    std::string jsonString = response.dump();
    return jsonString;
}

std::string deleteSpecificEntry(std::string entryName) {
    Entries hEntries("bin/entries.bin");
    bool deleteAttempt = hEntries.deleteEntry(entryName);
    nlohmann::json response;
    response["type"] = "delete?";
    response["extra"] = "(" + entryName + ") Succeeded in deleting?: " + (deleteAttempt == true ? "True" : "False");
    return response.dump();
}

void serverLoop() {
    auto const address = boost::asio::ip::make_address("127.0.0.1");
    auto const port = static_cast<unsigned short>(std::atoi("2411"));
    boost::asio::io_context ioc{1};
    tcp::acceptor acceptor{ioc, {address, port}};
    while(true)
    {
        tcp::socket socket{ioc};
        acceptor.accept(socket);
        std::thread{
            [q = std::move(socket)]() mutable {
                boost::beast::websocket::stream<tcp::socket> WebSocketStream {std::move(q)};
                WebSocketStream.accept();
                while(true)
                {
                    try
                    {
                        // Read Message
                        boost::beast::flat_buffer buffer;
                        WebSocketStream.read(buffer);
                        auto out = boost::beast::buffers_to_string(buffer.cdata());
                        std::string response;
                        nlohmann::json request = nlohmann::json::parse(out);
                        std::string request_type = request["type"];
                        if (request_type == "get?") { response = getEntries();} 
                        else if (request_type == "set?") {response = updateIsFavorite(request["entry"], request["value"]);} 
                        else if (request_type == "delete?") {response = deleteSpecificEntry(request["entry"]);}
                        WebSocketStream.write(boost::asio::buffer(response));
                    }
                    catch(boost::beast::system_error const& se)
                    {
                        if (se.code() != boost::beast::websocket::error::closed)
                        {                            
                            break;
                        }
                    }
                }
            }
        }.detach();
    }
}
#endif
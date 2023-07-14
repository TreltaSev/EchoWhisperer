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


using tcp = boost::asio::ip::tcp;

void serverLoop() {
    // Port and Address
    auto const address = boost::asio::ip::make_address("127.0.0.1");
    auto const port = static_cast<unsigned short>(std::atoi("2411"));

    // Setup thread
    boost::asio::io_context ioc{1};

    // Create acceptor
    tcp::acceptor acceptor{ioc, {address, port}};

    
    // Looper
    while(true)
    {
        // Wait for connection
        tcp::socket socket{ioc};
        acceptor.accept(socket);
        std::cout << "Socket Accepted" << std::endl;
        // Create Thread
        std::thread{
            [q = std::move(socket)]() mutable {
                // Create Stream
                boost::beast::websocket::stream<tcp::socket> WebSocketStream {std::move(q)};
                // Accept Websocket Stream
                WebSocketStream.accept();
                while(true)
                {
                    try
                    {
                        // Read Message
                        boost::beast::flat_buffer buffer;
                        WebSocketStream.read(buffer);
                        auto out = boost::beast::buffers_to_string(buffer.cdata());                        
                        std::cout<<out<<std::endl;
                        // Response 
                        std::string response = "Hello:)";                        
                        WebSocketStream.write(boost::asio::buffer(response));
                    }
                    catch(boost::beast::system_error const& se)
                    {
                        if (se.code() != boost::beast::websocket::error::closed)
                        {
                            std::cout << se.code().message() << std::endl;
                            break;
                        }
                    }
                                       

                }

            }
        }.detach();
    }

}

#endif
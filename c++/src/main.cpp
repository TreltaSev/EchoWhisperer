#include <iostream>
#include <string>
#include <thread>
#include "server.hpp"
#include "listener.hpp"

int main() {
    std::thread t1(serverLoop);
    std::thread t2(listenerLoop);

    t1.join();
    t2.join();

    return 0;
}
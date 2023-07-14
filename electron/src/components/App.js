import React, { useEffect, useRef } from "react";
import styling from "@assets/styling.module.css";
import NavigationBar from "@components/NavigationBar";

const net = require("net");

const App = () => {
    useEffect(() => {
        console.log(">>>")
        const client = new net.Socket();

        client.connect(2241, 'localhost', function() {
          console.log('Connected to the server');
        
          // Send data to the server
          client.write('Hello, server!');
        
          // Close the connection after sending the data
          client.end();
        });

        client.on('data', function(data) {
          console.log('Received data from the server:', data.toString());
        });

        client.on('close', function() {
          console.log('Connection closed');
        });
    }, [])
    return (
        <div className={`${styling.flex_col} ${styling.align_items_center} ${styling.dark_main} ${styling.flex_fill_all}`}>
            
            { /* Navigation Menu holds all the buttons */ }
            <NavigationBar/>


        </div>
    );
}

export default App;
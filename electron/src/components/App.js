import React, { useEffect, useRef, useState } from "react";
import styling from "@assets/styling.module.css";
import AppList from "./AppList";
import SortingSettings from "./SortingSettings";
import NavigationBar from "@components/NavigationBar";
import AppInfo from "./AppInfo";
import custom_styling from "@assets/custom.module.css"
import { fileVerify, Portal, _pathEntries, getEntries } from "@components/global";
const fs = require('fs');

const App = () => {
  const [socket, setSocket] = useState(null);  
  const [isConnected, setIsConnected] = useState(false);
  const [entries, setEntries] = useState([]);
  

  useEffect(() => {     
    fileVerify()   
    let effectConnected = isConnected;
    const createWebSocket = () => {      
      const update = (val) => {
        setIsConnected(val);
        effectConnected = val;
      }

      const newSocket = new WebSocket('ws://127.0.0.1:2411');

      let interval = 0;

      newSocket.onopen = () => {
        console.log('WebSocket connected');
        newSocket.send(JSON.stringify({type: "get?"}));
        setSocket(newSocket);
        update(true);

        interval = setInterval(() => {
          if (newSocket !== null) {
            newSocket.send(JSON.stringify({type: "get?"}));
          }
        }, 1000)

      };

      newSocket.onclose = () => {
        console.log('WebSocket connection closed');
        setSocket(null);
        update(false);
        console.log('Attempting to reconnect...');
        setTimeout(createWebSocket, 3000);
        clearInterval(interval);
      };

      newSocket.onerror = () => {
        console.error('WebSocket connection error');
        update(false);
        clearInterval(interval);
      };

      newSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data["type"] == "get?") {setEntries(data["entries"]);}
          else if (data["type"] == "set?") {newSocket.send(JSON.stringify({type: "get?"}));} 
          else if (data["type"] == "delete?") {newSocket.send(JSON.stringify({type: "get?"}));}
        } catch (e) {
          console.log(event.data)
          console.warn(e)
        }
      };
    };

    createWebSocket();
    
    let offlineReaderInterval = setInterval(() => {
      // Check if isConnected is set to true
      console.log(`isConnected: ${effectConnected}`)
      if (effectConnected === true) {
        return;
      }

      // Make sure entries.bin is discoverable
      fileVerify();

      // Read the data from the bin file
      const _entries = getEntries(_pathEntries);

      // Replace entries with parsed data from bin file
      setEntries(_entries);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(offlineReaderInterval);
      if (socket) {
        socket.close();
      }
    };
  }, []);
    
  return (
      <div style={{position: "relative"}} className={`${styling.flex_col} ${styling.align_items_center} ${styling.dark_main} ${styling.flex_fill_all}`}>
        
        { /* Navigation Menu holds all the buttons */ }
        <NavigationBar/>
        <div className={`${styling.flex_row} ${styling.align_items_start} ${styling.justify_content_start} ${styling.align_self_stretch} ${custom_styling.App_fill_cstm}`}>
          <AppList entries={entries} socket={socket} isConnected={isConnected}/>
          <SortingSettings/>
        </div>
        <AppInfo isConnected={isConnected}/>
      </div>
  );
}

export default App;
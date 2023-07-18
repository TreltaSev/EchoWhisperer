import React, { useEffect, useRef, useState } from "react";
import styling from "@assets/styling.module.css";
import AppList from "./AppList";
import SortingSettings from "./SortingSettings";
import NavigationBar from "@components/NavigationBar";
import AppInfo from "./AppInfo";




const App = () => {
  const [socket, setSocket] = useState(null);  
  const [isConnected, setIsConnected] = useState(false);
  const [entries, setEntries] = useState([]);
  const returnMainData = () => {
    return MainData;
  }

  useEffect(() => {
    const createWebSocket = () => {
      
      const newSocket = new WebSocket('ws://127.0.0.1:2411');

      newSocket.onopen = () => {
        console.log('WebSocket connected');
        newSocket.send("get?");
        setSocket(newSocket);
        setIsConnected(true);
      };

      newSocket.onclose = () => {
        console.log('WebSocket connection closed');
        setSocket(null);
        setIsConnected(false);
        console.log('Attempting to reconnect...');
        setTimeout(createWebSocket, 3000); // Retry connection after 3 seconds
      };

      newSocket.onerror = () => {
        console.error('WebSocket connection error');
        // Handle WebSocket connection error
      };

      newSocket.onmessage = (event) => {
        // Handle received messages
        try {
          const data = JSON.parse(event.data);
          console.log(data)

          if (data["type"] == "get?") {
            setEntries(data["entries"]);
            console.log("Set Main Data");
          }

        } catch (e) {
          console.log(event.data)
          console.warn(e)
        }
      };
    };

    createWebSocket();

    return () => {
      // Cleanup: close WebSocket connection when the component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, []);

    
    return (
        <div className={`${styling.flex_col} ${styling.align_items_center} ${styling.dark_main} ${styling.flex_fill_all}`}>
          
          { /* Navigation Menu holds all the buttons */ }
          <NavigationBar/>
          <div style={{maxHeight: 545, minHeight: 545}} className={`${styling.flex_row} ${styling.align_items_start} ${styling.justify_content_start} ${styling.align_self_stretch} ${styling.justify_self_stretch}`}>
            <AppList entries={entries}/>
            <SortingSettings/>
          </div>
          <AppInfo/>
        </div>
    );
}

export default App;
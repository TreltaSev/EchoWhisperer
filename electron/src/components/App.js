import React, { useEffect, useRef } from "react";
import styling from "@assets/styling.module.css";
import NavigationBar from "@components/NavigationBar";

const App = () => {
    return (
        <div className={`${styling.flex_col} ${styling.align_items_center} ${styling.dark_main} ${styling.flex_fill_all}`}>
            
            { /* Navigation Menu holds all the buttons */ }
            <NavigationBar/>


        </div>
    );
}

export default App;
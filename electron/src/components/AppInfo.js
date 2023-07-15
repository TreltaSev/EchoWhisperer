/**
 * electron.components.AppInfo.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import React from "react";
import styling from "@assets/styling.module.css"

/* Make the app info part of the application. */

{/* Basic Text Group Component */}
const BTextGroup = (props) => {
    return (
        <div style={{gap: 5}} className={`${styling.flex_row}`}>
            {props.children}
        </div>
    )
}



{/* Current Time Method */}
const getCurrentTime = (props) => {
    const _date = new Date();
    const _hours = _date.getHours();
    const _minutes = _date.getMinutes();
    const ampm = _hours >= 12 ? "pm" : "am";
    _hours = _hours % 12;
    _hours = _hours ? _hours : 12;
    _hours = String(_hours).padStart(2, "0");
    _minutes = String (_minutes).padStart(2, "0");
    return `${_hours}:${_minutes} ${ampm}`;
}


{/* App Info Component */}
const AppInfo = () => {
    return (
        <></>
    )
}

export default AppInfo
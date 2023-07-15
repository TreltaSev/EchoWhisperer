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

{/* Current Time Component */}

{/* App Info Component */}
const AppInfo = () => {
    return (
        <></>
    )
}

export default AppInfo
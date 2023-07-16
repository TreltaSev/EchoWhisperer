/**
 * electron.components.AppInfo.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import React from "react";
import styling from "@assets/styling.module.css"

/* Make the app info part of the application. */

{/* Basic Text Component */}
const Text = (props) => {
    const _color = props.color !== undefined ? props.color : "#e2efff";
    const _opacity = props.opacity !== undefined ? props.opacity : "1";
    const _small = props.small !== undefined ? props.small : false;
    return (
        <span style={{opacity: _opacity, color: _color}} className={`${_small ? styling.text_s : styling.text_m}`}>
            {props.children}
        </span>
    )
}

{/* Basic Text Group Component */}
const BTextGroup = (props) => {
    return (
        <div style={{gap: 2, whiteSpace: "nowrap"}} className={`${styling.flex_row}`}>
            {props.children}
        </div>
    )
}

{/* Current Time Method */}
const getCurrentTime = (props) => {
    const _date = new Date();
    let _hours = _date.getHours();
    let _minutes = _date.getMinutes();
    const ampm = _hours >= 12 ? "pm" : "am";
    _hours = _hours % 12;
    _hours = _hours ? _hours : 12;
    _minutes = String (_minutes).padStart(2, "0");
    return `${_hours}:${_minutes} ${ampm}`;
}

{/* AppInfo bwatch class */}
const _bwatch = class {
    constructor(bool) {
        bool = bool !== undefined ? bool : false;
        this.text = bool ? "True" : "False";
        this.color = bool ? "#8ffe93" : "#fe5d5d";
    }
}

{/* App Info Component */}
const AppInfo = (props) => {
    const _loggerActive = new _bwatch(false);
    const _loggerInstalled = new _bwatch(true);
    const _allGud = new _bwatch(true); 

    return (
        <div style={{height: 20, gap: 10, padding: 10}} className={`${styling.flex_row} ${styling.flex_fill_width} ${styling.border_box} ${styling.border_top} ${styling.dark_sub} ${styling.dark_accent} ${styling.align_items_center}`}>
            <BTextGroup>
                <Text small={true} opacity="0.5">loggerActive?</Text>
                <Text small={true} color={_loggerActive.color}>{_loggerActive.text}</Text>
            </BTextGroup>

            <BTextGroup>
                <Text small={true} opacity="0.5">loggerInstalled?</Text>
                <Text small={true} color={_loggerInstalled.color}>{_loggerInstalled.text}</Text>
            </BTextGroup>

            <BTextGroup>
                <Text small={true} opacity="0.5">allGud?</Text>
                <Text small={true} color={_allGud.color}>{_allGud.text}</Text>
            </BTextGroup>

            <div className={styling.flex_fill_width}/>
            
            {/* Current tim in hh:mm am/pm */}
            <BTextGroup>
                <Text small={true} opacity="0.5">{getCurrentTime()}</Text>
            </BTextGroup>
        </div>
    )
}

export default AppInfo
/**
 * electron.components.AppInfo.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import React, { useEffect, useRef, useState } from "react";
import styling from "@assets/styling.module.css"
import custom_styling from "@assets/custom.module.css"
import {RefreshIcon} from "@assets/icons.js"
import { undefinedCheck, _pathLogger, loggerVerify } from "@components/global";
const { spawn } = require("child_process")
/* Make the app info part of the application. */

{/* Refresh Chip */}
const RefreshChip = (props) => {
    const IconRef = useRef(null);
    const _isConnected = undefinedCheck(props.isConnected, false)

    const click = () => {
        if (!_isConnected && loggerVerify()) {
            spawn(_pathLogger, [], {detached: true, stdio: "ignore"})
        }
    }
    
    const mouseEnter = () => {
        IconRef.current.classList.add(custom_styling.AppInfo_hoverRotate_active);
    }

    const mouseLeave = () => {
        IconRef.current.classList.remove(custom_styling.AppInfo_hoverRotate_active);
    }

    return (
        <div ref={IconRef} onClick={() => click()} onMouseEnter={() => mouseEnter()} onMouseLeave={() => mouseLeave()} className={custom_styling.AppInfo_hoverRotate}>
            <RefreshIcon/>
        </div>
    )
}

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
        this.color = bool ? "#52FF59" : "#F43944";
    }
}



{/* App Info Component */}
const AppInfo = (props) => {
    const [__, ___] = useState(null);
    const _loggerActive = new _bwatch(props.isConnected);
    const [_runningTicker, _setRunningTicker] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            _setRunningTicker(_runningTicker => _runningTicker + 1);
        }, 1000);
        return () => {clearInterval(interval);}
    }, [])

    return (
        <div style={{height: 20, gap: 5, paddingLeft: 10, paddingRight:10, overflow: "hidden"}} className={`${styling.flex_row} ${styling.flex_fill_width} ${styling.border_box} ${styling.border_top} ${styling.dark_sub} ${styling.dark_accent} ${styling.align_items_center}`}>
            <BTextGroup>
                <Text small={true} color="rgba(236, 241, 255, 0.5)">loggerActive?</Text>
                <Text small={true} color={_loggerActive.color}>{_loggerActive.text}</Text>                
            </BTextGroup>
            <RefreshChip isConnected={props.isConnected}/>            

            <div className={styling.flex_fill_width}/>
            
            {/* Current tim in hh:mm am/pm */}
            <BTextGroup>
                <Text small={true} color="rgba(236, 241, 255, 0.5)">{getCurrentTime()}</Text>
            </BTextGroup>
        </div>
    )
}

export default AppInfo
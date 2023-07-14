/**
 * electron.components.NavigationBar.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import styling from "@assets/styling.module.css";
import custom_styling from "@assets/custom.module.css";
import React, { useEffect, useRef, useState } from "react";
import { MinimizeIcon, CloseIcon, LogoIcon } from "@assets/icons.js";
const { ipcRenderer } = require('electron');

const BareButton = (props) => {
    const handle = () => {
        props.event_onclick();
    }
    return (
        <div onClick={handle} style={{minHeight: 20, minWidth: 20, borderRadius: 5}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.justify_content_center} ${props.extra}`}>
            {props.children}
        </div>
    )
}


/* Close button component uses BareButton from BareButton */
const CloseButton = () => {    
    const close = () => {
        ipcRenderer.send("window:close");
    }
    return (
        <BareButton event_onclick={() => close()} extra={`${styling.dark_close}`}>
            <CloseIcon/>
        </BareButton>
    )
}

/* Minimize button component uses BareButton from BareButton */
const MinimizeButton = () => {
    const minimize = () => {
        ipcRenderer.send("window:minimize");
    }
    return (
        <BareButton event_onclick={() => minimize()} extra={`${styling.dark_minimize}`}>
            <MinimizeIcon/>
        </BareButton>
    )
}

/* Button Group containting MinimizeButton and CloseButton */
const GroupButtons = () => {
    return (
        <div style={{gap:10}} className={`${styling.flex_row} ${custom_styling.ButtonGroup}`}>
            <MinimizeButton/>
            <CloseButton/>
        </div>
    )
}

const NavigationBar = () => {
    return (
        <div style={{height:35, padding: 10, gap:10 }} className={`${styling.flex_row} ${styling.align_items_center} ${styling.dark_sub} ${styling.flex_fill_width} ${styling.dark_accent} ${styling.border_bottom} ${styling.border_box} ${styling.nav_logic}`}>
            <LogoIcon/>
            <div className={styling.flex_fill_width}/>
            <GroupButtons/>           
        </div>
    )
}

export default NavigationBar;
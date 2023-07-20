/**
 * electron.components.SortingSettings.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import React, { useRef, useState } from "react";
import styling from "@assets/styling.module.css";
import custom_styling from "@assets/custom.module.css"
import { Text, Portal, fileVerify } from "@components/global";
import { dark_white, dark_ult, dark_red, opacity } from "../assets/colors";
const fs = require("fs");

const ToggleButton = (props) => {
    const _chipRef = useRef(null);
    const _parentRef = useRef(null);
    const [_active, _setActive] = useState(false);
    const _initial = false;

    const toggle = () => {
        Portal.emit("toggleSetting", {name: props.name, value: !_active})
        _parentRef.current.animate({backgroundColor: _active ? dark_red : dark_ult}, {duration: 300, fill: "forwards", easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)"})
        _chipRef.current.animate({transform: `translate(${_active ? 4 : 30}px, -50%)`}, {duration: 300, fill: "forwards", easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)"});
        _setActive(!_active);
    }

    return (
        <div ref={_parentRef} onClick = {() => toggle()} style={{backgroundColor: _initial ? dark_ult : dark_red}} className={`${custom_styling.SortingSettings_switch_parent}`}>
            <div ref={_chipRef} style={{border: `4px solid ${opacity(dark_white, "0.5")}`, backgroundColor: opacity(dark_white, "0.5"), transform: `translate(${_initial ? "30px" : "4px"}, -50%)`}} className={`${custom_styling.SortingSettings_switch_child}`}>

            </div>
        </div>
    )
}

const Setting = (props) => {
    return (
        <div style={{borderRadius: 20, minHeight: 90, padding: "20px 30px", border: "1px solid rgba(236, 241, 255, 0.5)", backgroundColor: "#181818"}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.justify_content_start} ${styling.border_box} ${styling.align_self_stretch}}`}>
            <div style={{gap: 20}} className={`${styling.flex_row} ${styling.align_items_center}`}>
                <div style={{gap: 3}} className={`${styling.flex_col}`}>
                    {props.children}
                </div>
                <ToggleButton name={props.name}/>
            </div>
        </div>
    )
}

const SortingSettings = () => {

    Portal.on("toggleSetting", (data) => {

        fileVerify()
        console.log(data)
        const _dir = `${__dirname}/bin/settings.json`;
        

    });

    return (
        <div style={{padding: 30, gap: 20, overflowY: "scroll", minWidth: 450, maxWidth: 450}} className={`${styling.flex_col} ${styling.flex_fill_height} ${styling.flex_align_center} ${styling.border_box} ${styling.scroll}`}>
            <Setting name="sortbyname?">
                <Text size={14}>Sort By Name</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Lists out all applications and sorts by name meaning it follows the abc rule :).</Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Works With Prioritize Application, Turns off Sort By Time</Text>
            </Setting>

            <Setting name="sortbytime?">
                <Text size={14}>Sort By Time</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Lists out all applications and sorts by Time, greatest at the top to least at the bottom.</Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Works With Prioritize Application, Turns off Sort By Name</Text>
            </Setting>

            <Setting name="prioritizeapplication?">
                <Text size={14}>Prioritize Application</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Lists out applications while prioritizing applications meaning all entries with isApplication? set to True show up first.</Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Can work with Sort By Name</Text>
            </Setting>

            <Setting name="hideallnonapplications?">
                <Text size={14}>Hide all Non-Applications</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Pretty self-explanatory, hides all entries with isApplication? set to <Text size={10} opacity="1" color="#F43944">False</Text></Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Deactivates Hide all Applications</Text>
            </Setting>

            <Setting name="hideallapplications?">
                <Text size={14}>Hide all Applications</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Pretty self-explanatory, hides all entries with isApplication? set to <Text size={10} opacity="1" color="#52FF59">True</Text></Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Deactivates Hide all Non-Applications</Text>
            </Setting>
        </div>
    )
}

export default SortingSettings;
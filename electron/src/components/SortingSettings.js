/**
 * electron.components.SortingSettings.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import React from "react";
import styling from "@assets/styling.module.css";
import { Text } from "@components/global";

const Setting = (props) => {
    return (
        <div style={{borderRadius: 20, minHeight: 90, padding: "20px 30px", border: "1px solid rgba(236, 241, 255, 0.5)", backgroundColor: "#181818"}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.justify_content_start} ${styling.border_box} ${styling.align_self_stretch}}`}>
            <div style={{gap: 3}} className={`${styling.flex_col}`}>
                {props.children}
            </div>
        </div>
    )
}

const SortingSettings = () => {
    return (
        <div style={{padding: 30, gap: 20, overflowY: "scroll"}} className={`${styling.flex_col} ${styling.flex_fill_all} ${styling.flex_align_center} ${styling.border_box} ${styling.scroll}`}>
            <Setting>
                <Text size={14}>Sort By Name</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Lists out all applications and sorts by name meaning it follows the abc rule :).</Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Works With Prioritize Application, Turns off Sort By Time</Text>
            </Setting>

            <Setting>
                <Text size={14}>Sort By Time</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Lists out all applications and sorts by Time, greatest at the top to least at the bottom.</Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Works With Prioritize Application, Turns off Sort By Name</Text>
            </Setting>

            <Setting>
                <Text size={14}>Prioritize Application</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Lists out applications while prioritizing applications meaning all entries with isApplication? set to True show up first.</Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Can work with Sort By Name</Text>
            </Setting>

            <Setting>
                <Text size={14}>Hide all Non-Applications</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Pretty self-explanatory, hides all entries with isApplication? set to <Text size={10} opacity="1" color="#F43944">False</Text></Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Deactivates Hide all Applications</Text>
            </Setting>

            <Setting>
                <Text size={14}>Hide all Applications</Text>
                <Text size={12} color="rgba(236, 241, 255, 0.5)">Pretty self-explanatory, hides all entries with isApplication? set to <Text size={10} opacity="1" color="#52FF59">True</Text></Text>
                <Text size={10} color="#2880D2" fontFamily="LatoItalic" opacity="1">Deactivates Hide all Non-Applications</Text>
            </Setting>
        </div>
    )
}

export default SortingSettings;
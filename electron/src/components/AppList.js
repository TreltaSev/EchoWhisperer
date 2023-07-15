/**
 * electron.components.AppList.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import React from "react";
import styling from "@assets/styling.module.css";
import custom_styling from "@assets/custom.module.css"

const AppDetailText = (props) => {
    const _color = props.color !== undefined ? props.color : "#e2efff";
    const _opacity = props.opacity !== undefined ? props.opacity : "1";
    const _small = props.small !== undefined ? props.small : false;
    return (
        <span style={{opacity: _opacity, color: _color}} className={`${_small ? styling.text_s : styling.text_m}`}>
            {props.children}
        </span>
    )
}

const AppDetailTextGroup = (props) => {
    const _width = props.width !== undefined ? props.width : "auto";
    return (
        <div style={{width: _width}} className={`${styling.flex_col} ${styling.align_items_start} ${styling.justify_content_start}`}>
            {props.children}
        </div>
    )
}

const _swatch = class {
    constructor (bool) {
        bool = bool !== undefined ? bool : false;
        this.text = bool === true ? "True" : "False";
        this.color = bool === true ? "#8ffe93" : "#fe5d5d";
    }
}


const AppDetailChip = (props) => {
    const processName = props.propsName !== undefined ? props.processName : "undefined.exe";
    const hours = props.hours !== undefined ? props.hours : 999;
    const isOpen = new _swatch(props.isOpen);
    const isApplication = new _swatch(props.isApplication);


    return (
        <div style={{borderRadius: 10, borderColor: 1, minHeight: 40, minWidth: 300, position: "relative"}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.align_self_stretch} ${custom_styling.AppList_full_border_white}`}>
            { /* Left Side Chip */}
            <div className={`${custom_styling.AppList_left_side_chip}`}/>

            { /* Content */}
            <div style={{padding: 10, gap: 15}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.border_box} ${styling.flex_fill_all}`}>
                <AppDetailTextGroup width={80}>
                    <AppDetailText>
                        {processName}
                    </AppDetailText>
                    <AppDetailText opacity="0.5" small={true}>{`${hours} ${hours > 1 ? "hrs" : "hr"}`}</AppDetailText>
                </AppDetailTextGroup>

                <AppDetailTextGroup>
                    <AppDetailText>Open</AppDetailText>
                    <AppDetailText color={isOpen.color}>{isOpen.text}</AppDetailText>
                </AppDetailTextGroup>

                <AppDetailTextGroup>
                    <AppDetailText>isApplication?</AppDetailText>
                    <AppDetailText color={isApplication.color}>{isApplication.text}</AppDetailText>
                </AppDetailTextGroup>

            </div>

        </div>
    )
}

const AppList = () => {
    return (
        <div style={{minWidth: 320, padding: "30px 10px", gap:10}} className={`${styling.flex_col} ${styling.align_items_center} ${styling.border_box} ${styling.flex_fill_height} ${styling.dark_sub} ${styling.border_right} ${styling.dark_accent}`}>
            <AppDetailChip processName="discord.exe" hours={232} isOpen={true} isApplication={true}/>
        </div>
    )
}

export default AppList;
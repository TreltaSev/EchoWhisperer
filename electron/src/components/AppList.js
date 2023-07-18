/**
 * electron.components.AppList.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import React, { useContext, useEffect, useState } from "react";
import styling from "@assets/styling.module.css";
import custom_styling from "@assets/custom.module.css"
import { undefinedCheck } from "./global";
import { Star } from "../assets/icons";

const AppDetailText = (props) => {
    const _color = props.color !== undefined ? props.color : "#ECF1FF";
    const _opacity = props.opacity !== undefined ? props.opacity : "1";
    const _small = props.small !== undefined ? props.small : false;
    return (
        <span style={{opacity: _opacity, color: _color, maxWidth: 120, wordWrap: "break-word"}} className={`${_small ? styling.text_s : styling.text_m}`}>
            {props.children}
        </span>
    )
}

const AppDetailTextGroup = (props) => {
    const _width = props.width !== undefined ? props.width : "auto";
    return (
        <div style={{width: _width}} className={`${styling.flex_col} ${styling.align_items_start} ${styling.justify_content_start} ${styling.align_self_stretch}`}>
            {props.children}
        </div>
    )
}

const FavoriteButton = (props) => {
    const _favorite = undefinedCheck(props.favorite, false);

    const toggle = () => {
        console.log(props);
        props.socket.send(JSON.stringify({type: "set?", entry: props.name, value: !_favorite == true ? 1 : 0}));
    }

    return (
        <div onClick={() => toggle()} style={{minWidth: 20, minHeight: 20, marginLeft: "auto", borderRadius: "50%", border: "1px solid #ECF1FF", backgroundColor: _favorite ? "#2880D2" : "transparent"}} className={`${styling.flex_col} ${styling.align_items_center} ${styling.justify_content_center}`}>
            <Star opacity={_favorite ? "1" : "0.5"}/>
        </div>
    )
}

const _swatch = class {
    constructor (bool) {
        bool = bool == 1 ? true : false;
        bool = bool !== undefined ? bool : false;
        this.text = bool === true ? "True" : "False";
        this.color = bool === true ? "#52FF59" : "#F43944";
    }
}


const AppDetailChip = (props) => {    
    const processName = props.processName !== undefined ? props.processName : "undefined.exe";
    const isOpen = new _swatch(props.isOpen);
    const isFavorite = new _swatch(props.isFavorite);
    const checkIsFavorite = props.isFavorite == 1 ? true : false;

    const convert = (seconds) => {
        if (seconds >= 3600) {
            const hours = Math.round(seconds/3600 * 10) / 10;
            return `${hours} ${hours > 1 ? "hrs" : "hr"}`;
        } else if (seconds >= 60) {
            const minutes = Math.round(seconds/60 * 10) / 10;
            return `${minutes} ${minutes > 1 ? "mins" : "min"}`;
        } else {
            return `${seconds} ${seconds > 1 ? "secs" : "sec"}`;
        }
    }

    return (
        <div style={{borderRadius: 10, position: "relative"}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.align_self_stretch} ${custom_styling.AppList_full_border_white}`}>
            { /* Left Side Chip */}
            <div className={`${custom_styling.AppList_left_side_chip}`}/>

            { /* Content */}
            <div style={{padding: 10, gap: 15}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.border_box} ${styling.flex_fill_all}`}>
                <AppDetailTextGroup width={120}>
                    <AppDetailText>
                        {processName}
                    </AppDetailText>
                    <AppDetailText opacity="0.5" small={true}>{convert(props.seconds)}  {`${props.isOpen ? `pid:${props.pid}` : ""}`}</AppDetailText>
                </AppDetailTextGroup>

                <AppDetailTextGroup>
                    <AppDetailText>Open</AppDetailText>
                    <AppDetailText color={isOpen.color}>{isOpen.text}</AppDetailText>
                </AppDetailTextGroup>

                <AppDetailTextGroup>
                    <AppDetailText>isFavorite?</AppDetailText>
                    <AppDetailText color={isFavorite.color}>{isFavorite.text}</AppDetailText>
                </AppDetailTextGroup>

                <FavoriteButton name={processName} socket={props.socket} favorite={checkIsFavorite}/>
            </div>
        </div>
    )
}

const AppList = (props) => {
    console.log(props)
    return (
        <div style={{minWidth: 320, padding: "30px 10px", gap:10, overflowY: "auto", overflowX: "hidden"}} className={`${styling.flex_col} ${styling.align_items_center} ${styling.border_box} ${styling.flex_fill_height} ${styling.dark_sub} ${styling.border_right} ${styling.dark_accent} ${styling.scroll}`}>
            {
                props.entries !== [] ? Object.entries(props.entries).map(([k, s], i) => (
                    <AppDetailChip socket={props.socket} key={`${s.name}__`} processName={s.name} seconds={s.time} isOpen={s.isOpen} isFavorite={s.isFavorite} pid={s.pid}/>
                )) : <></>
            }
        </div>
    )
}

export default AppList;
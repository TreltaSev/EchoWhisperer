/**
 * electron.components.AppList.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * @returns 
 */
import React, { useContext, useEffect, useState, useRef } from "react";
import { dark_red } from "@assets/colors";
import { CloseIcon, Star } from "@assets/icons";
import styling from "@assets/styling.module.css";
import custom_styling from "@assets/custom.module.css"
import { undefinedCheck, Portal, fileVerify, _pathSettings, deleteEntry, _pathEntries } from "@components/global";

const AppDetailText = (props) => {
    const _color = props.color !== undefined ? props.color : "#ECF1FF";
    const _opacity = props.opacity !== undefined ? props.opacity : "1";
    const _small = props.small !== undefined ? props.small : false;
    
    return (
        <span style={{opacity: _opacity, color: _color, ...props.style_extra}} className={`${_small ? styling.text_s : styling.text_m}`}>
            {props.children}
        </span>
    )
}

const AppDetailTextGroup = (props) => {
    const _width = props.width !== undefined ? props.width : "auto";
    const _spec = undefinedCheck(props.spec, false);
    return (
        <div style={{width: _width, ...props.style_extra}} className={`${styling.flex_col} ${styling.align_items_start} ${styling.justify_content_start}`}>
            {props.children}
        </div>
    )
}

const FavoriteButton = (props) => {
    const _favorite = undefinedCheck(props.favorite, false);

    const toggle = () => {
        props.socket.send(JSON.stringify({type: "set?", entry: props.name, value: !_favorite == true ? 1 : 0}));
    }

    return (
        <div onClick={() => toggle()} style={{minWidth: 20, minHeight: 20, marginLeft: "auto", borderRadius: "50%", border: "1px solid #ECF1FF", backgroundColor: _favorite ? "#2880D2" : "transparent"}} className={`${styling.flex_col} ${styling.align_items_center} ${styling.justify_content_center}`}>
            <Star opacity={_favorite ? "1" : "0.5"}/>
        </div>
    )
}

const DeleteButton = (props) => {
    const toggle = () => {
        if (props.isConnected === false) {
            deleteEntry(_pathEntries, props.name);
            Portal.emit("refresh", {})
        } else {
            props.socket.send(JSON.stringify({type: "delete?", entry: props.name}));
        }
        
    }

    return (
        <div onClick={() => toggle()} style={{height: 20, width: 20, resize: "none", backgroundColor: dark_red, borderRadius: 5}} className={`${styling.flex_col} ${styling.align_items_center} ${styling.justify_content_center}`}>
            <CloseIcon/>
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
    const RightSideSwatch = useRef(null);

    const mouseEnter = () => {
        RightSideSwatch.current.classList.add(custom_styling.AppList_right_side_close_active);
    }

    const mouseLeave = () => {
        RightSideSwatch.current.classList.remove(custom_styling.AppList_right_side_close_active);
    }

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
        <div onMouseEnter={() => mouseEnter()} onMouseLeave={() => mouseLeave()} style={{position: "relative", zIndex: 5}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.align_self_stretch}`}>
            { /* Left Side Chip */}
            <div style={{zIndex: 3}} className={`${custom_styling.AppList_left_side_chip}`}/>
            <div ref={RightSideSwatch} style={{zIndex: 1}} className={`${custom_styling.AppList_right_side_close} ${styling.dark_sub} ${styling.flex_col} ${styling.align_items_center} ${styling.justify_content_center}`}>
                <DeleteButton isConnected={props.isConnected} name={processName} socket={props.socket}/>
            </div>

            { /* Content */}
            <div style={{padding: 10, gap: 15, zIndex: 2, borderRadius: 10}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.border_box} ${styling.flex_fill_all} ${custom_styling.AppList_full_border_white} ${styling.dark_sub} ${styling.justify_content_end}`}>
                <AppDetailTextGroup width="100%">
                    <AppDetailText style_extra={{maxWidth: "100%", display: "block", overflowWrap: "anywhere"}}>
                        {processName}
                    </AppDetailText>
                    <AppDetailText opacity="0.5" small={true}>{convert(props.seconds)}  {`${props.isOpen ? `pid:${props.pid}` : ""}`}</AppDetailText>
                </AppDetailTextGroup>

                <div style={{flex: "1 0 0", alignSelf: "stretch"}}/>

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
    const fs = require("fs");
    fileVerify() 
    const [settings, setSettings] = useState(JSON.parse(fs.readFileSync(_pathSettings, "utf-8")))
    Portal.on("toggleSetting", (data) => {
        setSettings(JSON.parse(fs.readFileSync(_pathSettings, "utf-8")));
    });

    const sortbyname = settings["sortbyname?"];
    const sortbytime = settings["sortbytime?"]
    const prioritizefavorite = settings["prioritizefavorite?"]
    const prioritizeopen = settings["prioritizeopen?"]
    const hideallnonfavorites = settings["hideallnonfavorites?"]
    const hideallfavorites = settings["hideallfavorites?"]
    const hideallopen = settings["hideallopen?"]
    const hideallnotopen = settings["hideallnotopen?"]
    
    let _entries = props.entries;

    if (sortbyname) {
        _entries.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {return -1;}
            if (nameA > nameB) {return 1;}
            return 0;
        })
    }

    if (sortbytime) {
        _entries.sort((a, b) => {
            return b.time - a.time;
        })
    }    

    if (prioritizeopen) {
        _entries.sort((a, b) => {
            if (a.isOpen && !b.isOpen) {
                return -1;
            }
            if (!a.isOpen && b.isOpen) {
                return 1;
            }
            return 0;
        })
    }

    if (prioritizefavorite) {
        _entries.sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) {
                return -1;
            }
            if (!a.isFavorite && b.isFavorite) {
                return 1;
            }
            return 0;
        })
    }

    if (hideallfavorites) {
        _entries = _entries.filter(item => !item.isFavorite)
    }

    if (hideallnonfavorites) {
        _entries = _entries.filter(item => item.isFavorite)
    }

    if (hideallopen) {
        _entries = _entries.filter(item => !item.isOpen)
    }

    if (hideallnotopen) {
        _entries = _entries.filter(item => item.isOpen)
    }
    
    return (
        <div style={{width: "100%", minWidth: 300, padding: "30px 10px", gap:10, overflowY: "auto", overflowX: "hidden"}} className={`${styling.flex_col} ${styling.align_items_center} ${styling.border_box} ${styling.flex_fill_height} ${styling.dark_sub} ${styling.border_right} ${styling.dark_accent} ${styling.scroll}`}>
            {
                _entries !== [] ? Object.entries(_entries).map(([k, s], i) => (
                    <AppDetailChip socket={props.socket} key={`${s.name}__`} processName={s.name} seconds={s.time} isOpen={s.isOpen} isFavorite={s.isFavorite} pid={s.pid} isConnected={props.isConnected}/>
                )) : <></>
            }
        </div>
    )
}

export default AppList;
/**
 * electron.components.global.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Global components to be used everywhere.
 * Mostly contains very modifiable components such as Text
 */
import React from "react";
import styling from "@assets/styling.module.css"
const fs = require("fs")
const { ipcRenderer } = require('electron');


/**
 * Checks if the program is packaged with nsis.
 */
export const isPackaged = ipcRenderer.sendSync("get:isPackaged");

/**
 * A path remedy which handles different paths depending
 * on if the program was compiled and packaged or still
 * in development.
 */
export const pathRemedy = isPackaged ? "/../.." : ""

/**
 * path to bin/
 */
export const _pathBin = `${__dirname}${pathRemedy}/bin`

/**
 * Path to settings.json
 */
export const _pathSettings = `${_pathBin}/settings.json`;

/**
 * path to entries.bin
 */
export const _pathEntries  = `${_pathBin}/entries.bin`;




/**
* Takes in a _val which is the variable to check
* and a _default which is the default value after the undefined check.
* if _val is undefined this method returns _default
* if it isn't undefined then it returns _val.
*
* Added In `v0.0.1`
*
* Resides In `electron.components.global.js`
* @param {*} _val 
* @param {*} _default 
* @returns _val if it isn't undefined, else _default
*/
export const undefinedCheck = (_val, _default) => {
    _val = _val !== undefined ? _val : _default;
    return _val;
}

/**
 * Basic Text component which can be utilized and customized by passing in props
 * These props include:
 * 
 * `color<string>` Color in [hex](https://en.wikipedia.org/wiki/Web_colors) or [rgb](https://en.wikipedia.org/wiki/RGB_color_model) representation such as #fff #ffffff or rgb(255,255,255) or rgba(255,255,255,1) or hsl etc etc.
 * as long as it works with a [color property](https://developer.mozilla.org/en-US/docs/Web/CSS/color) in css, it works here you can see common examples of some color codes [here](https://developer.mozilla.org/en-US/docs/Web/CSS/color#making_text_red) *Defaults to `string: "#e2efff"`*
 * 
 * `opacity<string>` opacity in a [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) format formed like this: `"1.0"` represeting a one opacity or 100%, can also be inputed as `"1"` and even "100%". *Defaults to `string: "1"`*
 * 
 * `size<int>` an [integer](https://developer.mozilla.org/en-US/docs/Web/CSS/integer) representation of the font size in pixels, im pretty sure you can also use a [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) here. can either input a number like `int: (1)` (value in parenthesis) or `string: ("0.2em")` (value in parenthesis) *Defaults to `int: 10`*
 * 
 * `fontFamily<string>` Literally just the name of the font, as of right now the documented fontFamilies are `Lato` and `LatoItalic` *Defaults to `string: "Lato"`*
 * @param {*} props 
 * @returns 
 */
export const Text = (props) => {   

    const _color = undefinedCheck(props.color, "#ECF1FF");
    const _opacity = undefinedCheck(props.opacity, "1");
    const _size = undefinedCheck(props.size, 10);
    const _fontFamily = undefinedCheck(props.fontFamily, "Lato");

    return (
        <span style={{color: _color, opacity: _opacity, fontSize: _size, fontFamily: _fontFamily}} className={styling.text_x}>
            {props.children}
        </span>
    )
}

const _writeSettings = () => {
    fs.writeFileSync(_pathSettings, JSON.stringify({"sortbyname?" : false,"sortbytime?" : false,"prioritizefavorite?" : false,"hideallnonfavorites?" : false,"hideallfavorites?" : false, "prioritizeopen": false, "hideallopen?": false, "hideallnotopen?": false}  , null, "\t"));
}

/**
 * A basic method which checks files and directories and creates
 * these files and directories if it doesnt exist.
 * Checks for `/bin`, `/bin/settings.json`, and `/bin/entries.bin`
 * settings.json is used by the electron portion while entries.bin is used mainly by the
 * c++ portion of this program.
 * This method also checks for json inegrity using the `jsVerify()` method.
 * the only way in all hell that this would break is if the user deletes the files instantly after the check is made
 * or if windows just stops creation of the files.
 */
export const fileVerify = () => {
    if (fs.existsSync(_pathBin) == false) {
        fs.mkdirSync(_pathBin);
    }

    if (fs.existsSync(_pathSettings) === false) {_writeSettings();}
    jsVerify();
    if (fs.existsSync(_pathEntries) === false) {fs.writeFileSync(_pathEntries, "");}
}

const jsVerify = () => {
    const _raw = fs.readFileSync(_pathSettings);
    try {if (Object.values(JSON.parse(_raw)).every(val => typeof val === 'boolean') == false) {_writeSettings();}} catch (e) {_writeSettings();}
    return    
}


/**
 * "Portal" class which is able to listen for and emit
 * requests throughout the application.
 * saves all requeusts in a static dictionary.
 * 
 * Added in `v0.0.2`
 */
export const Portal = class {

    static eventListeners = {};

    static on(event, callback) {
        if (!Portal.eventListeners[event]) {
            Portal.eventListeners[event] = [];
        }
        Portal.eventListeners[event].push(callback);
    }

    static emit(event, data) {
        const listeners = Portal.eventListeners[event];
        if (listeners) {
            listeners.forEach((listener) => listener(data));
        }
    }
}


/**
 * Gets and parses all entries from `bin/entries.bin`
 * returns all of the entres in an array showine these values:
 * `name`
 * `time`
 * `isFavorite`
 * `pid`
 * 
 * Added in `v0.0.3`
 */
export const getEntries = (fileName) => {
    const fileData = fs.readFileSync(fileName);
    const entries = [];
  
    let offset = 0;
    while (offset < fileData.length) {
      const nameSize = fileData.readInt32LE(offset);offset += 4;  
      const nameBuffer = fileData.slice(offset, offset + nameSize);
      const name = nameBuffer.toString();offset += nameSize;  
      const time = fileData.readInt32LE(offset);offset += 4;  
      const isFavorite = fileData.readInt32LE(offset);offset += 4;  
      const pid = fileData.readInt32LE(offset);offset += 4;  
      const entry = { name, time, isFavorite, pid };
      entries.push(entry);
    }  
    return entries;
}

/**
 * Finds an entry by name then removes it, converted from c++
 * 
 * Added in `v0.0.3`
 */
export const deleteEntry = (fileName, entryName) => {
    const fileData = fs.readFileSync(fileName);
    const entries = [];
    let offset = 0;
    let foundEntry = false;
    while (offset < fileData.length) {
        const nameSize = fileData.readInt32LE(offset);offset += 4;  
        const nameBuffer = fileData.slice(offset, offset + nameSize);
        const name = nameBuffer.toString();offset += nameSize;  
        const time = fileData.readInt32LE(offset);offset += 4;  
        const isFavorite = fileData.readInt32LE(offset);offset += 4;  
        const pid = fileData.readInt32LE(offset);offset += 4;  
        if (name !== entryName) {
            const entry = { name, time, isFavorite, pid };
            entries.push(entry);
        } else {
            foundEntry = true;
        }
    }

    if (foundEntry) {
        saveBulk(fileName, entries);
    }
}

/**
 * Saves all entries in a list
 * 
 * Added in `v0.0.3`
 */
export const saveBulk = (fileName, entries) => {
    const fileData = [];
    for (const entry of entries) {
        const nameSize = entry.name.length;
        const nameSizeBuffer = Buffer.alloc(4);nameSizeBuffer.writeInt32LE(nameSize);
        const nameBuffer = Buffer.from(entry.name, "utf-8");
        const timeBuffer = Buffer.alloc(4);timeBuffer.writeInt32LE(entry.time);
        const isFavoriteBuffer = Buffer.alloc(4);isFavoriteBuffer.writeInt32LE(entry.isFavorite);
        const pidBuffer = Buffer.alloc(4);pidBuffer.writeInt32LE(entry.pid);
        fileData.push(nameSizeBuffer, nameBuffer, timeBuffer, isFavoriteBuffer, pidBuffer);
    };
    const buffer = Buffer.concat(fileData);
    fs.writeFileSync(fileName, buffer, {flag: "w"});
}

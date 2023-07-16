/**
 * electron.components.global.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Global components to be used everywhere.
 * Mostly contains very modifiable components such as Text
 */
import React from "react";
import styling from "@assets/styling.module.css"

/**
* Takes in a _val which is the variable to check
* and a _default which is the default value after the undefined check.
* if _val is undefined this method returns _default
* if it isn't undefined then it returns _val.
*
* Added In `~v0.0.1`
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

export const Text = (props) => {   

    const _color = undefinedCheck(props.color, "#e2efff");
    const _opacity = undefinedCheck(props.opacity, "1");
    const _size = undefinedCheck(props.size, 10);
    const _fontFamily = undefinedCheck(props.fontFamily, "Lato");

    return (
        <span style={{color: _color, opacity: _opacity, fontSize: _size, fontFamily: _fontFamily}} className={styling.text_x}>
            {props.children}
        </span>
    )
}
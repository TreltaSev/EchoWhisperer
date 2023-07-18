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
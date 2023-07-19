/**
 * electron.assets.icons.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Bulk of every color used.
 * @returns 
 */

export const dark_sub    = "#181818";
export const dark_main   = "#212121";
export const dark_white  = "#ECF1FF";
export const dark_accent = "#1B1C25";
export const darK_green  = "#52FF59";
export const dark_red    = "#F43944";
export const dark_ult    = "#2880D2";

/**
 * Takes in a hex color and a text opacity and returns a string
 * which represents a rgba method in css. return value
 * should look a little something like `rgba(255,255,255,1)` if you input
 * `#ffffff` as the color and `1.0` as the opacity.
 * @param {*} _color Color in hex form,
 * @param {*} _opacity Opacity in text form
 */
export const opacity = (_color, _opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_color);
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${_opacity})`;
}
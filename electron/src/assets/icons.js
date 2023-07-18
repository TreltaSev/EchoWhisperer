/**
 * electron.assets.icons.js
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Bulk of every icon used.
 * @returns 
 */
import React from "react";
import { undefinedCheck } from "../components/global";

export const Star = (props) => {
    const _opacity = undefinedCheck(props.opacity, "1")
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.49026 7.54646L5.00029 6.6386L6.52075 7.5573L6.10409 5.84897L7.43742 4.69272L5.68742 4.54689L4.99992 2.9323L4.32284 4.53647L2.57284 4.6823L3.91005 5.8284L3.49026 7.54646ZM2.06242 9.52605L2.84367 6.19272L0.239502 3.9323L3.67284 3.64279L4.99992 0.473969L6.33742 3.64279L9.76034 3.9323L7.15617 6.19272L7.94784 9.52605L4.99992 7.7448L2.06242 9.52605Z" fill="#ECF1FF" fillOpacity={_opacity}/>
        </svg>
    )
}

export const LogoIcon = () => {
    return (
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_46_36)">
                <path d="M17 1H5C2.51472 1 0.5 3.01472 0.5 5.5V17.5C0.5 19.9853 2.51472 22 5 22H17C19.4853 22 21.5 19.9853 21.5 17.5V5.5C21.5 3.01472 19.4853 1 17 1Z" fill="#212121" stroke="black"/>
                <mask id="mask0_46_36" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="12" y="8" width="7" height="7">
                    <path d="M18.4 11.5C18.4 9.73269 16.9673 8.3 15.2 8.3C13.4327 8.3 12 9.73269 12 11.5C12 13.2673 13.4327 14.7 15.2 14.7C16.9673 14.7 18.4 13.2673 18.4 11.5Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_46_36)">
                    <path d="M18.4 11.5C18.4 9.73269 16.9673 8.3 15.2 8.3C13.4327 8.3 12 9.73269 12 11.5C12 13.2673 13.4327 14.7 15.2 14.7C16.9673 14.7 18.4 13.2673 18.4 11.5Z" fill="#F43944"/>
                    <path d="M15.2 19.5C16.9673 19.5 18.4 18.0673 18.4 16.3C18.4 14.5327 16.9673 13.1 15.2 13.1C13.4327 13.1 12 14.5327 12 16.3C12 18.0673 13.4327 19.5 15.2 19.5Z" fill="#F43944"/>
                    <path d="M15.2 19.5C16.9673 19.5 18.4 18.0673 18.4 16.3C18.4 14.5327 16.9673 13.1 15.2 13.1C13.4327 13.1 12 14.5327 12 16.3C12 18.0673 13.4327 19.5 15.2 19.5Z" fill="black" fillOpacity="0.2"/>
                </g>
                <mask id="mask1_46_36" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="3" y="8" width="7" height="7">
                    <path d="M10.0001 11.5C10.0001 9.73269 8.56741 8.3 6.8001 8.3C5.03279 8.3 3.6001 9.73269 3.6001 11.5C3.6001 13.2673 5.03279 14.7 6.8001 14.7C8.56741 14.7 10.0001 13.2673 10.0001 11.5Z" fill="white"/>
                </mask>
            <g mask="url(#mask1_46_36)">
                <path d="M10.0001 11.5C10.0001 9.73269 8.56741 8.3 6.8001 8.3C5.03279 8.3 3.6001 9.73269 3.6001 11.5C3.6001 13.2673 5.03279 14.7 6.8001 14.7C8.56741 14.7 10.0001 13.2673 10.0001 11.5Z" fill="#2880D2"/>
                <path d="M6.8001 19.5C8.56741 19.5 10.0001 18.0673 10.0001 16.3C10.0001 14.5327 8.56741 13.1 6.8001 13.1C5.03279 13.1 3.6001 14.5327 3.6001 16.3C3.6001 18.0673 5.03279 19.5 6.8001 19.5Z" fill="#2880D2"/>
                <path d="M6.8001 19.5C8.56741 19.5 10.0001 18.0673 10.0001 16.3C10.0001 14.5327 8.56741 13.1 6.8001 13.1C5.03279 13.1 3.6001 14.5327 3.6001 16.3C3.6001 18.0673 5.03279 19.5 6.8001 19.5Z" fill="black" fillOpacity="0.2"/>
            </g>
            </g>
            <rect x="0.5" y="1" width="21" height="21" rx="10.5" stroke="#1B1C25"/>
            <defs>
            <clipPath id="clip0_46_36">
            <rect x="1" y="1.5" width="20" height="20" rx="10" fill="white"/>
            </clipPath>
            </defs>
        </svg>

    )
}


export const MinimizeIcon = () => {
    return (
        <svg opacity="0" width="8" height="2" viewBox="0 0 8 2" fill="#000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.42188V0H7.98438V1.42188H0Z"/>
        </svg>
    )
}


export const CloseIcon = () => {
    return (
        <svg opacity="0" width="10" height="10" viewBox="0 0 10 10" fill="#000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.984375 9.1875L0 8.20312L3.60938 4.59375L0 1L0.984375 0L4.59375 3.59375L8.20312 0L9.1875 1L5.59375 4.59375L9.1875 8.20312L8.20312 9.1875L4.59375 5.59375L0.984375 9.1875Z"/>
        </svg>
    )
}



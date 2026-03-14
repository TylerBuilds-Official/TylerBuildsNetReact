import React from "react";
import { type JSX } from "react";


const SupportAvatarSvg = (): JSX.Element => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8"></path>
            <rect x="2" y="8" width="20" height="12" rx="2"></rect>
            <path d="M6 12h.01"></path>
            <path d="M18 12h.01"></path>
            <path d="M9 16v.01"></path>
            <path d="M15 16v.01"></path>
        </svg>
    );
};

export default SupportAvatarSvg;
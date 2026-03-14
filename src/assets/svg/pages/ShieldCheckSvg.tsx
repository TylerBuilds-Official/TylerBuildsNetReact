import React from "react";
import { type JSX } from "react";

const ShieldCheckSvg = ({ size = 28 }: { size?: number }): JSX.Element => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
    );
};

export default ShieldCheckSvg;

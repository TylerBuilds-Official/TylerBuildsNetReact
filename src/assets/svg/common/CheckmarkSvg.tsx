import React from "react";
import { type JSX } from "react";

const CheckmarkSvg = ({ size = 14, strokeWidth = 2 }: { size?: number; strokeWidth?: number }): JSX.Element => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );
};

export default CheckmarkSvg;

import React from "react";
import { type JSX } from "react";

const ChevronRightSvg = ({ size = 32 }: { size?: number }): JSX.Element => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    );
};

export default ChevronRightSvg;

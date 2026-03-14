import React from "react";
import { type JSX } from "react";

const CloseSvg = ({ size = 20 }: { size?: number }): JSX.Element => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
};

export default CloseSvg;

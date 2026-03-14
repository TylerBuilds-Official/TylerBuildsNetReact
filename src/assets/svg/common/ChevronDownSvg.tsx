import React from "react";
import { type JSX } from "react";

const ChevronDownSvg = ({ size = 20, className }: { size?: number; className?: string }): JSX.Element => {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

export default ChevronDownSvg;

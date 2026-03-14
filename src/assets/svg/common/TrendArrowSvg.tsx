import React from "react";
import { type JSX } from "react";

const TrendArrowSvg = ({ direction, size = 12 }: { direction: "up" | "down"; size?: number }): JSX.Element => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {direction === "up" ? (
                <polyline points="18 15 12 9 6 15"></polyline>
            ) : (
                <polyline points="6 9 12 15 18 9"></polyline>
            )}
        </svg>
    );
};

export default TrendArrowSvg;

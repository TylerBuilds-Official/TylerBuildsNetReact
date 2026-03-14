import React from "react";
import { type JSX } from "react";

const CreditCardSvg = ({ size = 20 }: { size?: number }): JSX.Element => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
    );
};

export default CreditCardSvg;

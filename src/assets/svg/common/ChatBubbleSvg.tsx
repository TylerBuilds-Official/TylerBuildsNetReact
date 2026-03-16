import React from 'react';
import { type JSX } from 'react';

const ChatBubbleSvg = ({ size = 24 }: { size?: number }): JSX.Element => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
};

export default ChatBubbleSvg;

import React from 'react';
import { type JSX } from 'react';

const SupportAvatarSmallSvg = (): JSX.Element => {
  return (
      <div className="ai-support-message-avatar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8"></path>
          <rect x="2" y="8" width="20" height="12" rx="2"></rect>
          <path d="M6 12h.01"></path>
          <path d="M18 12h.01"></path>
        </svg>
      </div>
  );
};

export default SupportAvatarSmallSvg;
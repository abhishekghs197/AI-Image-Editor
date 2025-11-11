import React from 'react';

const RusticWoodFrameIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    color="#8B4513"
  >
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <path d="M3 8h18M3 16h18M8 3v18M16 3v18" strokeWidth="0.5" />
  </svg>
);

export default RusticWoodFrameIcon;
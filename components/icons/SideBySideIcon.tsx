import React from 'react';

const SideBySideIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <path d="M12 3v18" />
  </svg>
);

export default SideBySideIcon;

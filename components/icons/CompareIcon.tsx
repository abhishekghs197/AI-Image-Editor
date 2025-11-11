import React from 'react';

const CompareIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 22V2" />
    <path d="M5 12H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3" />
    <path d="M19 12h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default CompareIcon;

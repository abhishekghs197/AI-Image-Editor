import React from 'react';

const TransparentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0h6v6H0V0zm6 6h6v6H6V6zm6 6h6v6h-6v-6zm-6 6H0v6h6v-6zm6-12h6v6h-6V0zm6 6h6v6h-6V6zM6 18h6v6H6v-6zm6 0h6v6h-6v-6z"
      fillOpacity="0.2"
    />
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" />
    <path d="M17 14a5.002 5.002 0 00-10 0h10zM7 14a5 5 0 004.575 4.975A8.956 8.956 0 0112 19a8.956 8.956 0 01.425-.025A5 5 0 0017 14H7z" />
  </svg>
);
export default TransparentIcon;

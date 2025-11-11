import React from 'react';

const Anaglyph3DIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M8 8H16V16H8z"
      fill="#FF0000" 
      style={{ mixBlendMode: 'screen' }}
    />
    <path
      d="M7 8H15V16H7z"
      fill="#00FFFF"
      style={{ mixBlendMode: 'screen' }}
    />
  </svg>
);

export default Anaglyph3DIcon;

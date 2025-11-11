import React from 'react';

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M12 1.25a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V2A.75.75 0 0112 1.25zM10.875.75a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0V.75zM13.125.75a.75.75 0 001.5 0v.75a.75.75 0 00-1.5 0V.75z"
    />
    <path
      fillRule="evenodd"
      d="M12 3a9 9 0 100 18 9 9 0 000-18zM1.5 12a10.5 10.5 0 1121 0 10.5 10.5 0 01-21 0z"
      clipRule="evenodd"
    />
    <path
      d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM4.502 12a7.5 7.5 0 1114.996 0 7.5 7.5 0 01-14.996 0z"
    />
  </svg>
);

export default CameraIcon;

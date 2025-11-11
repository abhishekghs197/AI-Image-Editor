import React from 'react';

const VectorArtIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M21.7,4.3C21.1,3.7,20,3.7,19.4,4.3L15,8.7L12.3,6C11.7,5.4,10.6,5.4,10,6L4.3,11.7C3.7,12.3,3.7,13.4,4.3,14L6,15.7V18 c0,1.1,0.9,2,2,2h2.3l1.7,1.7c0.6,0.6,1.7,0.6,2.3,0l5.7-5.7c0.6-0.6,0.6-1.7,0-2.3L21.7,4.3z M14,14.5c-0.8,0.8-2.1,0.8-2.8,0 c-0.8-0.8-0.8-2.1,0-2.8c0.8-0.8,2.1-0.8,2.8,0C14.8,12.4,14.8,13.7,14,14.5z" />
  </svg>
);

export default VectorArtIcon;

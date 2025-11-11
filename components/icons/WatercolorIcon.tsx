import React from 'react';

const WatercolorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M12 2.69l5.31 5.31c-1.75-1.76-4.99-2.2-6.56-.65-.63.62-.64 1.63-.02 2.25l-2.12 2.12c-.78-.78-2.05-.78-2.83 0s-.78 2.05 0 2.83l2.12 2.12c-.62.62-1.63.6-2.25-.02-1.55-1.57-1.1-4.81.65-6.56L12 2.69zm5.2 6.38c1.33 1.33 1.25 4.1-.25 5.6-1.5 1.5-4.27 1.58-5.6  .25l4.44-4.44c.49-.49 1.28-.49 1.77 0s.49 1.28 0 1.77L8.11 16.9c-1.33-1.33-1.05-4.1.25-5.6 1.5-1.5 4.27-1.58 5.6-.25z"
    />
  </svg>
);

export default WatercolorIcon;

import React from 'react';

const CartoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8
	s8,3.59,8,8S16.41,20,12,20z"
    />
    <path
      d="M12,17.5c2.03,0,3.8-1.11,4.75-2.75H7.25C8.2,16.39,9.97,17.5,12,17.5z"
      opacity=".3"
    />
    <circle cx="9" cy="11.5" r="1.5" />
    <circle cx="15" cy="11.5" r="1.5" />
  </svg>
);

export default CartoonIcon;

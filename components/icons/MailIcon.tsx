import React from 'react';

interface MailIconProps {
  className?: string;
  'aria-label'?: string;
}

export const MailIcon: React.FC<MailIconProps> = ({ className = 'h-6 w-6', 'aria-label': ariaLabel }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
};

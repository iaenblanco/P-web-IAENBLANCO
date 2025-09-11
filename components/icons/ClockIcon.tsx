import React from 'react';

interface ClockIconProps {
  className?: string;
  'aria-label'?: string;
}

export const ClockIcon: React.FC<ClockIconProps> = ({ className = 'h-6 w-6', 'aria-label': ariaLabel }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
    >
      <circle cx={12} cy={12} r={10} strokeWidth={2} />
      <polyline points="12,6 12,12 16,14" strokeWidth={2} />
    </svg>
  );
};

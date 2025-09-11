import React from 'react';

interface TrendingUpIconProps {
  className?: string;
  'aria-label'?: string;
}

export const TrendingUpIcon: React.FC<TrendingUpIconProps> = ({ className = 'h-6 w-6', 'aria-label': ariaLabel }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
};

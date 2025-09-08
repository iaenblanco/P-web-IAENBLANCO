import React from 'react';

interface WandSparklesIconProps {
  className?: string;
}

export const WandSparklesIcon: React.FC<WandSparklesIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-2.26 2.26" />
    <path d="m19.49 6.51 2.26-2.26" />
    <path d="M2 22l2.26-2.26" />
    <path d="M6.51 19.49l-2.26 2.26" />
    <path d="M12 3v4" /><path d="M12 17v4" />
    <path d="M3 12h4" /><path d="M17 12h4" />
    <path d="m5 7 1-1" /><path d="m18 18 1-1" />
    <path d="m5 17 1 1" /><path d="m18 6 1 1" />
  </svg>
);

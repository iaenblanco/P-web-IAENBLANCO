import React from 'react';

interface GraduationCapIconProps {
  className?: string;
}

export const GraduationCapIcon: React.FC<GraduationCapIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>
  </svg>
);

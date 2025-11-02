import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

export const IconHamburger = ({ size = 24, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p} aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconCart = ({ size = 24, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p} aria-hidden="true">
    <path d="M6 6h15l-1.5 9h-12z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="9" cy="20" r="1.6" fill="currentColor"/>
    <circle cx="17" cy="20" r="1.6" fill="currentColor"/>
    <path d="M6 6l-2-2H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
export const IconChevronRight = ({ size = 16, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);
export const IconChevronLeft = ({ size = 16, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M15 6l-6 6 6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);


import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = false,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-10 h-10 rounded-xl text-sm',
    lg: 'w-14 h-14 rounded-2xl text-base',
  }[size];

  const svgSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  }[size];

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Badge */}
      <div
        className={`${iconDimensions} bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg text-white transition-transform duration-300 hover:scale-105 shrink-0`}
      >
        <svg
          className={svgSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Career Pilot Flight Wing / Rocket Trajectory */}
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {/* Text Branding */}
      {showText && (
        <div>
          <div className="flex items-center gap-2">
            <span className={`${textSizes} font-black tracking-tight theme-text-heading`}>
              CAREER<span className="text-[var(--primary)]">PILOT</span>
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] border border-[var(--primary)]/30">
              REST API
            </span>
          </div>
          {showSubtitle && (
            <p className="text-[11px] theme-text-muted hidden sm:block">
              Your Career. Your Opportunities. One Place.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

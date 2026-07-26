import React from 'react';
import { COLOR_OPTIONS } from '../constants/attributes';

export const CrewmateAvatar = ({ colorName = 'Red', size = 120, className = '' }) => {
  const colorObj = COLOR_OPTIONS.find(c => c.name.toLowerCase() === colorName.toLowerCase()) || COLOR_OPTIONS[0];
  const fillColor = colorObj.hex;
  const strokeColor = colorObj.border;
  const shadowColor = colorObj.glow;

  return (
    <div 
      className={`crewmate-avatar ${className}`}
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 8px 16px ${shadowColor})`
      }}
    >
      <svg 
        viewBox="0 0 100 120" 
        width="100%" 
        height="100%" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow base */}
        <ellipse cx="50" cy="112" rx="30" ry="6" fill="rgba(0,0,0,0.35)" />

        {/* Backpack */}
        <rect 
          x="14" 
          y="42" 
          width="18" 
          height="45" 
          rx="9" 
          fill={fillColor} 
          stroke={strokeColor} 
          strokeWidth="4" 
        />
        {/* Backpack inner shadow */}
        <rect 
          x="16" 
          y="44" 
          width="10" 
          height="40" 
          rx="5" 
          fill="rgba(0,0,0,0.18)" 
        />

        {/* Main Body (Bean shape) */}
        <path 
          d="M 28 40 
             C 28 15, 72 15, 72 40 
             L 72 85 
             C 72 98, 58 98, 58 85 
             L 58 80 
             L 42 80 
             L 42 85 
             C 42 98, 28 98, 28 85 
             Z" 
          fill={fillColor} 
          stroke={strokeColor} 
          strokeWidth="4.5"
          strokeLinejoin="round" 
        />

        {/* Body Highlight */}
        <path 
          d="M 34 26 C 42 20, 60 20, 66 26" 
          stroke="rgba(255,255,255,0.35)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />

        {/* Left Foot detail */}
        <path 
          d="M 28 78 L 28 85 C 28 96, 42 96, 42 85 L 42 78" 
          fill="rgba(0,0,0,0.15)" 
        />

        {/* Visor / Helmet Glass */}
        <ellipse 
          cx="62" 
          cy="42" 
          rx="18" 
          ry="13" 
          fill="url(#visorGradient)" 
          stroke="#1E293B" 
          strokeWidth="3.5" 
        />

        {/* Visor Glint / Reflection */}
        <ellipse 
          cx="66" 
          cy="38" 
          rx="10" 
          ry="6" 
          fill="rgba(255, 255, 255, 0.75)" 
        />
        <circle 
          cx="54" 
          cy="45" 
          r="2.5" 
          fill="rgba(255, 255, 255, 0.4)" 
        />

        {/* Visor Gradients */}
        <defs>
          <linearGradient id="visorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

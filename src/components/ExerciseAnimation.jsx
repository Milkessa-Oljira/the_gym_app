import React from 'react';

export default function ExerciseAnimation({ exerciseId }) {
  // Shared colors for consistency
  const colors = {
    brand: '#3b82f6', // Bright neon blue
    brandGlow: '#60a5fa',
    base: '#334155',  // Dark slate for static parts
    body: '#cbd5e1',  // Light slate for user body
  };

  const commonProps = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 100 100",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const renderAnimation = () => {
    switch (exerciseId) {
      case '1': // Incline Dumbbell Bench Press
        return (
          <svg {...commonProps}>
            {/* Bench */}
            <path d="M 10 90 L 40 90 L 80 40" stroke={colors.base} strokeWidth="6" />
            {/* Arms / Dumbbells */}
            <g stroke={colors.brand} strokeWidth="8">
              <line x1="60" y1="50" x2="60" y2="20">
                <animate attributeName="y2" values="20; 50; 20" dur="2.5s" repeatCount="indefinite" />
              </line>
              <circle cx="60" cy="20" r="4" fill={colors.brandGlow}>
                <animate attributeName="cy" values="20; 50; 20" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        );
      case '2': // Overhead Shoulder Press
        return (
          <svg {...commonProps}>
            {/* Body */}
            <line x1="50" y1="90" x2="50" y2="40" stroke={colors.body} strokeWidth="6" />
            <circle cx="50" cy="30" r="6" stroke={colors.body} strokeWidth="4" />
            {/* Dumbbells pushing up */}
            <g stroke={colors.brand} strokeWidth="6">
              <line x1="30" y1="50" x2="30" y2="10">
                <animate attributeName="y2" values="10; 45; 10" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y1" values="50; 45; 50" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="70" y1="50" x2="70" y2="10">
                <animate attributeName="y2" values="10; 45; 10" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y1" values="50; 45; 50" dur="2s" repeatCount="indefinite" />
              </line>
            </g>
          </svg>
        );
      case '3': // Chest Dips
        return (
          <svg {...commonProps}>
            {/* Dip Bars */}
            <line x1="20" y1="60" x2="80" y2="60" stroke={colors.base} strokeWidth="8" />
            <line x1="20" y1="60" x2="20" y2="90" stroke={colors.base} strokeWidth="8" />
            <line x1="80" y1="60" x2="80" y2="90" stroke={colors.base} strokeWidth="8" />
            {/* Body going down and up */}
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 -20; 0 20; 0 -20" dur="2.5s" repeatCount="indefinite" />
              <line x1="50" y1="40" x2="50" y2="80" stroke={colors.brand} strokeWidth="8" />
              <circle cx="50" cy="30" r="8" stroke={colors.brand} strokeWidth="4" fill={colors.brandGlow} />
            </g>
          </svg>
        );
      case '4': // Lateral Raises
        return (
          <svg {...commonProps}>
            {/* Body */}
            <line x1="50" y1="30" x2="50" y2="90" stroke={colors.body} strokeWidth="6" />
            {/* Left Arm */}
            <line x1="50" y1="40" x2="20" y2="40" stroke={colors.brand} strokeWidth="6">
              <animateTransform attributeName="transform" type="rotate" values="0 50 40; -70 50 40; 0 50 40" dur="2s" repeatCount="indefinite" />
            </line>
            {/* Right Arm */}
            <line x1="50" y1="40" x2="80" y2="40" stroke={colors.brand} strokeWidth="6">
              <animateTransform attributeName="transform" type="rotate" values="0 50 40; 70 50 40; 0 50 40" dur="2s" repeatCount="indefinite" />
            </line>
          </svg>
        );
      case '5': // Plank
        return (
          <svg {...commonProps}>
            {/* Floor */}
            <line x1="10" y1="80" x2="90" y2="80" stroke={colors.base} strokeWidth="4" />
            {/* Body */}
            <line x1="20" y1="75" x2="80" y2="65" stroke={colors.brand} strokeWidth="8">
              <animate attributeName="stroke" values={`${colors.brand}; ${colors.brandGlow}; ${colors.brand}`} dur="1.5s" repeatCount="indefinite" />
            </line>
            {/* Core tension pulse */}
            <circle cx="50" cy="70" r="15" fill={colors.brand} opacity="0.2">
              <animate attributeName="opacity" values="0.1; 0.4; 0.1" dur="1s" repeatCount="indefinite" />
              <animate attributeName="r" values="10; 20; 10" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
      case '6': // Russian Twists
        return (
          <svg {...commonProps}>
            <path d="M 20 80 Q 50 90 80 80" stroke={colors.base} strokeWidth="4" />
            <line x1="50" y1="80" x2="50" y2="40" stroke={colors.body} strokeWidth="8" />
            {/* Twisting Weight */}
            <circle cx="30" cy="60" r="8" fill={colors.brand}>
              <animateTransform attributeName="transform" type="translate" values="0 0; 40 0; 0 0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
      case '7': // Hanging Leg Raises
        return (
          <svg {...commonProps}>
             {/* Bar */}
             <line x1="30" y1="20" x2="70" y2="20" stroke={colors.base} strokeWidth="6" />
             {/* Torso */}
             <line x1="50" y1="20" x2="50" y2="60" stroke={colors.body} strokeWidth="6" />
             {/* Legs */}
             <line x1="50" y1="60" x2="50" y2="90" stroke={colors.brand} strokeWidth="6">
               <animateTransform attributeName="transform" type="rotate" values="0 50 60; 90 50 60; 0 50 60" dur="2s" repeatCount="indefinite" />
             </line>
          </svg>
        );
      case '8': // Barbell Deadlifts
        return (
          <svg {...commonProps}>
            {/* Body */}
            <line x1="50" y1="80" x2="50" y2="40" stroke={colors.body} strokeWidth="6" />
            {/* Barbell moving floor to waist */}
            <line x1="30" y1="80" x2="70" y2="80" stroke={colors.brand} strokeWidth="6">
              <animate attributeName="y1" values="85; 50; 85" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="85; 50; 85" dur="3s" repeatCount="indefinite" />
            </line>
            <circle cx="25" cy="80" r="8" fill={colors.brand}>
              <animate attributeName="cy" values="85; 50; 85" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="75" cy="80" r="8" fill={colors.brand}>
              <animate attributeName="cy" values="85; 50; 85" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
      case '9': // Pull-ups
        return (
          <svg {...commonProps}>
            {/* Pullup bar */}
            <line x1="20" y1="20" x2="80" y2="20" stroke={colors.base} strokeWidth="8" />
            {/* Body going up and down to the bar */}
            <g stroke={colors.brand}>
              <animateTransform attributeName="transform" type="translate" values="0 40; 0 10; 0 40" dur="2.5s" repeatCount="indefinite" />
              <line x1="50" y1="20" x2="50" y2="60" strokeWidth="8" />
              <line x1="50" y1="25" x2="35" y2="10" strokeWidth="6" />
              <line x1="50" y1="25" x2="65" y2="10" strokeWidth="6" />
            </g>
          </svg>
        );
      case '10': // Bulgarian Split Squats
        return (
          <svg {...commonProps}>
            {/* Bench for back leg */}
            <rect x="70" y="60" width="20" height="30" fill={colors.base} />
            {/* Front leg */}
            <g stroke={colors.brand} strokeWidth="6">
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 20; 0 0" dur="2.5s" repeatCount="indefinite" />
              <line x1="40" y1="30" x2="40" y2="60" /> {/* Upper body */}
              <line x1="40" y1="60" x2="30" y2="90" /> {/* Front leg dropping */}
              <line x1="40" y1="60" x2="75" y2="60" /> {/* Back leg resting on bench */}
            </g>
          </svg>
        );
      case '11': // Seated Cable Rows
        return (
          <svg {...commonProps}>
            <rect x="10" y="70" width="30" height="20" fill={colors.base} />
            <line x1="80" y1="20" x2="80" y2="90" stroke={colors.base} strokeWidth="6" />
            {/* Body */}
            <line x1="30" y1="70" x2="30" y2="40" stroke={colors.body} strokeWidth="6">
               <animateTransform attributeName="transform" type="rotate" values="0 30 70; -15 30 70; 0 30 70" dur="2s" repeatCount="indefinite" />
            </line>
            {/* Cable retracting */}
            <line x1="30" y1="50" x2="80" y2="50" stroke={colors.brand} strokeWidth="4">
              <animate attributeName="x1" values="50; 30; 50" dur="2s" repeatCount="indefinite" />
            </line>
          </svg>
        );
      case '12': // Leg Extensions
        return (
          <svg {...commonProps}>
             {/* Seat */}
             <polyline points="20 40, 50 40, 50 90" stroke={colors.base} strokeWidth="8" />
             {/* Upper thigh */}
             <line x1="30" y1="35" x2="55" y2="35" stroke={colors.body} strokeWidth="8" />
             {/* Lower leg pivoting up */}
             <line x1="55" y1="35" x2="55" y2="80" stroke={colors.brand} strokeWidth="8">
               <animateTransform attributeName="transform" type="rotate" values="0 55 35; 90 55 35; 0 55 35" dur="2.5s" repeatCount="indefinite" />
             </line>
          </svg>
        );
      case '13': // Dumbbell Hammer Curls
        return (
          <svg {...commonProps}>
            {/* Upper arm straight down */}
            <line x1="50" y1="20" x2="50" y2="55" stroke={colors.body} strokeWidth="8" />
            {/* Forearm pivoting up */}
            <line x1="50" y1="55" x2="50" y2="90" stroke={colors.brand} strokeWidth="8">
              <animateTransform attributeName="transform" type="rotate" values="0 50 55; -140 50 55; 0 50 55" dur="2s" repeatCount="indefinite" />
            </line>
            {/* Dumbbell head tracking forearm visually via a simple trick: just animate the position over the expected arc, or let the parent group handle it. For simplicity, just the thick arm glowing is enough. */}
          </svg>
        );
      case '14': // Standing Calf Raises
        return (
          <svg {...commonProps}>
            <line x1="20" y1="80" x2="80" y2="80" stroke={colors.base} strokeWidth="6" />
            <g stroke={colors.brand} strokeWidth="8">
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -15; 0 0" dur="1.5s" repeatCount="indefinite" />
              <line x1="50" y1="20" x2="50" y2="80" />
            </g>
          </svg>
        );
      default:
        // Fallback generic pulse
        return (
          <svg {...commonProps}>
            <circle cx="50" cy="50" r="20" stroke={colors.brand} strokeWidth="4">
              <animate attributeName="r" values="10; 30; 10" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1; 0; 1" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
      {renderAnimation()}
    </div>
  );
}

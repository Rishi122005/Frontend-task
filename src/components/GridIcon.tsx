import * as React from 'react';

/**
 * A drag handle icon, styled as a 3x2 grid of squares.
 * It's vertically centered via a flex container in the parent.
 */
const GridIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      // Increased width and height for a larger icon
      width="32" 
      height="32" 
      // Adjusted viewBox to encompass the larger elements
      viewBox="0 0 32 32" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing ${className}`}
      // Removed these as we're defining stroke on rects
      // strokeWidth="2" 
      // strokeLinecap="round"
      // strokeLinejoin="round"
    >
      {/* 3x2 grid of squares (rectangles) */}
      {/* Adjusted x, y, width, height, and added stroke */}
      <rect x="8" y="6" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="16" y="6" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="8" y="14" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="16" y="14" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="8" y="22" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
      <rect x="16" y="22" width="4" height="4" fill="currentColor" stroke="currentColor" strokeWidth="2" rx="1" ry="1"/>
    </svg>
  );
};

export default GridIcon;
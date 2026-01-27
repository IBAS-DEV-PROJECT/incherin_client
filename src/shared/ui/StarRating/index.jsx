import React, { useState } from 'react';

export const StarRating = ({ rating, onRate }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        const isHighlighted = star <= (hoveredStar || rating);
        const isHovered = hoveredStar !== null && star <= hoveredStar;
        
        return (
          <span 
            key={star} 
            onClick={() => onRate && onRate(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            style={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s, opacity 0.2s',
              display: 'inline-block',
              transform: isHovered ? 'scale(1.2)' : 'scale(1)',
              opacity: isHovered ? 1 : 0.8
            }}
          >
            {isHighlighted ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

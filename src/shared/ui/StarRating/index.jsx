import React from 'react';

export const StarRating = ({ rating, onRate }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => onRate && onRate(star)}>
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

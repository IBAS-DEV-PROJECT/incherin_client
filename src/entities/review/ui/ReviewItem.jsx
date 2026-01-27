import React from 'react';
import { formatDate } from '@shared/lib/date';
import { StarRating } from '@shared/ui/StarRating';

export const ReviewItem = ({ review }) => {
  if (!review) return null;

  const { nickname, createdAt, content, rating } = review;
  const displayDate = formatDate(createdAt);
  const numericRating = Number(rating);
  const ratingValue = Number.isFinite(numericRating) ? numericRating : 0;

  return (
    <article
      style={{
        backgroundColor: '#f7f9fc',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid #e3e8f5',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '16px', color: '#1b3a7c' }}>
          {nickname}
        </span>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>
          {displayDate}
        </span>
      </header>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ color: '#FFB400', fontSize: '20px', lineHeight: 1 }}>
          <StarRating rating={ratingValue} />
        </div>
        <span style={{ fontSize: '14px', color: '#4b5563', fontWeight: 600 }}>
          {ratingValue.toFixed(1)} / 5
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: '15px',
          lineHeight: '22px',
          color: '#1f2933',
          whiteSpace: 'pre-wrap',
        }}
      >
        {content}
      </p>
    </article>
  );
};

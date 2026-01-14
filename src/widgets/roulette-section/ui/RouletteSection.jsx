import React from 'react';
import { Roulette } from '@features/roulette/play/ui/Roulette';

export const RouletteSection = ({ onCategoryChange }) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '50px 24px 60px',
        marginTop: '-28px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
        }}
      >
        <Roulette onCategoryChange={onCategoryChange} />
      </div>
    </div>
  );
};

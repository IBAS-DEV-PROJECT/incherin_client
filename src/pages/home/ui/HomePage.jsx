import React from 'react';
import { HomeBanner } from '@widgets/home-banner';
import { RouletteSection } from '@widgets/roulette-section';

const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f4fb' }}>
      <HomeBanner />
      <RouletteSection />
    </div>
  );
};

export default HomePage;

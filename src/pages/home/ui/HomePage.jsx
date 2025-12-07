import React from 'react';
import { Header } from '@widgets/header';
import { HomeBanner } from '@widgets/home-banner'; // 새로 만든 위젯 import
import { RouletteSection } from '@widgets/roulette-section';

const HomePage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />       {/* 공통 헤더 */}
      <HomeBanner />   {/* 메인 전용 배너 */}
      <RouletteSection />
    </div>
  );
};

export default HomePage;
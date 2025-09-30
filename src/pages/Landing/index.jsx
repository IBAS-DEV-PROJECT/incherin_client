// --- 라이브러리 ---
import React from 'react';

// --- 내부 (현재) ---
import { Button } from '../../components/common';
import { ROUTES } from '../../routes/routeTable';
import {
  HeroSection,
  RankingSection,
  RecommendSection,
  FeatureSection,
  FavoriteSection,
  PromoSection,
  MenuCategorySection,
} from '../../components/Landing';

// --- 페이지 엔트리 (Default Export 허용) ---
export default function Home() {
  return (
    <main>
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 랭킹 섹션 */}
      <RankingSection />

      {/* 추천 섹션 */}
      <RecommendSection />

      {/* 기능 섹션 */}
      <FeatureSection />

      {/* 찜한 식당 섹션 */}
      <FavoriteSection isAuthenticated={true} />

      {/* 메뉴 카테고리 섹션 */}
      <MenuCategorySection />

      <PromoSection />
    </main>
  );
}

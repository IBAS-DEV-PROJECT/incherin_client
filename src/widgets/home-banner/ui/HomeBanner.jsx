import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryTab } from '@entities/category/ui/CategoryTab';
import { CATEGORIES } from '@entities/category/data/categories';
import induckLogo from '@shared/assets/image/induck-line-logo.png';
import blueBg from '@shared/assets/image/blue.png';

export const HomeBanner = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryValue) => {
    setActiveCategory(categoryValue);
    navigate(`/shops?c=${encodeURIComponent(categoryValue)}`);
  };

  return (
    <div style={{
      backgroundImage: `url(${blueBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '80px 24px 3px',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '40vh'
    }}>
      {/* 캐릭터 로고 */}
      <img 
        src={induckLogo} 
        alt="Character" 
        style={{
          position: 'absolute', right: '9%', bottom: '5%', height: '260px',
          opacity: 0.9, filter: 'brightness(0) invert(1)', pointerEvents: 'none', zIndex: 1
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h1 style={{ fontSize: '50px', fontWeight: 800, marginBottom: '14px', textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
          뭐 먹을지 고민되시나요?
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.95, marginBottom: '38px', fontWeight: 400 }}>
          인하대/인하공전 학생들이 직접 공유하고 솔직하게 리뷰하는 인슐랭 가이드입니다:)
        </p>

        {/* 카테고리 탭 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {CATEGORIES.map((category) => (
            <CategoryTab
              key={category.value}
              label={category.label}
              isActive={activeCategory === category.value}
              onClick={() => handleCategoryClick(category.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

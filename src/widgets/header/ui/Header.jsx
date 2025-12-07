// src/widgets/header/ui/Header.jsx
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryTab } from '@entities/category';
import { CATEGORIES } from '@entities/category/data/categories';
import logo2 from '@shared/assets/image/logo2.png';
import induckLogo from '@shared/assets/image/induck-line-logo.png';
import blueBg from '@shared/assets/image/blue.png';

const Header = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = useCallback((category) => {
    setActiveCategory(category);
    navigate(`/shops?c=${encodeURIComponent(category)}`);
  }, [navigate]);

  return (
    <>
      {/* 상단 고정 로고 */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '14px 40px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
      }}>
        <img 
          src={logo2} 
          alt="INCHELIN" 
          style={{
            height: '42px',
            width: 'auto'
          }}
        />
      </div>

      {/* 히어로 + 카테고리 */}
      <div style={{
        backgroundImage: `url(${blueBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '80px 24px 3px',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '40vh'
      }}>
        {/* 오른쪽 아래 로고 */}
        <img 
          src={induckLogo} 
          alt="INCHELIN Character" 
          style={{
            position: 'absolute',
            right: '9%',
            bottom: '5%',
            height: '260px',
            opacity: 0.9,
            filter: 'brightness(0) invert(1)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: '50px',
            fontWeight: 800,
            marginBottom: '14px',
            lineHeight: '1.2',
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}>
            뭐 먹을지 고민되시나요?
          </h1>

          <p style={{
            fontSize: '18px',
            opacity: 0.95,
            marginBottom: '38px',
            lineHeight: '1.7',
            fontWeight: 400
          }}>
            인하대/인하공전 학생들이 직접 공유하고 솔직하게 리뷰하는 인슐랭 가이드입니다:)
          </p>

          {/* 👇 카테고리 버튼 영역 (CategoryTab 컴포넌트 사용) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center'
          }}>
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
    </>
  );
};

export default Header;

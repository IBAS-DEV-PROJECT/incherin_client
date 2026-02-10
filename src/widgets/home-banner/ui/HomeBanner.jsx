import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import induckLogo from '@shared/assets/image/induck-line-logo.png';
import blueBg from '@shared/assets/image/blue.png';
import styled from '@emotion/styled';
import { media } from '@shared/config/media';
import { HomeCategoryTab } from '@widgets/category-tabs';

// 배경 섹션
const BackgroundSection = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  padding: 80px 24px 3px;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  min-height: 300px;

  ${media.tablet} {
    min-height: 380px;
    padding: 30x 16px 20px;
  }
  ${media.mobile} {
    min-height: 360px;
    padding: 30x 16px 20px;
  }
  ${media.mobileS} {
    min-height: 360px;
    padding: 68px 16px 20px;
  }
`;

// 제목
const BannerTitle = styled.h1`
  font-size: 50px;
  font-weight: 800;
  margin-bottom: 14px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);

  ${media.mobile} {
    font-size: 36px;
    margin-bottom: 10px;
  }
  ${media.mobileS} {
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

// 설명 문구
const BannerDescription = styled.p`
  font-size: 18px;
  opacity: 0.95;
  margin-bottom: 38px;
  font-weight: 400;
  line-height: 1.4;

  ${media.mobile} {
    font-size: 14px;
    margin-bottom: 24px;
    word-break: keep-all;
  }
  ${media.mobileS} {
    font-size: 14px;
    margin-bottom: 24px;
    word-break: keep-all;
  }
`;

// 로고 이미지
const LogoImage = styled.img`
  position: absolute;
  right: 8%;
  bottom: 0%;
  height: 260px;
  filter: brightness(0) invert(1);
  pointer-events: none;
  z-index: 1;

  ${media.tablet} {
    height: 200px;
    right: 0%;
  }
  ${media.mobile} {
    height: 190px;
    right: 5%;
  }
  ${media.mobileS} {
    height: 190px;
    right: 5%;
  }
`;

export const HomeBanner = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = categoryValue => {
    setActiveCategory(categoryValue);
    navigate(`/shops?c=${encodeURIComponent(categoryValue)}`);
  };

  return (
    <BackgroundSection bg={blueBg}>
      <LogoImage src={induckLogo} alt="Character" />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <BannerTitle>뭐 먹을지 고민되시나요?</BannerTitle>

        <BannerDescription>
          인하대/인하공전 학생들이 직접 공유하고 솔직하게 리뷰하는 인슐랭
          가이드입니다:)
        </BannerDescription>

        <HomeCategoryTab
          activeCategory={activeCategory}
          onSelect={handleCategoryClick}
        />
      </div>
    </BackgroundSection>
  );
};

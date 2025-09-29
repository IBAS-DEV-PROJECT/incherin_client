// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (현재) ---
import { Grid, GRID_VARIANTS } from '../../common';

// --- 스타일 ---
const StyledBand = styled.section(({ theme }) => ({
  width: '100%',
  padding: '56px 0',
  background:
    'linear-gradient(180deg, rgba(212,231,250,0.35) 0%, rgba(212,231,250,0.15) 100%)',
}));

const StyledSection = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: 1120,
  margin: '0 auto',
  padding: '0 24px',
  boxSizing: 'border-box',
}));

const StyledSectionTitle = styled.h2(({ theme }) => ({
  margin: '0 0 40px',
  fontSize: 32,
  fontWeight: 600,
  color: theme.colors.black,
  textAlign: 'center',
}));

const StyledFeatureIcon = styled.div(({ theme }) => ({
  width: 88,
  height: 88,
  margin: '0 auto 16px',
  borderRadius: '24px',
  backgroundColor: theme.colors.lightBlue,
  boxShadow: '0 20px 40px rgba(39, 80, 155, 0.25)',
}));

const StyledFeatureItem = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 8,
}));

const StyledFeatureTitle = styled.h3(({ theme }) => ({
  margin: '0 0 6px',
  fontSize: 22,
  fontWeight: 700,
  color: theme.colors.black,
}));

const StyledFeatureDesc = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: 14,
  color: theme.colors.darkGray,
  lineHeight: 1.6,
  whiteSpace: 'pre-line',
}));

/**
 * FeatureSection 컴포넌트
 * 기능 소개 섹션
 */
export function FeatureSection() {
  const features = [
    {
      title: '지도 탐색',
      desc: '내가 저장한 맛집들을 지도로 확인하고\n가는 길도 찾을 수 있어요.',
    },
    {
      title: '메뉴 탐색',
      desc: '먹고 싶은 메뉴를 검색하여\n한 눈에 비교하고 골라볼 수 있어요.',
    },
    {
      title: '가격 비교',
      desc: '지갑 사정에 맞는 가격대를 찾아\n가성비 좋은 맛집으로 향할 수 있어요.',
    },
    {
      title: '리뷰 작성',
      desc: '인하대학교 학생들이 직접 선정한\n맛집을 공유하고 저장할 수 있습니다!',
    },
  ];
  return (
    <StyledBand>
      <StyledSection>
        <StyledSectionTitle>인슐랭으로 무엇을 할 수 있나요?</StyledSectionTitle>
        <Grid
          variant={GRID_VARIANTS.FEATURE}
          style={{
            display: 'grid',
            gap: 32,
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {features.map(item => (
            <StyledFeatureItem key={item.title}>
              <StyledFeatureIcon />
              <StyledFeatureTitle>{item.title}</StyledFeatureTitle>
              <StyledFeatureDesc>{item.desc}</StyledFeatureDesc>
            </StyledFeatureItem>
          ))}
        </Grid>
      </StyledSection>
    </StyledBand>
  );
}

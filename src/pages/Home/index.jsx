// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

// --- 내부 (현재) ---
import { Button } from '../../components/common';
import { ROUTES } from '../../routes/routeTable';

// --- 스타일 ---
const StyledSection = styled.section(({ theme }) => ({
  maxWidth: 1120,
  margin: '0 auto',
  padding: '48px 24px',
}));

const StyledHero = styled(StyledSection)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1.1fr 0.9fr',
  gap: 32,
  alignItems: 'center',
  backgroundColor: theme.colors.lightBlue,
  borderRadius: 16,
}));

const StyledHeroContent = styled.div(({ theme }) => ({
  padding: 32,
}));

const StyledTitle = styled.h1(({ theme }) => ({
  margin: 0,
  color: theme.colors.blue,
  fontSize: 32,
  fontWeight: 800,
  lineHeight: 1.25,
}));

const StyledSubtitle = styled.p(({ theme }) => ({
  margin: '12px 0 24px',
  color: theme.colors.black,
  ...(theme?.typography?.paragraph?.p2 || {}),
}));

const StyledCTAGroup = styled.div(() => ({
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
}));

const StyledHeroIllustration = styled.div(() => ({
  height: '100%',
  minHeight: 220,
}));

const StyledSectionTitle = styled.h2(({ theme }) => ({
  margin: '32px 0 12px',
  fontSize: 20,
  fontWeight: 700,
  color: theme.colors.black,
}));

const StyledCardGrid = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 16,
}));

const StyledCard = styled.div(({ theme }) => ({
  padding: 16,
  borderRadius: 12,
  backgroundColor: theme.colors.white,
  boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
}));

const StyledSearchBar = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 16px',
  borderRadius: 12,
  border: `1px solid ${theme.colors.darkGray}`,
  backgroundColor: theme.colors.white,
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
}));

const StyledInput = styled.input(({ theme }) => ({
  flex: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  ...(theme?.typography?.paragraph?.p2 || {}),
}));

const StyledChips = styled.div(() => ({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  marginTop: 12,
}));

const StyledChip = styled.span(({ theme }) => ({
  padding: '6px 12px',
  borderRadius: 999,
  backgroundColor: theme.colors.gray,
  color: theme.colors.black,
}));

const StyledMapPreview = styled.div(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: theme.colors.gray,
  height: 260,
  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
}));

// 오늘 많이 찾은 식당 랭킹
const StyledRankingGrid = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 12,
}));

const StyledRankingCard = styled.div(({ theme }) => ({
  height: 64,
  borderRadius: 12,
  backgroundColor: theme.colors.gray,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.black,
  fontWeight: 700,
}));

// 추천 카드 3열
const StyledRecommendGrid = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16,
}));

const StyledRecommendCard = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 12,
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledRecommendBody = styled.div(({ theme }) => ({
  padding: 16,
}));

const StyledCardImage = styled.div(({ theme }) => ({
  height: 120,
  backgroundColor: theme.colors.gray,
}));

// 기능 소개 아이콘 4개
const StyledFeatureGrid = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
  textAlign: 'center',
}));

const StyledFeatureItem = styled.div(({ theme }) => ({
  padding: 16,
}));

const StyledFeatureIcon = styled.div(({ theme }) => ({
  width: 44,
  height: 44,
  margin: '0 auto 8px',
  borderRadius: '50%',
  backgroundColor: theme.colors.gray,
}));

// 내가 찜한 식당 캐러셀 (정적)
const StyledCarousel = styled.div(() => ({
  position: 'relative',
}));

const StyledCarouselRow = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 12,
}));

const StyledCarouselBtn = styled.button(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  border: 'none',
  width: 32,
  height: 32,
  borderRadius: 16,
  cursor: 'pointer',
  backgroundColor: theme.colors.white,
  boxShadow: '0 1px 6px rgba(0,0,0,0.12)',
}));

const StyledCarouselPrev = styled(StyledCarouselBtn)(() => ({ left: -8 }));
const StyledCarouselNext = styled(StyledCarouselBtn)(() => ({ right: -8 }));

// 메뉴 카테고리 원형 리스트
const StyledCircleRow = styled.div(() => ({
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
}));

const StyledCircle = styled.div(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: theme.colors.gray,
}));

// 프로모 배너 / 하단 CTA
const StyledPromo = styled(StyledSection)(({ theme }) => ({
  backgroundColor: theme.colors.lightBlue,
  borderRadius: 16,
}));

// --- 페이지 엔트리 (Default Export 허용) ---
export default function Home() {
  const theme = useTheme();

  return (
    <main>
      <StyledHero>
        <StyledHeroContent>
          <StyledTitle>가까운 맛집을 한눈에, 인슐랭</StyledTitle>
          <StyledSubtitle>
            지도로 빠르게 찾고, 리뷰로 정확하게 선택하세요.
          </StyledSubtitle>
          <StyledCTAGroup>
            <Link to={ROUTES.MAP}>
              <Button>지도로 보기</Button>
            </Link>
            <Link to={ROUTES.STORES}>
              <Button variant="subsidiary">가게 목록</Button>
            </Link>
          </StyledCTAGroup>
        </StyledHeroContent>

        <StyledHeroIllustration />
      </StyledHero>

      <StyledSection>
        <StyledSectionTitle>빠른 검색</StyledSectionTitle>
        <StyledSearchBar>
          <StyledInput placeholder="지역, 메뉴, 가게명으로 검색" />
          <Button variant="subsidiary">검색</Button>
        </StyledSearchBar>
        <StyledChips>
          {['한식', '분식', '카페', '디저트', '치킨', '중식'].map(c => (
            <StyledChip key={c}>{c}</StyledChip>
          ))}
        </StyledChips>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>오늘 많이 찾은 식당</StyledSectionTitle>
        <StyledRankingGrid>
          {[1, 2, 3, 4].map(i => (
            <StyledRankingCard key={i}>{i}</StyledRankingCard>
          ))}
        </StyledRankingGrid>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>주변 맛집 지도</StyledSectionTitle>
        <StyledMapPreview />
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>추천 카테고리</StyledSectionTitle>
        <StyledRecommendGrid>
          {[0, 1, 2].map(i => (
            <StyledRecommendCard key={i}>
              <StyledCardImage />
              <StyledRecommendBody>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>
                  데이트/가성비/가심비 추천
                </div>
                <div style={{ marginBottom: 12 }}>
                  상황에 맞는 식당을 골라보세요
                </div>
                <Button variant="subsidiary">바로 보러가기</Button>
              </StyledRecommendBody>
            </StyledRecommendCard>
          ))}
        </StyledRecommendGrid>
        <div style={{ marginTop: 16 }}>
          <Link to={ROUTES.STORES}>
            <Button variant="secondary">더 보기</Button>
          </Link>
        </div>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>인슐랭으로 무엇을 할 수 있나요?</StyledSectionTitle>
        <StyledFeatureGrid>
          {['지도 탐색', '회원 혜택', '가게 등록', '리뷰 작성'].map(t => (
            <StyledFeatureItem key={t}>
              <StyledFeatureIcon />
              <div>{t}</div>
            </StyledFeatureItem>
          ))}
        </StyledFeatureGrid>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>내가 찜한 식당</StyledSectionTitle>
        <StyledCarousel>
          <StyledCarouselPrev>{'<'}</StyledCarouselPrev>
          <StyledCarouselRow>
            {[0, 1, 2, 3].map(i => (
              <StyledCard key={i}>가게 {i + 1}</StyledCard>
            ))}
          </StyledCarouselRow>
          <StyledCarouselNext>{'>'}</StyledCarouselNext>
        </StyledCarousel>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>메뉴 카테고리</StyledSectionTitle>
        <StyledCircleRow>
          {[0, 1, 2, 3, 4].map(i => (
            <StyledCircle key={i} />
          ))}
        </StyledCircleRow>
      </StyledSection>

      <StyledPromo>
        <StyledSectionTitle>가게 정보를 등록해 보세요</StyledSectionTitle>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button>가게 정보 입력</Button>
          <Button variant="subsidiary">가게 등록</Button>
          <Button variant="secondary">리뷰 작성</Button>
        </div>
      </StyledPromo>
    </main>
  );
}

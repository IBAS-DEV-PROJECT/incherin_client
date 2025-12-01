// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from '@untitledui/icons';

// --- 내부 (현재) ---
import { Card, Grid, GRID_VARIANTS, Button } from '@shared/ui';
import { ROUTES } from '@app/routes/routeTable';
import { useNavigate } from 'react-router-dom';
import { MarkerPin01 } from '@untitledui/icons';
import { useTheme } from '@emotion/react';

// --- 스타일 ---
const StyledSection = styled.section(({ theme }) => ({
  maxWidth: 1120,
  margin: '0 auto',
  padding: '48px 24px',
}));

const StyledSectionTitle = styled.h2(({ theme }) => ({
  margin: '0 0 28px',
  fontSize: 28,
  fontWeight: 600,
  color: theme.colors.black,
  textAlign: 'center',
}));

const StyledCarousel = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
  width: '100%',
  boxSizing: 'border-box',
}));

const StyledCarouselBtn = styled.button(({ theme }) => ({
  border: 'none',
  width: 64,
  height: 64,
  borderRadius: 32,
  flex: '0 0 64px',
  aspectRatio: '1 / 1',
  boxSizing: 'border-box',
  cursor: 'pointer',
  backgroundColor: theme.colors.blue,
  color: theme.colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 10px 24px rgba(0,0,0,0.15)',
}));

const StyledCarouselPrev = styled(StyledCarouselBtn)(() => ({}));
const StyledCarouselNext = styled(StyledCarouselBtn)(() => ({}));

const StyledTrack = styled.div(() => ({
  flex: 1,
  maxWidth: 1120,
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))',
  gap: 24,
  alignItems: 'stretch',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 0,
  boxShadow: 'none',
  minWidth: 210,
}));

const StyledThumb = styled.div(({ theme }) => ({
  width: '100%',
  aspectRatio: '1 / 1',
  backgroundColor: theme.colors.gray,
  borderRadius: 12,
}));

const StyledMeta = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
}));

const StyledMenuName = styled.div(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  color: theme.colors.black,
}));

const StyledStoreName = styled.div(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.blue,
}));

const StyledPriceRange = styled.div(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: theme.colors.darkGray,
}));

const StyledStoreRow = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
}));

const StyledPin = styled(MarkerPin01)(({ theme }) => ({
  color: theme.colors.blue,
}));

/**
 * FavoriteSection 컴포넌트
 * 내가 찜한 식당 섹션
 */
export function FavoriteSection({ isAuthenticated = false, items = [] }) {
  const navigate = useNavigate();

  // 로그인 여부에 따라 렌더링 여부 결정
  if (!isAuthenticated) return null;

  const data = items.length
    ? items
    : [
        { id: 1, menu: '메뉴명', store: '가게 이름', price: '₩1,000 ~ 3,000' },
        { id: 2, menu: '메뉴명', store: '가게 이름', price: '₩1,000 ~ 3,000' },
        { id: 3, menu: '메뉴명', store: '가게 이름', price: '₩1,000 ~ 3,000' },
        { id: 4, menu: '메뉴명', store: '가게 이름', price: '₩1,000 ~ 3,000' },
      ];

  return (
    <StyledSection>
      <StyledSectionTitle>내가 찜한 식당</StyledSectionTitle>
      <StyledCarousel>
        <StyledCarouselPrev aria-label="prev">
          <ChevronLeft />
        </StyledCarouselPrev>
        <StyledTrack>
          {data.map(item => (
            <StyledCard key={item.id}>
              <StyledThumb />
              <StyledMeta>
                <StyledMenuName>{item.menu}</StyledMenuName>
                <StyledStoreRow>
                  <StyledPin size={16} />
                  <StyledStoreName>{item.store}</StyledStoreName>
                </StyledStoreRow>
                <StyledPriceRange>{item.price}</StyledPriceRange>
              </StyledMeta>
              <Button
                variant="primary"
                active
                style={{
                  marginTop: 8,
                  height: 48,
                  borderRadius: 8,
                }}
                onClick={() => navigate(ROUTES.STORE_DETAIL(item.id))}
              >
                자세히 보기
              </Button>
            </StyledCard>
          ))}
        </StyledTrack>
        <StyledCarouselNext aria-label="next">
          <ChevronRight />
        </StyledCarouselNext>
      </StyledCarousel>
    </StyledSection>
  );
}

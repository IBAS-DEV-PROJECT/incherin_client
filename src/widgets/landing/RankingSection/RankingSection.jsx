// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Star01, ChevronRight } from '@untitledui/icons';

// --- 내부 (부모) ---
import { Card, Grid, Button, Badge, GRID_VARIANTS } from '@shared/ui';
import { ROUTES } from '@app/routes/routeTable';
import { applyPopularFilterAtom } from '@features/store-filter/model/filterStore';

// --- 에셋 ---
import FoodImg from '@shared/assets/image/food.webp';

// --- 스타일 ---
const StyledSection = styled.section(({ theme }) => ({
  maxWidth: 1120,
  margin: '0 auto',
  padding: '48px 24px',
}));

const StyledSectionTitle = styled.h2(({ theme }) => ({
  margin: '0 0 24px',
  fontSize: 28,
  fontWeight: 700,
  color: theme.colors.black,
  textAlign: 'center',
}));

const StyledRankingCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 240,
  padding: 0,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',

  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const StyledImage = styled.img(() => ({
  width: '100%',
  height: 240,
  objectFit: 'cover',
  borderRadius: '12px 12px 0 0',
}));

const StyledRankBadge = styled.div(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  backgroundColor: theme.colors.white,
  color: theme.colors.blue,
  padding: '8px 12px',
  borderRadius: '0 16px 0 0',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const StyledRankingItem = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 12,
}));

const StyledStoreName = styled.h3(({ theme }) => ({
  margin: 0,
  fontSize: 16,
  fontWeight: 700,
  color: theme.colors.black,
  textAlign: 'left',
}));

const StyledRatingContainer = styled.div(() => ({
  alignSelf: 'flex-start',
}));

const StyledMoreButton = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 24,
}));

/**
 * RankingSection 컴포넌트
 * 오늘 많이 찾은 식당 랭킹 섹션
 */
export function RankingSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [, applyPopularFilter] = useAtom(applyPopularFilterAtom);

  // 더보기 버튼 클릭 핸들러
  const handleMoreClick = () => {
    // 인기순 필터 적용
    applyPopularFilter();
    // 가게 목록 페이지로 이동
    navigate(ROUTES.STORES);
  };

  const rankingData = [
    { rank: 1, name: '백소정 인하대후문점', rating: '4.8/5' },
    { rank: 2, name: '백소정 인하대후문점', rating: '4.8/5' },
    { rank: 3, name: '백소정 인하대후문점', rating: '4.8/5' },
    { rank: 4, name: '백소정 인하대후문점', rating: '4.8/5' },
  ];

  return (
    <StyledSection>
      <StyledSectionTitle>오늘 많이 찾은 식당</StyledSectionTitle>
      <Grid
        variant={GRID_VARIANTS.RANKING}
        gap={16}
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {rankingData.map(item => (
          <StyledRankingItem key={item.rank}>
            <StyledRankingCard padding="0">
              <StyledImage src={FoodImg} alt="음식 이미지" />
              <StyledRankBadge>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 600,
                    color: theme.colors.blue,
                  }}
                >
                  {item.rank}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: theme.colors.black,
                  }}
                >
                  위
                </span>
              </StyledRankBadge>
            </StyledRankingCard>
            <StyledStoreName>{item.name}</StyledStoreName>
            <StyledRatingContainer>
              <Badge
                variant="info"
                size="large"
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <Star01 size={16} solid />
                <span>{item.rating}</span>
              </Badge>
            </StyledRatingContainer>
          </StyledRankingItem>
        ))}
      </Grid>
      <StyledMoreButton>
        <Button
          variant="primary"
          onClick={handleMoreClick}
          style={{
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '20px',
          }}
        >
          더 보기 <ChevronRight size={24} />
        </Button>
      </StyledMoreButton>
    </StyledSection>
  );
}

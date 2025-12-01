// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from '@untitledui/icons';
import { useAtom } from 'jotai';

// --- 내부 ---
import { Button, Card } from '@shared/ui';
import { ROUTES } from '@app/routes/routeTable';
import {
  searchQueryAtom,
  searchTypeAtom,
  isSearchingAtom,
} from '@features/store-search/model/searchStore';

// --- 에셋 ---
import FoodImg from '@shared/assets/image/food.webp';

// ---------- 스타일 ----------

const Section = styled.section({
  maxWidth: 1120,
  margin: '0 auto',
  padding: '48px 24px',
  display: 'grid',
  gap: 24,
});

const RowCard = styled(Card)(({ $imagePosition, theme }) => ({
  padding: 0,
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'stretch',
  position: 'relative',

  '@media (min-width: 768px)': {
    gridTemplateColumns: $imagePosition === 'left' ? '55% 45%' : '45% 55%',
    '::before': {
      content: '""',
      position: 'absolute',
      height: '100%',
      width: 2,
      backgroundColor: theme.colors.gray,
      left: $imagePosition === 'left' ? '55%' : '45%',
      transform: 'translateX(-0.5px)',
      pointerEvents: 'none',
      zIndex: 1,
    },
  },
}));

const StyledImageWrap = styled.div(({ $imagePosition }) => ({
  '@media (min-width: 768px)': {
    order: $imagePosition === 'left' ? 0 : 1,
  },
}));

const StyledContentWrap = styled.div(({ $imagePosition }) => ({
  display: 'flex',
  '@media (min-width: 768px)': {
    order: $imagePosition === 'left' ? 1 : 0,
  },
}));

const StyledContent = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 24,
  textAlign: 'center',
  justifyContent: 'space-between',
  minHeight: 220,
  '& [data-cta="true"]': {
    display: 'inline-flex',
    alignSelf: 'center',
    marginTop: 12,
  },
  '@media (min-width: 768px)': {
    padding: 48,
    textAlign: 'left',
    justifyContent: 'flex-start',
    '& [data-cta="true"]': {
      alignSelf: 'flex-start',
      marginTop: 'auto',
    },
  },
}));

const StyledTitle = styled.h3({
  margin: 0,
  lineHeight: 1.2,
  fontWeight: 800,
  fontSize: 28,
});

const StyledTitleLine1 = styled.span(({ theme }) => ({
  display: 'block',
  color: theme.colors.black,
}));

const StyledTitleLine2 = styled.span(({ theme }) => ({
  display: 'block',
  color: theme.colors.blue,
}));

const StyledDesc = styled.p(({ theme }) => ({
  margin: 0,
  color: theme.colors.darkGray,
  fontSize: 16,
  lineHeight: 1.6,
}));

const StyledImage = styled.img({
  width: '100%',
  height: 220,
  objectFit: 'cover',
  display: 'block',
  '@media (min-width: 768px)': {
    height: '100%',
  },
});

// ---------- 컴포넌트 ----------
export function RecommendSection() {
  const navigate = useNavigate();
  const [, setSearchQuery] = useAtom(searchQueryAtom);
  const [, setSearchType] = useAtom(searchTypeAtom);
  const [, setIsSearching] = useAtom(isSearchingAtom);

  const handleSearchClick = keyword => {
    setSearchType('stores');
    setSearchQuery(keyword);
    setIsSearching(true);
    navigate(ROUTES.STORES);
  };

  const recommendData = [
    {
      titleLine1: '데이트하기 좋은',
      titleLine2: '분위기있는 맛집',
      description:
        '썸남, 썸녀와, 연인과 분위기를 즐기며 맛있는 식사를 하고 싶다면?',
      imagePosition: 'right',
    },
    {
      titleLine1: '혼밥하기 좋은',
      titleLine2: '가성비 쩌는 맛집',
      description:
        '배는 채우고 싶고, 맛없는건 먹기 싫고, 비싼 음식은 부담된다면?',
      imagePosition: 'left',
    },
    {
      titleLine1: '데이트하기 좋은',
      titleLine2: '분위기있는 맛집',
      description:
        '썸남, 썸녀와, 연인과 분위기를 즐기며 맛있는 식사를 하고 싶다면?',
      imagePosition: 'right',
    },
  ];

  return (
    <Section>
      {recommendData.map((item, idx) => (
        <RowCard key={idx} $imagePosition={item.imagePosition}>
          <StyledImageWrap $imagePosition={item.imagePosition}>
            <StyledImage src={FoodImg} alt="음식 이미지" />
          </StyledImageWrap>

          <StyledContentWrap $imagePosition={item.imagePosition}>
            <StyledContent>
              <StyledTitle>
                <StyledTitleLine1>{item.titleLine1}</StyledTitleLine1>
                <StyledTitleLine2>{item.titleLine2}</StyledTitleLine2>
              </StyledTitle>
              <StyledDesc>{item.description}</StyledDesc>

              <Button
                data-cta="true"
                variant="primary"
                onClick={() =>
                  handleSearchClick(`${item.titleLine1} ${item.titleLine2}`)
                }
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 14,
                  borderRadius: 8,
                  padding: '10px 14px',
                }}
              >
                비슷한 키워드로 맛집 찾기 <ChevronRight size={16} />
              </Button>
            </StyledContent>
          </StyledContentWrap>
        </RowCard>
      ))}
    </Section>
  );
}

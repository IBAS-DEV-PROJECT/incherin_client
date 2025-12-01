// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useTheme } from '@emotion/react';
import { Map01, LayoutAlt04, MarkerPin01, SearchMd } from '@untitledui/icons';

// --- 내부 (현재) ---
import { Button, Input } from '@shared/ui';
import { ROUTES } from '@app/routes/routeTable';
import { searchStateAtom, SEARCH_TYPES } from '@features/store-search/model/searchStore';

// --- 에셋 ---
import InduckLineLogo from '@shared/assets/image/induck-line-logo.png';

// --- 스타일 ---
const StyledLandingHero = styled.section(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.colors.blue,
  color: theme.colors.white,
  position: 'relative',
}));

const StyledLandingInner = styled.div(() => ({
  maxWidth: 1120,
  margin: '0 auto',
  padding: '56px 24px 160px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 32,
  position: 'relative',
  zIndex: 1,
}));

const StyledLandingTitle = styled.h1(() => ({
  margin: 0,
  fontSize: 68,
  fontWeight: 800,
  lineHeight: 1.1,
}));

const StyledLandingSubtitle = styled.p(() => ({
  margin: '14px 0 28px',
  opacity: 0.9,
  fontSize: 18,
  fontWeight: 400,
}));

const StyledSearchCard = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.white,
  color: theme.colors.black,
  borderRadius: 16,
  boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
  overflow: 'hidden',
  width: '100%',
  maxWidth: 520,
}));

const StyledSearchTabs = styled.div(({ theme }) => ({
  display: 'flex',
  gap: 8,
  padding: '16px',
  borderBottom: `1px solid ${theme.colors.darkGray}`,
}));

const StyledSearchRow = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: 16,
}));

const StyledTabButton = styled(Button)(({ theme, $isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 14px',
  borderRadius: '10px',
  background: $isActive ? theme.colors.lightBlue : theme.colors.white,
  color: theme.colors.blue,
}));

const StyledSearchButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 14px',
  height: '52px',
  borderRadius: '10px',
  background: theme.colors.lightBlue,
  color: theme.colors.blue,

  '&:hover': {
    background: theme.colors.blue,
    color: theme.colors.white,
  },
}));

const StyledLogo = styled.img(() => ({
  width: 240,
  height: 'auto',
  display: 'block',
}));

const StyledSearchAndLogoRow = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 24,
  width: '100%',
}));

const StyledLeftAlign = styled.div(() => ({
  alignSelf: 'flex-start',
}));

const StyledBottomLogo = styled.img(() => ({
  position: 'absolute',
  bottom: 0,
  left: '70%',
  transform: 'translateX(-50%)',
  width: 260,
  height: 'auto',
  pointerEvents: 'none',
  zIndex: 0,
}));

/**
 * HeroSection 컴포넌트
 * 랜딩 페이지의 메인 히어로 섹션
 */
export function HeroSection() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchState, setSearchState] = useAtom(searchStateAtom);
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState(SEARCH_TYPES.MAP);

  // 검색 실행 핸들러
  const handleSearch = () => {
    if (!searchInput.trim()) return;

    // 검색 상태 업데이트
    setSearchState({
      query: searchInput.trim(),
      type: activeTab,
      isSearching: true,
    });

    // 해당 페이지로 이동
    if (activeTab === SEARCH_TYPES.MAP) {
      navigate(ROUTES.MAP);
    } else {
      navigate(ROUTES.STORES);
    }
  };

  // 엔터키 검색
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <StyledLandingHero>
      <StyledLandingInner>
        <div>
          <StyledLandingTitle>뭐 먹을지 고민되시나요?</StyledLandingTitle>
          <StyledLandingSubtitle>
            인하대/인하공전 학생들이 직접 공유하고 솔직하게 리뷰하는 인슐랭
            가이드입니다 :D
          </StyledLandingSubtitle>
          <StyledSearchAndLogoRow>
            <StyledSearchCard>
              <StyledSearchTabs>
                {[
                  {
                    type: SEARCH_TYPES.MAP,
                    icon: <Map01 size={16} />,
                    label: '지도 탐색',
                  },
                  {
                    type: SEARCH_TYPES.MENU,
                    icon: <LayoutAlt04 size={16} />,
                    label: '메뉴 탐색',
                  },
                ].map(tab => (
                  <StyledTabButton
                    key={tab.type}
                    variant="secondary"
                    $isActive={activeTab === tab.type}
                    onClick={() => setActiveTab(tab.type)}
                  >
                    {tab.icon}
                    {tab.label}
                  </StyledTabButton>
                ))}
              </StyledSearchTabs>
              <StyledSearchRow>
                <Input
                  placeholder="가까운 식당을 찾아보세요!"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  width="88%"
                  leftIcon={
                    <MarkerPin01 size={20} style={{ display: 'block' }} solid />
                  }
                />
                <StyledSearchButton
                  variant="secondary"
                  onClick={handleSearch}
                  style={{ width: '10%', minWidth: '120px' }}
                >
                  <SearchMd size={16} />
                  &nbsp;검색하기
                </StyledSearchButton>
              </StyledSearchRow>
            </StyledSearchCard>
          </StyledSearchAndLogoRow>
        </div>
      </StyledLandingInner>
      <StyledBottomLogo src={InduckLineLogo} alt="인덕이 로고" />
    </StyledLandingHero>
  );
}

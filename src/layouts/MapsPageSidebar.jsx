/** @jsxImportSource @emotion/react */
// --- 라이브러리 (외부 모듈) ---
import React, { useState } from 'react'; // useState를 다시 import
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';

// --- 내부 모듈 (내부 파일들) ---
import heartIcon from '../assets/image/heart.png';
import layoutIcon from '../assets/image/layout.png';
import logoImage from '../assets/image/logo3.png';
import mapIcon from '../assets/image/map-01.png';
import reviewIcon from '../assets/image/review.png';
import settingsIcon from '../assets/image/settings.png';
import myPageIcon from '../assets/image/user-circle.png';
import moreIcon from '../assets/image/dots-horizontal.png';

// --- 스타일이 적용된 컴포넌트들 ---

// 사이드바 전체를 감싸는 틀
const StyledSidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 76px;
  height: 100vh;
  padding: 30px 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
  flex-shrink: 0;
  box-sizing: border-box;
`;

// 로고 이미지 스타일
const StyledLogo = styled.img`
  width: 48px;
  height: 40px;
`;

// 메뉴 버튼들을 감싸는 영역
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
`;

// 사이드바의 각 메뉴 버튼 (button으로 다시 변경)
const StyledSidebarButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 76px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;

  /* $active prop을 기준으로 스타일 적용 */
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.gray : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.blue : theme.colors.black};

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.gray : theme.colors.lightGray};
  }

  /* $active prop을 기준으로 작대기 표시 */
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 60px;
    border-radius: 2px;
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.blue : 'transparent'};
    transition: background-color 0.2s ease;
  }
`;

// 아이콘 스타일
const StyledIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ color }) => color};
  mask-image: url(${({ src }) => src});
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  transition: background-color 0.2s ease;
`;

// 메뉴 버튼의 텍스트 스타일
const StyledMenuText = styled.span`
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
`;

// 하단 설정 버튼 스타일
const StyledSettingsButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

// --- 메뉴 데이터 (path 속성 제거) ---
const menuItems = [
  { id: 'map', icon: mapIcon, text: '지도 탐색' },
  { id: 'menu', icon: layoutIcon, text: '메뉴 탐색' },
  { id: 'liked', icon: heartIcon, text: '찜한 가게' },
  { id: 'review', icon: reviewIcon, text: '리뷰 작성' },
  { id: 'my', icon: myPageIcon, text: 'MY 페이지' },
  { id: 'more', icon: moreIcon, text: '더보기' },
];

/**
 * @description 앱의 메인 사이드바 내비게이션
 */
export function MapsPageSidebar() {
  // --- 내부 상수/훅 호출 ---
  const theme = useTheme();
  // useState와 핸들러를 다시 사용
  const [activeMenuState, setActiveMenuState] = useState('map');

  const handleMenuClick = menuId => {
    setActiveMenuState(menuId);
  };

  // --- 렌더링(JSX) ---
  return (
    <StyledSidebarContainer>
      {/* 상단 그룹 */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        `}
      >
        {/* 로고 */}
        <StyledLogo src={logoImage} alt="Inchelin Logo" />

        {/* 메뉴 버튼 그룹 */}
        <StyledMenu>
          {menuItems.map(item => {
            const isActive = activeMenuState === item.id;
            return (
              <StyledSidebarButton
                key={item.id}
                $active={isActive}
                onClick={() => handleMenuClick(item.id)}
                aria-pressed={isActive}
              >
                <StyledIcon
                  src={item.icon}
                  alt=""
                  color={isActive ? theme.colors.blue : theme.colors.black}
                />
                <StyledMenuText>{item.text}</StyledMenuText>
              </StyledSidebarButton>
            );
          })}
        </StyledMenu>
      </div>

      {/* 하단 설정 버튼 */}
      <StyledSettingsButton aria-label="Settings">
        <StyledIcon color={theme.colors.darkGray} src={settingsIcon} alt="" />
      </StyledSettingsButton>
    </StyledSidebarContainer>
  );
}

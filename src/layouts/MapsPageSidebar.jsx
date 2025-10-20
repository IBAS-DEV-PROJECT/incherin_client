/** @jsxImportSource @emotion/react */
// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routeTable.js';

// --- 아이콘 및 로고 파일들 ---
import heartIcon from '../assets/image/heart.png';
import layoutIcon from '../assets/image/layout.png';
import logoImage from '../assets/image/logo3.png';
import mapIcon from '../assets/image/map-01.png';
import reviewIcon from '../assets/image/review.png';
import settingsIcon from '../assets/image/settings.png';
import myPageIcon from '../assets/image/user-circle.png';
import moreIcon from '../assets/image/dots-horizontal.png';

// --- 스타일이 적용된 컴포넌트들 ---

// -- 사이드바 틀 스타일 --
const StyledSidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 76px;
  padding: 30px 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
  flex-shrink: 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 20; /*z-index:10(패널)보다 위로 둠*/
`;

// -- 사이드바 상단 로고 스타일 --
const StyledLogo = styled.img`
  width: 48px;
  height: 40px;
`;

// -- 사이드바 메뉴들 정렬 --
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
`;

// 모든 메뉴 버튼을 위한 단일 스타일 컴포넌트
const StyledMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 76px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.gray : 'transparent'};

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.gray : theme.colors.lightGray};
  }

  &::after {
    /* 활성화 시 버튼 옆에 파란 바 생성 */
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
  }
`;

// -- 버튼 안 아이콘 스타잏 --
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

// -- 버튼 안 텍스트 스타일 --
const StyledMenuText = styled.span`
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ color }) => color};
`;

// -- 사이드 바 메뉴 하단 설정 버튼 스타일 --
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

// --- 사이드바 메뉴 데이터 ---
const menuItems = [
  { id: 'map', icon: mapIcon, text: '지도 탐색', path: ROUTES.MAP },
  { id: 'stores', icon: layoutIcon, text: '메뉴 탐색', path: ROUTES.STORES },
  { id: 'liked', icon: heartIcon, text: '찜한 가게', path: ROUTES.MY },
  { id: 'review', icon: reviewIcon, text: '리뷰 작성', path: ROUTES.MY },
  { id: 'my', icon: myPageIcon, text: 'MY 페이지', path: ROUTES.MY },
  { id: 'more', icon: moreIcon, text: '더보기' /* path 없음 */ },
];

// --- 맵의 메인 사이드바 내비게이션 ---
export function MapsPageSidebar({ onMenuChange }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState('map');

  const handleMenuClick = (menuId, path) => {
    // 활성화 상태를 업데이트
    setActiveMenuId(menuId);

    // 부모 컴포넌트에 알림 (패널 내용 변경용)
    if (onMenuChange) {
      onMenuChange(menuId);
    }

    // 페이지 이동이 필요하면 이동
    if (path) {
      navigate(path);
    }
  };

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
        <StyledLogo src={logoImage} alt="Inchelin Logo" />

        {/* 메뉴 버튼 그룹 */}
        <StyledMenu>
          {menuItems.map(item => {
            const isActive = activeMenuId === item.id; // 메뉴 버튼이 활성화 상태면 True

            return (
              <StyledMenuButton
                key={item.id}
                $active={isActive}
                onClick={() => handleMenuClick(item.id, item.path)}
              >
                <StyledIcon
                  src={item.icon}
                  alt=""
                  color={isActive ? theme.colors.blue : theme.colors.black}
                />
                <StyledMenuText
                  color={isActive ? theme.colors.blue : theme.colors.black}
                >
                  {item.text}
                </StyledMenuText>
              </StyledMenuButton>
            );
          })}
        </StyledMenu>
      </div>

      <StyledSettingsButton aria-label="Settings">
        <StyledIcon color={theme.colors.darkGray} src={settingsIcon} alt="" />
      </StyledSettingsButton>
    </StyledSidebarContainer>
  );
}

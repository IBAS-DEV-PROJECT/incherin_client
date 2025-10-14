/** @jsxImportSource @emotion/react */
// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 이미지 로고 ---
import logoImage from '../../../assets/image/logo2.png';

// --- 전체 패널 컨테이너 ---
const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

// --- 상단 로고 ---
const Logo = styled.img`
  width: 120px;
  margin-bottom: 32px;
`;

// --- 메뉴 그룹 (상단/하단) ---
const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// --- 상단 메뉴 아이템 (구분선 있음) ---
const MainMenuItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 4px;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const VersionText = styled.span`
  color: #888;
`;

const LatestBadge = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 14px;
  font-weight: 500;
`;

// --- 하단 메뉴 아이템 (구분선 없음) ---
const SubMenuItem = styled.button`
  padding: 8px 4px;
  border: none;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 12px;
  color: #555;

  &:hover {
    color: #000;
  }
`;

// --- 메인 컴포넌트 ---
export function MorePannel() {
  return (
    <PanelContainer>
      <Logo src={logoImage} alt="INCHELIN Logo" />

      {/* 상단 메뉴 그룹 */}
      <MenuGroup>
        <MainMenuItem>공지사항</MainMenuItem>
        <MainMenuItem>범례</MainMenuItem>
        <MainMenuItem>이용약관 및 정책</MainMenuItem>
        <MainMenuItem>
          <VersionText>버전 정보 v3.33.3</VersionText>
          <LatestBadge>최신버전</LatestBadge>
        </MainMenuItem>
      </MenuGroup>

      {/* 하단 메뉴 그룹 (위쪽과 간격 띄우기) */}
      <MenuGroup css={{ marginTop: '32px' }}>
        <SubMenuItem>IBAS web</SubMenuItem>
        <SubMenuItem>Maps API</SubMenuItem>
        <SubMenuItem>정보 수정 제안</SubMenuItem>
      </MenuGroup>
    </PanelContainer>
  );
}

export default MorePannel;

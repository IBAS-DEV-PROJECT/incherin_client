/** @jsxImportSource @emotion/react */
// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';

// --- 내부 모듈 ---
import MorePannel from './Pannel/MorePannel.jsx';
import InchelinGuide from './Pannel/InchelinGuide.jsx';

// 패널 전체를 감싸는 컨테이너
const StyledPanelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 76px; // 사이드바 옆에 위치하도록 설정
  height: 100%;
  width: 380px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 10;

  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
`;

// 패널을 열고 닫는 토글 버튼
const StyledToggleButton = styled.button`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  width: 24px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-left: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

/**
 * @description 지도 페이지의 가게 목록을 보여주는 슬라이딩 패널
 */
export function ListPannel({ activePanel, style, ...rest }) {
  // const theme = useTheme();
  const [isOpenState, setIsOpenState] = useState(true); // 패널 열림/닫힘 상태
  const [searchState, setSearchState] = useState(''); // 검색창 입력값 상태

  const handleTogglePanel = () => {
    setIsOpenState(prevState => !prevState);
  };

  const handleSearchChange = e => {
    setSearchState(e.target.value);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'map':
        return <InchelinGuide />;
      case 'more':
        return <MorePannel />;
      default:
        return <InchelinGuide />; // 기본값
    }
  };

  return (
    <StyledPanelContainer isOpen={isOpenState} style={style} {...rest}>
      <StyledToggleButton onClick={handleTogglePanel}>
        {isOpenState ? '‹' : '›'}
      </StyledToggleButton>
      {renderPanelContent()}
    </StyledPanelContainer>
  );
}

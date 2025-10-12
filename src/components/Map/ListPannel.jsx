/** @jsxImportSource @emotion/react */
// --- 라이브러리 ---
import React, { useState } from 'react';
import styled from '@emotion/styled';
// import { useTheme } from '@emotion/react';

// --- 내부 모듈 ---
import { Input } from '../common/Input';

// --- Styled Components ---

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

// 패널 내부 콘텐츠 영역
const StyledContentWrapper = styled.div`
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`;

// --- 임시 컴포넌트들 ---
const MockRestaurantCard = () => (
  <div
    style={{
      padding: '16px',
      border: '1px solid #ddd',
      marginBottom: '8px',
      borderRadius: '8px',
    }}
  >
    <h3>맛있는 가게</h3>
    <p>2명에서 먹으로 가기 좋은 가게</p>
  </div>
);

/**
 * @description 지도 페이지의 가게 목록을 보여주는 슬라이딩 패널
 */
export function ListPannel({ style, ...rest }) {
  // style과 rest props를 받도록 수정
  // --- 내부 상수/훅 호출 ---
  // const theme = useTheme();
  const [isOpenState, setIsOpenState] = useState(true); // 패널 열림/닫힘 상태
  const [searchState, setSearchState] = useState(''); // 검색창 입력값 상태

  // --- 핸들러 함수 ---
  const handleTogglePanel = () => {
    setIsOpenState(prevState => !prevState);
  };

  const handleSearchChange = e => {
    setSearchState(e.target.value);
  };

  // --- 렌더링(JSX) ---
  return (
    <StyledPanelContainer isOpen={isOpenState} style={style} {...rest}>
      {/* 토글 버튼 */}
      <StyledToggleButton onClick={handleTogglePanel}>
        {isOpenState ? '‹' : '›'}
      </StyledToggleButton>

      {/* 내부 콘텐츠 */}
      <StyledContentWrapper>
        {/* Input 컴포넌트로 교체 */}
        <Input
          value={searchState}
          onChange={handleSearchChange}
          placeholder="가게 검색"
          style={{ width: '100%' }} // Input의 너비를 100%로 설정
        />
        <h2 style={{ marginTop: '24px' }}>7월 인슐랭 가이드</h2>
        <MockRestaurantCard />
        <MockRestaurantCard />
      </StyledContentWrapper>
    </StyledPanelContainer>
  );
}

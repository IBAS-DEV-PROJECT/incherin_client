/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 모듈 ---
// 이름을 Pannel로 수정했습니다.
import { ListPannel } from '../../components/Map/ListPannel';
// MapsPageSidebar를 import하는 코드를 추가합니다.
import { MapsPageSidebar } from '../../layouts/MapsPageSidebar';

// --- Styled Components ---

// 페이지 전체를 감싸는 컨테이너. 모든 자식 요소들의 위치 기준점
const StyledPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

// 지도 영역
const StyledMapPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #aaa;
`;

// 메인 사이드바를 감싸서 맨 위에 고정시키는 래퍼
const StyledSidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  /* ListPannel(z-index: 10)보다 높은 숫자로 설정하여 항상 위에 있도록 함 */
  z-index: 20;
`;

// --- 페이지 엔트리 (Default Export 허용) ---
export default function MapPage() {
  // --- 렌더링(JSX) ---
  return (
    <StyledPageContainer>
      {/* 배경에 깔릴 지도 */}
      <StyledMapPlaceholder>지도 표시 예정.</StyledMapPlaceholder>

      {/* 슬라이딩 패널 */}
      <ListPannel />

      {/*맨 앞에 고정 메인 사이드바 */}
      <StyledSidebarWrapper>
        <MapsPageSidebar />
      </StyledSidebarWrapper>
    </StyledPageContainer>
  );
}

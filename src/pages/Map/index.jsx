/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ListPannel } from '../../components/Map/ListPannel';
import { MapsPageSidebar } from '../../layouts/MapsPageSidebar';

// 페이지 전체를 감싸는 컨테이너. 모든 자식 요소들의 위치 기준점
const StyledPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

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

export default function MapPage() {
  const [activePanelId, setActivePanelId] = useState('map');
  const handleMenuChange = menuId => {
    setActivePanelId(menuId);
    console.log('선택된 메뉴:', menuId); // 확인용
  };

  return (
    <StyledPageContainer>
      <StyledMapPlaceholder>지도 표시 예정.</StyledMapPlaceholder>
      <MapsPageSidebar onMenuChange={handleMenuChange} />
      <ListPannel activePanel={activePanelId} />
    </StyledPageContainer>
  );
}

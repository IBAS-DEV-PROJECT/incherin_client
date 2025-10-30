/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ListPannel } from '../../components/Map/ListPannel';
import { MapsPageSidebar } from '../../layouts/MapsPageSidebar';
import { useKakaoMap } from '../../hooks/useKakaoMap';

// 페이지 전체를 감싸는 컨테이너. 모든 자식 요소들의 위치 기준점
const StyledPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

// 지도를 담을 컨테이너 스타일
const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
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

  const mapOptions = {
    center: {
      lat: 37.45101, // 위도
      lng: 126.6565, // 경도
    },
    level: 3,
  };

  //커스텀 훅을 호출하여 지도 컨테이너 ref를 받아옵니다.
  const { mapContainerRef } = useKakaoMap(mapOptions);

  const handleMenuChange = menuId => {
    setActivePanelId(menuId);
    console.log('선택된 메뉴:', menuId); // 확인용
  };

  return (
    <StyledPageContainer>
      <MapWrapper ref={mapContainerRef} />
      <MapsPageSidebar onMenuChange={handleMenuChange} />
      <ListPannel activePanel={activePanelId} />
    </StyledPageContainer>
  );
}

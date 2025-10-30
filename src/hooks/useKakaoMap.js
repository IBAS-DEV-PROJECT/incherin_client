import { useEffect, useRef } from 'react';

/**
 * 카카오 지도를 생성하고 관리하는 커스텀 훅
 * @param {object} options - 지도 생성에 필요한 옵션 (center: { lat, lng }, level 등)
 * @returns {object} - 지도를 렌더링할 DOM 요소에 연결할 ref 객체
 */
export function useKakaoMap(options) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapContainerRef.current) {
      // options 객체에서 위도, 경도를 가져와 LatLng 객체 생성
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          options.center.lat,
          options.center.lng
        ),
        level: options.level,
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(mapContainerRef.current, mapOption);
    }
  }, [options]); // options가 변경되면 지도를 다시 그림

  return { mapContainerRef };
}

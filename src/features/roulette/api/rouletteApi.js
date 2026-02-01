import { API_BASE_URL, API_ENDPOINTS } from '@shared/config/api';

export const getRouletteOptions = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.ROULETTE_OPTIONS}`
    );

    if (!response.ok) {
      throw new Error('서버 응답에 문제가 있습니다.');
    }

    const data = await response.json();
    return data.options; // { options: [...] } 구조에서 배열만 반환
  } catch (error) {
    console.error('룰렛 데이터를 가져오지 못했습니다:', error);
    throw error;
  }
};

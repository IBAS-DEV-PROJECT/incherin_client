import { API_BASE_URL, API_ENDPOINTS } from '../../../shared/config/api';

const CATEGORY_MAP = {
  '한식': 'korean',
  '중식': 'chinese',
  '일식': 'japanese',
  '양식': 'western',
  '분식': 'snack',
  '술/안주': 'bar',
  '카페': 'cafe',
  '기타': 'others',
};

// [GET] 가게 목록 조회
export const fetchShops = async ({ category } = {}) => {
  const apiCategory =
    category && category !== '전체'
      ? CATEGORY_MAP[category]
      : null;

  const query = apiCategory ? `?category=${apiCategory}` : '';

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.SHOPS}${query}`
  );

  if (!response.ok) {
    throw new Error('가게 목록을 불러오지 못했습니다.');
  }

  const data = await response.json();

  return data.stores.map(store => ({
    id: store.id,
    name: store.name,
    category: store.category,   // 서버에서 내려주는 값 그대로
    image: store.thumbnail,
  }));
};


 // [GET] 가게 상세 조회
export const fetchShopById = async id => {
  if (!id) {
    throw new Error('가게 ID가 필요합니다.');
  }

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.SHOP_DETAIL(id)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('해당 가게를 찾을 수 없어요.');
    }
    throw new Error('가게 정보를 불러오지 못했습니다.');
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    category: data.category,
    phone: data.tel,  
    address: data.address,
  };
};
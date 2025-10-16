// --- 라이브러리 ---
import { atom } from 'jotai';

// --- 가게 목록 필터 타입 상수 --- 
export const STORE_FILTER_TYPES = {
    PRICE: 'price', // 가격 순
    DISTANCE: 'distance', // 거리 순
    RATING: 'rating', // 별점 높은 순
    POPULAR: 'popular', // 찜 많은 순
}

// 필터 상태 원자
// Store 페이지의 드롭다운 상태만 관리
export const storeFilterTypeAtom = atom(null);

// 정렬 초기화 액션
export const clearStoreFilterStore = atom(null, (get, set) => {
    set(storeFilterTypeAtom, STORE_FILTER_TYPES.POPULAR);
})
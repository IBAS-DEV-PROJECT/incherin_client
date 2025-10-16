// --- 라이브러리 ---
import { atom } from 'jotai';

// --- 필터 타입 상수 ---
export const FILTER_TYPES = {
  PRICE: 'price', // 가격 순
  DISTANCE: 'distance', // 거리 순
  REVIEW: 'review', // 리뷰 많은 순
  RATING: 'rating', // 별점 높은 순
  POPULAR: 'popular', // 찜 많은 순
};

// --- 필터 상태 원자 ---
export const filterTypeAtom = atom(null);
export const isFilterAppliedAtom = atom(false);

// --- 필터 상태 조합 원자 ---
export const filterStateAtom = atom(
  get => ({
    type: get(filterTypeAtom),
    isApplied: get(isFilterAppliedAtom),
  }),
  (get, set, newState) => {
    if (newState.type !== undefined) {
      set(filterTypeAtom, newState.type);
    }
    if (newState.isApplied !== undefined) {
      set(isFilterAppliedAtom, newState.isApplied);
    }
  }
);

// --- 인기순 필터 적용 액션 ---
export const applyPopularFilterAtom = atom(null, (get, set) => {
  set(filterTypeAtom, FILTER_TYPES.POPULAR);
  set(isFilterAppliedAtom, true);
});

// --- 필터 초기화 액션 ---
export const clearFilterAtom = atom(null, (get, set) => {
  set(filterTypeAtom, null);
  set(isFilterAppliedAtom, false);
});

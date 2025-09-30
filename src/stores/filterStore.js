// --- 라이브러리 ---
import { atom } from 'jotai';

// --- 필터 타입 상수 ---
export const FILTER_TYPES = {
  POPULAR: 'popular', // 인기순
  RECENT: 'recent', // 최신순
  RATING: 'rating', // 평점순
  DISTANCE: 'distance', // 거리순
};

// --- 필터 상태 원자 ---
export const filterTypeAtom = atom(FILTER_TYPES.POPULAR);
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
  set(filterTypeAtom, FILTER_TYPES.POPULAR);
  set(isFilterAppliedAtom, false);
});

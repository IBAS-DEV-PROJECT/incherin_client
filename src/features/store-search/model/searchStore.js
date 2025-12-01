// --- 라이브러리 ---
import { atom } from 'jotai';

// --- 검색 타입 상수 ---
export const SEARCH_TYPES = {
  MAP: 'map', // 지도 검색
  MENU: 'menu', // 메뉴 탐색
};

// --- 검색 상태 원자 ---
export const searchQueryAtom = atom('');
export const searchTypeAtom = atom(SEARCH_TYPES.MAP);
export const isSearchingAtom = atom(false);

// --- 검색 상태 조합 원자 ---
export const searchStateAtom = atom(
  get => ({
    query: get(searchQueryAtom),
    type: get(searchTypeAtom),
    isSearching: get(isSearchingAtom),
  }),
  (get, set, newState) => {
    if (newState.query !== undefined) {
      set(searchQueryAtom, newState.query);
    }
    if (newState.type !== undefined) {
      set(searchTypeAtom, newState.type);
    }
    if (newState.isSearching !== undefined) {
      set(isSearchingAtom, newState.isSearching);
    }
  }
);

// --- 검색 초기화 액션 ---
export const clearSearchAtom = atom(null, (get, set) => {
  set(searchQueryAtom, '');
  set(searchTypeAtom, SEARCH_TYPES.MAP);
  set(isSearchingAtom, false);
});

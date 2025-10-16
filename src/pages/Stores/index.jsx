// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

// --- 내부 (부모) ---
import { StoreCard, StoreSearch, StoreDropdown } from '../../components/Store';
import { storeFilterTypeAtom, STORE_FILTER_TYPES } from '../../stores/storeFilterStore';

// ================== 스타일 ==================
const StyledStoresContainer = styled.div({
  padding: 24,
});

const StyledStoreGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 24,
  marginTop: 24,
})

const StyledDropdownWrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '16px 0',
})

// -- Mock 데이터 -- 
const MOCK_STORES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `가게 ${i + 1}`,
  price: Math.floor(Math.random() * 20000) + 5000, // 가격 순
  distance: Math.floor(Math.random() * 1000) + 100, // 거리 순
  rating: (Math.random() * 2 + 3).toFixed(1), // 별점 높은 순
  popular: Math.floor(Math.random() * 100), // 찜 많은 순
}));

// -- 필터 옵션 --
const FILTER_OPTIONS = [
  { value: STORE_FILTER_TYPES.PRICE, label: '가격 순' },
  { value: STORE_FILTER_TYPES.DISTANCE, label: '거리 순' },
  { value: STORE_FILTER_TYPES.RATING, label: '별점 높은 순' },
  { value: STORE_FILTER_TYPES.POPULAR, label: '찜 많은 순' },
]

// --- 페이지 엔트리 (Default Export 허용) ---
export default function Stores() {
  
  const [filterType] = useAtom(storeFilterTypeAtom);

  // 정렬된 가게 목록
  const sortedStores = useMemo(() => {
    const stores = [...MOCK_STORES];
    switch (filterType) {
      case STORE_FILTER_TYPES.PRICE:
        return stores.sort((a, b) => a.price - b.price);
      case STORE_FILTER_TYPES.DISTANCE:
        return stores.sort((a, b) => a.distance - b.distance);
      case STORE_FILTER_TYPES.RATING:
        return stores.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      case STORE_FILTER_TYPES.POPULAR:
      default:
        return stores.sort((a, b) => b.popular - a.popular);
  }
  }, [filterType]);
  
  return (
    <StyledStoresContainer>
      <StoreSearch />
      <StyledDropdownWrapper>
        <StoreDropdown 
          options={FILTER_OPTIONS}
          placeholder='정렬 선택'  
        />
      </StyledDropdownWrapper>
      <StyledStoreGrid>
        {sortedStores.map(store => (
          <StoreCard key={store.id} {...store} />
        ))}
      </StyledStoreGrid>
    </StyledStoresContainer>
  );
}

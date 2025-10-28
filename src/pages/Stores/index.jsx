// --- 라이브러리 ---
import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';

// --- 내부 (부모) ---
import { StoreCard, StoreSearch, StoreDropdown } from '../../components/Store';
import { Tab } from '../../components/common/Tab';
import { Button } from '../../components/common';
import { Spinner } from '../../components/common';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { FILTER_TYPES, filterTypeAtom } from '../../stores/filterStore';

// --- 에셋 ---
import FoodImg from '../../assets/image/food.webp';

// ================== 스타일 ==================
const StyledStoresContainer = styled.div({
  padding: 24,
});

const StyledHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
})

const StyledTopRow = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

const StyledSearchWrapper = styled.div({
  flex: 1,
})

const StyledStoreGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 24,
  marginTop: 24,
})

const StyledDropdownWrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
})

const StyledFilterButtonGroup = styled.div({
  display: 'flex',
  gap: 8,
  justifyContent: 'flex-start',
})

const StyledLoadMoreTrigger = styled.div({
  height: '1px',
  width: '100%',
})

const StyledLoadingContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  padding: '40px 0',
  marginTop: 24,
})

const StyledEmptyMessage = styled.div(({ theme }) => ({
  textAlign: 'center',
  padding: '80px 20px',
  color: theme.colors.gray,
  fontSize: '16px',
}))

// --- 카테고리 --- 
const CATEGORIES = ['all', '한식', '중식', '양식', '일식', '카페/디저트', '기타'];

// -- Mock 데이터 --
const MOCK_STORES = [
  { id: 1, name: 'A 가게', price: 5000,  distance: 100, rating: 4.9, popular: 5,  category: '한식', imageUrl: FoodImg, isOperating: true,  isDelivery: true,  reviewCount: 12, likeCount: 5 },
  { id: 2, name: 'B 가게', price: 8000,  distance: 200, rating: 4.7, popular: 15, category: '중식', imageUrl: FoodImg, isOperating: true,  isDelivery: false, reviewCount: 34, likeCount: 15 },
  { id: 3, name: 'C 가게', price: 12000, distance: 50,  rating: 3.8, popular: 40, category: '양식', imageUrl: FoodImg, isOperating: false, isDelivery: true,  reviewCount: 8,  likeCount: 40 },
  { id: 4, name: 'D 가게', price: 15000, distance: 300, rating: 4.2, popular: 80, category: '일식', imageUrl: FoodImg, isOperating: true,  isDelivery: true,  reviewCount: 102, likeCount: 80 },
  { id: 5, name: 'E 가게', price: 20000, distance: 150, rating: 4.5, popular: 60, category: '카페/디저트', imageUrl: FoodImg, isOperating: true,  isDelivery: false, reviewCount: 21, likeCount: 60 },
  { id: 6, name: 'F 가게', price: 3000,  distance: 500, rating: 3.5, popular: 2,  category: '기타', imageUrl: FoodImg, isOperating: false, isDelivery: false, reviewCount: 3,  likeCount: 2 },
  { id: 7, name: 'G 가게', price: 10000, distance: 120, rating: 4.8, popular: 22, category: '한식', imageUrl: FoodImg, isOperating: true,  isDelivery: true,  reviewCount: 45, likeCount: 22 },
  { id: 8, name: 'H 가게', price: 7000,  distance: 80,  rating: 4.0, popular: 30, category: '중식', imageUrl: FoodImg, isOperating: true,  isDelivery: false, reviewCount: 18, likeCount: 30 },
  { id: 9, name: 'I 가게', price: 9000, distance: 250, rating: 4.6, popular: 45, category: '양식', imageUrl: FoodImg, isOperating: true, isDelivery: true, reviewCount: 67, likeCount: 45 },
  { id: 10, name: 'J 가게', price: 11000, distance: 180, rating: 4.1, popular: 18, category: '일식', imageUrl: FoodImg, isOperating: false, isDelivery: true, reviewCount: 29, likeCount: 18 },
  { id: 11, name: 'K 가게', price: 6000, distance: 90, rating: 4.4, popular: 35, category: '한식', imageUrl: FoodImg, isOperating: true, isDelivery: false, reviewCount: 41, likeCount: 35 },
  { id: 12, name: 'L 가게', price: 13000, distance: 400, rating: 3.9, popular: 12, category: '카페/디저트', imageUrl: FoodImg, isOperating: true, isDelivery: true, reviewCount: 15, likeCount: 12 },
];

// -- 필터 옵션 --
const FILTER_OPTIONS = [
  { value: FILTER_TYPES.PRICE, label: '가격 순' },
  { value: FILTER_TYPES.DISTANCE, label: '거리 순' },
  { value: FILTER_TYPES.RATING, label: '별점 높은 순' },
  { value: FILTER_TYPES.POPULAR, label: '찜 많은 순' },
]

// 탭 항목
const TAB_ITEMS = CATEGORIES.map(c => ({
  value: c,
  label: c === 'all' ? '전체' : c
}))

// 페이지 당 아이템 수
const ITEMS_PER_PAGE = 8;

// --- 페이지 엔트리 (Default Export 허용) ---
export default function Stores() {
  const [activeTab, setActiveTab] = useState('all');
  const [filterType] = useAtom(filterTypeAtom);

  // 필터 버튼 상태
  const [isOperatingFilter, setIsOperatingFilter] = useState(false);
  const [isDeliveryFilter, setIsDeliveryFilter] = useState(false);

  // 무한 스크롤 관련 상태
  const [displayedCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // 탭 + 정렬 + 필터 적용된 가게 목록
  const sortedStores = useMemo(() => {
    let stores = [...MOCK_STORES];

    // 카테고리 필터링
    if (activeTab && activeTab !== 'all') {
      stores = stores.filter(s => s.category === activeTab);
    }

    // 영업 중 필터링
    if (isOperatingFilter) {
      stores = stores.filter(s => s.isOperating);
    }

    // 배달 가능 필터링
    if (isDeliveryFilter) {
      stores = stores.filter(s => s.isDelivery);
    }

    // 필터가 없으면 정렬하지 않고 반환
    if (!filterType) {
      return stores;
    }

    // 정렬
    switch (filterType) {
      case FILTER_TYPES.PRICE:
        return stores.sort((a, b) => a.price - b.price);
      case FILTER_TYPES.DISTANCE:
        return stores.sort((a, b) => a.distance - b.distance);
      case FILTER_TYPES.RATING:
        return stores.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      case FILTER_TYPES.POPULAR:
        return stores.sort((a, b) => b.popular - a.popular);
      default:
        return stores;
  }
  }, [filterType, activeTab, isOperatingFilter, isDeliveryFilter]);

  // 현재 표시할 가게 목록
  const displayedStores = useMemo(() => {
    return sortedStores.slice(0, displayedCount);
  }, [sortedStores, displayedCount]);

  // 더 불러올 데이터가 있는지 확인
  const hasMore = displayedCount < sortedStores.length;

  // 다음 페이지 로드
  const fetchMore = async () => {
    // 실제 API 호출
    await new Promise(resolve => setTimeout(resolve, 300));
    setDisplayCount(prev => prev + ITEMS_PER_PAGE);
  };

  // 무한 스크롤 훅
  const { targetRef, isLoadingMore } = useInfiniteScroll(
    fetchMore,
    hasMore,
    200, // threshold
  );

  // 필터나 탭이 변경되면 표시 개수 초기화
  React.useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [activeTab, filterType, isOperatingFilter, isDeliveryFilter]);
  
  return (
    <StyledStoresContainer>
      <StyledHeader>
        <StyledTopRow>
          <StyledSearchWrapper>
            <StoreSearch />
          </StyledSearchWrapper>
          <Tab
            items={TAB_ITEMS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />  
          <StyledDropdownWrapper>
            <StoreDropdown 
              options={FILTER_OPTIONS}
              placeholder='정렬 선택'  
            />  
          </StyledDropdownWrapper>
          <StyledFilterButtonGroup>
            <Button
              variant="subsidiary"
              active={isOperatingFilter}
              onClick={() => setIsOperatingFilter(!isOperatingFilter)}
            > 현재 영업 중
            </Button>
            <Button
              variant="subsidiary"
              active={isDeliveryFilter}
              onClick={() => setIsDeliveryFilter(!isDeliveryFilter)}
            > 배달 가능
            </Button>
          </StyledFilterButtonGroup>
        </StyledTopRow>
      </StyledHeader>

      {displayedStores.length === 0 ? (
        <StyledEmptyMessage>
          조건에 맞는 가게가 없습니다.
        </StyledEmptyMessage>
      ) : (
        <>
          <StyledStoreGrid>
          {displayedStores.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
          </StyledStoreGrid>

          {/* 무한 스크롤 트리거 */}
          {hasMore && (
            <StyledLoadMoreTrigger ref={targetRef} />
          )}

          {/* 로딩 스피너 */}
          {isLoadingMore && (
            <StyledLoadingContainer>
              <Spinner />
            </StyledLoadingContainer>
          )}
        </>
      )}
      
    </StyledStoresContainer>
  );
}

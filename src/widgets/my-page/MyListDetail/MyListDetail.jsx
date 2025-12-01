// --- 라이브러리 ---
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ListDetailCard from './ListDetailCard';
import FoodImg from '@shared/assets/image/food.webp';

// --- 리스트 더미 데이터 ---
const initialLists = [
  { id: 1, name: '가고 싶은 한식 맛집!', color: '#ac182d' },
  { id: 2, name: '가고 싶은 양식 맛집!', color: '#27509b' },
  { id: 3, name: '가고 싶은 중식 맛집!', color: '#d4e7fa' },
];

// --- 스타일 ---
const StyledContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledCardWrapper = styled.div`
  width: 700px;
  height: 500px;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 12px;
  padding: 32px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #27509b;
  margin-bottom: 20px;
`;

// --- 더미 가게 데이터 ---
const storeList = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  name: '백소정',
  category: '일식당',
  imageUrl: FoodImg,
}));

// --- 메인 컴포넌트 ---
export default function MyListDetail() {
  const { id } = useParams();

  // 리스트 이름 찾기
  const currentList = initialLists.find(list => list.id === Number(id));
  const listName = currentList ? currentList.name : `리스트 ${id}`;

  // --- 상태 관리 ---
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);

  // --- 무한 스크롤 ---
  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 5, storeList.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0];
        if (target.isIntersecting && visibleCount < storeList.length) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [visibleCount, loadMore]);

  // --- 렌더링 ---
  return (
    <StyledContainer>
      <StyledCardWrapper>
        <StyledTitle>{listName}</StyledTitle>

        {storeList.slice(0, visibleCount).map(store => (
          <ListDetailCard
            key={store.id}
            name={store.name}
            category={store.category}
            imageUrl={store.imageUrl}
            onClick={() => alert(`${store.name} 가게 상세로 이동`)}
            isOperating={true}
            isDelivery={true}
            rating={4.9}
            reviewCount={21}
            address="인천광역시 미추홀구 용현동 인하로 73-1 1층"
          />
        ))}
        <div ref={observerTarget} style={{ height: '1px' }} />

        {/* 로딩 표시 */}
        {isLoading && (
          <p
            style={{ textAlign: 'center', color: '#b1b1b1', marginTop: '10px' }}
          >
            불러오는 중...
          </p>
        )}
      </StyledCardWrapper>
    </StyledContainer>
  );
}

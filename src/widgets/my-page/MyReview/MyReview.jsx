// --- 라이브러리 ---
import React, { useState, useMemo } from "react";
import styled from "@emotion/styled";

// --- 내부 컴포넌트 ---
import ReviewCard from "./ReviewCard";
import ReviewSortSelect from "./ReviewSortSelect";
import FoodImg from '@shared/assets/image/food.webp';
import Review1 from '@shared/assets/image/review1.png';
import Review2 from '@shared/assets/image/review2.png';

// --- 스타일 ---
const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
`;

const CardWrapper = styled.div`
  width: 800px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 12px;
  padding: 32px;
  height: 580px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #27509b;
  padding-bottom: 14px;
  border-bottom: 1px solid #27509b;
  margin-bottom: 20px;
`;

const ReviewList = styled.div`
  flex: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Placeholder = styled.div`
  text-align: center;
  padding-top: 100px;
  color: #b1b1b1;
  font-size: 16px;
`;

// --- 더미 데이터 ---
const sampleReviews = [
  {
    id: 1,
    name: "백소정 인하대후문점",
    rating: 4.9,
    likeCount: 5,
    images: [FoodImg, Review1, Review2],
    content:
    "백소정 냉모밀이 맛있다는 소문에 인하대 부근에 왔다가 검색 후 방문!!\n\n냉소바 주문 후 음식이 나왔는데 모밀 위에 야채 고명이 가득 올려져 좋았어요\n\n맛도 끝내주는 시원한 모밀이었어요.\n 다음에 또 올거에요",
    tags: ["가성비가 좋아요💰", "음식이 맛있어요😋"],
    visitedDate: "2025-10-31 (일)",
    visitCount: 3,
  },
  {
    id: 2,
    name: "백소정 인하대후문점",
    rating: 4.2,
    likeCount: 3,
    images: [FoodImg, Review1],
    content: "사장님의 추천으로 마제소바와 돈가스를 주문했어요!!\n두 명이서 배부르게 먹었고, 음식도 맛있었어용 추천합니다!!",
    tags: ["가성비가 좋아요💰","음식이 맛있어요😋"],
    visitedDate: "2024-11-11 (일)",
    visitCount: 2,
  },
  {
    id: 3,
    name: "백소정 인하대후문점",
    rating: 5.0,
    likeCount: 8,
    images: [FoodImg,Review1, Review2],
    content: "첫방문인데 너무 맛있어요❤️\n다음에 또 오겠습니다!!",
    tags: ["가성비가 좋아요💰"],
    visitedDate: "2025-02-04 (수)",
    visitCount: 1,
  },
];

export default function MyReview() {
  const [sortType, setSortType] = useState("latest");
  const [reviews, setReviews] = useState(sampleReviews);

  const handleDeleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
};

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      const dateA = new Date(a.visitedDate.split(" ")[0]);
      const dateB = new Date(b.visitedDate.split(" ")[0]);

      if (sortType === "latest") return dateB - dateA;         
      if (sortType === "oldest") return dateA - dateB;          
      if (sortType === "rating") return b.rating - a.rating;    
      return 0;
    });
  }, [sortType, reviews]);

  return (
    <PageWrapper>
      <CardWrapper>
        <Title>내가 쓴 리뷰</Title>

        <ReviewSortSelect value={sortType} onChange={(e) => setSortType(e.target.value)} />

        {sortedReviews.length === 0 ? (
          <Placeholder>작성한 리뷰가 없어요</Placeholder>
        ) : (
          <ReviewList>
            {sortedReviews.map((review) => (
              <ReviewCard key={review.id} {...review} 
              onDelete={() => handleDeleteReview(review.id)}/>
            ))}
          </ReviewList>
        )}
      </CardWrapper>
    </PageWrapper>
  );
}

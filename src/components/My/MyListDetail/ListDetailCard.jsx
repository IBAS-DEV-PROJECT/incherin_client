// --- 라이브러리 ---
import React from "react";
import styled from "@emotion/styled";
import { StoreBadgeGroup } from "../../Store/StoreBadgeGroup";

// --- 스타일 ---
const CardContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 6px;;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  transition: box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const StoreImage = styled.img`
  width: 120px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 10px;
`;

const TopInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StoreName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #121212;
  margin: 0;
`;

const MiddleInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const BottomInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #121212;
`;

const StarIcon = styled.span`
  color: #ffc107;
  font-size: 15px;
  transform: translateY(1px);
`;

const Address = styled.span`
  font-size: 13px;
  color: #b1b1b1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// --- 컴포넌트 ---
export default function ListDetailCard({
  name,
  category,
  imageUrl,
  onClick,
  isOperating,
  isDelivery,
  rating,
  reviewCount,
  address,
}) {
  return (
    <CardContainer onClick={onClick}>
      <StoreImage src={imageUrl} alt={name} />

      <InfoContainer>

        <TopInfoWrapper>
          <StoreName>{name}</StoreName>
        </TopInfoWrapper>

        <MiddleInfoWrapper>
          <StoreBadgeGroup
            category={category}
            isOperating={isOperating}
            isDelivery={isDelivery}
          />
          <BottomInfoWrapper>
            <MetaInfo>
              <StarIcon>★</StarIcon>
              <strong>{rating}</strong>
              <span style={{ color: "#121212" }}>({reviewCount})</span>
            </MetaInfo>
            <Address>{address}</Address>
          </BottomInfoWrapper>
        </MiddleInfoWrapper>
      </InfoContainer>
    </CardContainer>
  );
}

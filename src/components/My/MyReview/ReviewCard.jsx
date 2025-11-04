// --- 라이브러리 ---
import React, { useState } from "react";
import styled from "@emotion/styled";

// --- 내부 컴포넌트 ---
import ReviewHeader from "./ReviewHeader";
import ReviewImageSection from "./ReviewImageSection";
import ReviewText from "./ReviewText";
import ReviewTagSection from "./ReviewTagSection";
import ReviewDate from "./ReviewDate";

// --- 스타일 ---
const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function ReviewCard(props) {
  return (
    <Card>
      <ReviewHeader {...props} onDelete={props.onDelete} />
      <ReviewImageSection images={props.images} />
      <ReviewText text={props.content} />
      <ReviewTagSection tags={props.tags} />
      <ReviewDate visitedDate={props.visitedDate} visitCount={props.visitCount} />
    </Card>
  );
}

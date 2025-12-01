// --- 라이브러리 ---
import React from "react";
import styled from "@emotion/styled";

// --- 스타일 ---
const ImageWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Img = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 4px;
  object-fit: cover;
`;

export default function ReviewImageSection({ images = [] }) {
  if (!images.length) return null;
  return (
    <ImageWrap>
      {images.map((src, i) => (
        <Img key={i} src={src} alt="리뷰 이미지" />
      ))}
    </ImageWrap>
  );
}

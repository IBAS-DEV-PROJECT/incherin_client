// --- 라이브러리 ---
import React from "react";
import styled from "@emotion/styled";

// --- 스타일 ---
const Box = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 14px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
  color: #121212;
`;

export default function ReviewContent({ text }) {
  if (!text) return null;
  return <Box>{text}</Box>;
}

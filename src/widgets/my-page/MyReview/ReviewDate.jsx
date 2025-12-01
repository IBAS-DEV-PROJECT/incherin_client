// --- 라이브러리 ---
import React from "react";
import styled from "@emotion/styled";

// --- 스타일 ---
const Footer = styled.div`
  text-align: right;
  font-size: 13px;
  color: #b1b1b1;
  margin-top: 4px;
`;

export default function ReviewFooter({ visitedDate, visitCount }) {
  return (
    <Footer>
      {visitedDate} · {visitCount}번째 방문
    </Footer>
  );
}

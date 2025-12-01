// --- 라이브러리 ---
import React from "react";
import styled from "@emotion/styled";

// --- 스타일 ---
const Menu = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  width: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.15);
`;

const Item = styled.button`
  width: 100%;
  padding: 12px;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #e9e9e9;
  }
`;

export default function ReviewToggle({ onDelete }) {
  return (
    <Menu>
      <Item style={{ color: "#ac182d" }} onClick={onDelete}>
       리뷰 삭제하기
      </Item>
      <Item>나만보기</Item>
    </Menu>
  );
}

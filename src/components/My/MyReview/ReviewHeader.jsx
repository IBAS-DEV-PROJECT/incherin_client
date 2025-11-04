// --- 라이브러리 ---
import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

// --- 내부 컴포넌트 ---
import ReviewToggle from "./ReviewToggle";
import { Badge } from "../../common/Badge";

// --- 스타일 ---
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StoreName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #121212;
`;

const Rating = styled.div`
  font-size: 14px;
  color: #f2b600;
`;

const Actions = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export default function ReviewHeader({ name, rating, likeCount, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <Header>
      <StoreInfo>
        <StoreName>{name}</StoreName>
        <Rating>⭐ {rating}</Rating>
      </StoreInfo>

      <Actions ref={ref}>
        <Badge
          size="midium"
          variant="light"
          color="#27509b"
          backgroundColor="#ffffff"
          style={{
            border: "1px solid #27509b",
            padding: "8px 14px",
            borderRadius: "20px",
          }}
        >
          👍 도움돼요 {likeCount}
        </Badge>

        <MenuButton onClick={() => setOpen((prev) => !prev)}>⋯</MenuButton>
        {open && <ReviewToggle onDelete={onDelete} />}
      </Actions>
    </Header>
  );
}

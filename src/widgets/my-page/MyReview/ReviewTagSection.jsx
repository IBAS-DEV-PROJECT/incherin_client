// --- 라이브러리 ---
import React from "react";
import styled from "@emotion/styled";

// --- 내부 컴포넌트 ---
import { Badge } from '@shared/ui/Badge';

// --- 스타일 ---
const TagWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export default function ReviewTagSection({ tags = [] }) {
  if (!tags.length) return null;
  return (
    <TagWrap>
      {tags.map((t, i) => (
        <Badge key={i} 
        variant="light" 
        size="midium" 
        color="#121212"
        borderRadius="20px">
          {t}
        </Badge>
      ))}
    </TagWrap>
  );
}

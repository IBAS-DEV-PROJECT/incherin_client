// --- 라이브러리 ---
import styled from "@emotion/styled";

// --- 스타일 ---
const Select = styled.select`
  width: 150px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  font-size: 14px;

  option {
    border-radius: 8px;
  }
`;

export default function ReviewSortSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value="latest">최신순</option>
      <option value="oldest">오래된순</option>
      <option value="likes">별점순</option>
    </Select>
  );
}

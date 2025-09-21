/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css, useTheme } from "@emotion/react";

// 항목 데이터
const options = [
  "옵션-default",
  "옵션-hover",
  "옵션-pressed",
  "옵션-selected",
  "옵션",
];

const Dropdown = () => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림, 닫힘 상태
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option); // 옵션 선택
    setIsOpen(false); // 드롭다운 닫기
  };

  const dropdownContainerStyles = css`
    position: relative; 
    width: 360px;
    font-family: ${theme.typography.fontFamily};
    ${theme.typography.paragraph.p2}
    color: ${theme.colors.black};
  `;

  const dropdownButtonStyles = css`
    box-sizing: border-box;
    height: 48px;
    padding: 0px 18px;
    border: solid 2px ${theme.colors.blue};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background-color: ${theme.colors.white};
    ${theme.typography.paragraph.p2};
  `;

  const dropdownContentStyles = css`
    position: absolute;
    top: calc(100%);
    left: 0;
    right: 0;
    background-color: ${theme.colors.white};
    border: solid 1px ${theme.colors.darkGray};
    border-radius: 10px;
    z-index: 10;
    padding: 8px;
  `;
  
  // isSelected에 따라 스타일을 적용
  const dropdownItemStyles = (isSelected) => css`
    padding: 10px 12px;
    border-radius: 6px;
    cursor: pointer;
    /* 기본 상태 */
    background-color: ${theme.colors.white};
    color: ${isSelected ? theme.colors.blue : theme.colors.black};
    
    /* 마우스 올렸을 때 */
    &:hover {
      background-color: ${theme.colors.lightBlue};
    }
  `;

  return (
    <div css={dropdownContainerStyles}>
      <div css={dropdownButtonStyles} onClick={handleToggle}>
        <div>{selectedOption || "선택해주세요."}</div>
        <div>{isOpen ? "∧" : "∨"}</div>
      </div>

      /* isOpen이 true일 때 */
      {isOpen && (
        <div css={dropdownContentStyles}>
          {options.map((option) => (
            <div
              key={option}
              css={dropdownItemStyles(selectedOption === option)}
              onClick={() => handleOptionClick(option)}
            >
              {selectedOption === option && "✓ "}{option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
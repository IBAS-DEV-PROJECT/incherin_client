import React from "react";
import styled from "@emotion/styled";

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  border: 2px solid #D4E7FA;
  border-radius: 30px;
  width: 200px;
  height: 40px;
  background-color: #FFFFFF;
  overflow: hidden;
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  left: ${({ selected }) => (selected === "left" ? "0" : "50%")};
  width: 50%;
  height: 100%;
  background-color: #2c3e91;
  border-radius: 30px;
  transition: left 0.3s;
`;

const Option = styled.div`
  flex: 1;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  color: ${({ active }) => (active ? "#FFFFFF" : "#B1B1B1")};
  transition: color 0.3s;
`;

export default function ToggleOption({ leftLabel, rightLabel, selected, onChange }) {
  return (
    <ToggleWrapper>
      <Slider selected={selected} />
      <Option active={selected === "left"} onClick={() => onChange("left")}>
        {leftLabel}
      </Option>
      <Option active={selected === "right"} onClick={() => onChange("right")}>
        {rightLabel}
      </Option>
    </ToggleWrapper>
  );
}
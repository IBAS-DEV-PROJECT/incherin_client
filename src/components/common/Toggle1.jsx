import React from "react";
import styled from "@emotion/styled";

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;

const HiddenCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ checked }) => (checked ? "#2c3e91" : "#B1B1B1")};
  border-radius: 34px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  padding: 4px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border-radius: 50%;
  transition: 0.2s;
  transform: ${({ checked }) => (checked ? "translateX(22px)" : "translateX(0)")};
`;

export default function ToggleButton({ checked, onChange }) {
  return (
    <ToggleContainer>
      <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
      <Slider checked={checked}>
        <Circle checked={checked} />
      </Slider>
    </ToggleContainer>
  );
}
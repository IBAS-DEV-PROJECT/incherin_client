import React from "react";
import styled from "@emotion/styled";

//옵션이 없는 토글 스위치 
const SwitchWrapper = styled.label`
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

const SwitchSlider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ isOn }) => (isOn ? "#27509B" : "#B1B1B1")};
  border-radius: 34px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  padding: 4px;
`;

const SwitchCircle = styled.div`
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border-radius: 50%;
  transition: 0.2s;
  transform: ${({ isOn }) => (isOn ? "translateX(22px)" : "translateX(0)")};
`;

//옵션이 있는 토글스위치
const OptionWrapper = styled.div`
  position: relative;
  display: flex;
  border: 2px solid #D4E7FA;
  border-radius: 30px;
  width: 200px;
  height: 40px;
  background-color: #FFFFFF;
  overflow: hidden;
`;

const OptionSlider = styled.div`
  position: absolute;
  top: 0;
  left: ${({ selectedOption }) =>
    selectedOption === "left" ? "0" : "50%"};
  width: 50%;
  height: 100%;
  background-color: #27509B;
  border-radius: 30px;
  transition: left 0.3s;
`;

const OptionItem = styled.div`
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

export default function Toggle({
  toggleType = "switch",
  isOn,              
  selectedOption,  
  onChange,
  leftLabel,
  rightLabel,
}) {
  if (toggleType === "switch") {
    return (
      <SwitchWrapper>
        <HiddenCheckbox type="checkbox" checked={isOn} onChange={onChange} />
        <SwitchSlider isOn={isOn}>
          <SwitchCircle isOn={isOn} />
        </SwitchSlider>
      </SwitchWrapper>
    );
  }

  if (toggleType === "option") {
    return (
      <OptionWrapper>
        <OptionSlider selectedOption={selectedOption} />
        <OptionItem
          active={selectedOption === "left"}
          onClick={() => onChange("left")}
        >
          {leftLabel}
        </OptionItem>
        <OptionItem
          active={selectedOption === "right"}
          onClick={() => onChange("right")}
        >
          {rightLabel}
        </OptionItem>
      </OptionWrapper>
    );
  }

  return null;
}
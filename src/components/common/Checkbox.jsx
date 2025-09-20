import React, { useState } from "react";
import styled from "@emotion/styled";

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ checked }) => (checked ? "#27509b" : "#B1B1B1")};
  border-radius: 4px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #27509b;
  font-size: 14px;
  font-weight: bold;
`;

export default function Checkbox({ label }) {
  const [checked, setChecked] = useState(false);

  return (
    <CheckboxContainer>
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <StyledCheckbox checked={checked}>
        {checked && "✓"}
      </StyledCheckbox>
      {label}
    </CheckboxContainer>
  );
}

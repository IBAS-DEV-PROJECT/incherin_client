// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (현재) ---
import {
  getSwitchWrapperStyles,
  getHiddenCheckboxStyles,
  getSwitchSliderStyles,
  getSwitchCircleStyles,
  getOptionWrapperStyles,
  getOptionSliderStyles,
  getOptionItemStyles,
} from './Toggle.styles';

const StyledSwitchWrapper = styled.label(() => ({
  ...getSwitchWrapperStyles(),
}));

const StyledHiddenCheckbox = styled.input(() => ({
  ...getHiddenCheckboxStyles(),
}));

const StyledSwitchSlider = styled.div(({ $isOn }) => ({
  ...getSwitchSliderStyles($isOn),
}));

const StyledSwitchCircle = styled.div(({ $isOn }) => ({
  ...getSwitchCircleStyles($isOn),
}));

const StyledOptionWrapper = styled.div(() => ({
  ...getOptionWrapperStyles(),
}));

const StyledOptionSlider = styled.div(({ $selectedOption }) => ({
  ...getOptionSliderStyles($selectedOption),
}));

const StyledOptionItem = styled.div(({ $active }) => ({
  ...getOptionItemStyles($active),
}));

/**
 * Toggle 컴포넌트
 */
export function Toggle({
  toggleType = 'switch',
  isOn,
  selectedOption,
  onChange,
  leftLabel,
  rightLabel,
}) {
  if (toggleType === 'switch') {
    return (
      <StyledSwitchWrapper>
        <StyledHiddenCheckbox
          type="checkbox"
          checked={isOn}
          onChange={onChange}
        />
        <StyledSwitchSlider $isOn={isOn}>
          <StyledSwitchCircle $isOn={isOn} />
        </StyledSwitchSlider>
      </StyledSwitchWrapper>
    );
  }

  if (toggleType === 'option') {
    return (
      <StyledOptionWrapper>
        <StyledOptionSlider $selectedOption={selectedOption} />
        <StyledOptionItem
          $active={selectedOption === 'left'}
          onClick={() => onChange('left')}
        >
          {leftLabel}
        </StyledOptionItem>
        <StyledOptionItem
          $active={selectedOption === 'right'}
          onClick={() => onChange('right')}
        >
          {rightLabel}
        </StyledOptionItem>
      </StyledOptionWrapper>
    );
  }

  return null;
}

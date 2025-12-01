// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 내부 (현재) ---
import {
  getTabsContainerStyles,
  getTabsListStyles,
  getTabStyles,
} from './Tab.styles';

const StyledTabsContainer = styled.div(({ theme }) => ({
  ...getTabsContainerStyles(theme),
}));

const StyledTabsList = styled.div({
  ...getTabsListStyles(),
});

const StyledTab = styled.button(({ theme, $isActive }) => ({
  ...getTabStyles(theme, $isActive),
}));

/**
 * Tabs 컴포넌트
 */
export function Tab({ items = [], activeTab, onTabChange }) {
  const handleTabClick = value => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <StyledTabsContainer>
      <StyledTabsList>
        {items.map(item => (
          <StyledTab
            key={item.value}
            $isActive={activeTab === item.value}
            onClick={() => handleTabClick(item.value)}
            type="button"
          >
            {item.label}
          </StyledTab>
        ))}
      </StyledTabsList>
    </StyledTabsContainer>
  );
}

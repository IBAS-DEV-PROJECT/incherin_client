import React from 'react';
import styled from '@emotion/styled';
import { media } from '@shared/config/media';

const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;  
  padding: 14px 28px;
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  border-radius: 12px;
  border: ${({ isActive }) => (isActive ? 'none' : '1px solid #e2e8f0')};
  cursor: pointer;
  white-space: nowrap; 

  background-color: ${({ isActive }) =>
    isActive ? '#0066cc' : '#ffffff'};
  color: ${({ isActive }) =>
    isActive ? '#ffffff' : '#475569'};

  box-shadow: ${({ isActive }) =>
    isActive
      ? '0 4px 12px rgba(0, 102, 204, 0.3)'
      : '0 1px 3px rgba(0,0,0,0.05)'};

  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? '#0066cc' : '#f8fafc'};
    border-color: ${({ isActive }) =>
      isActive ? 'none' : '#cbd5e1'};
  }

  ${media.tablet} {
    padding: 12px 22px;
    font-size: 18px;
    border-radius: 10px;
  }

  ${media.mobile} {
    width: 100%;
    padding: 0px 16px;
    font-size: 16px;
    border-radius: 10px;
  }

  ${media.mobileS} {
    width: 100%;
    padding: 0px 4px;
    font-size: 14px;
    border-radius: 10px;
  }
`;

export const CategoryTab = ({
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <TabButton
      type="button"
      isActive={isActive}
      onClick={onClick ?? undefined}
      role="tab"
      aria-selected={isActive}
    >
      {label}
    </TabButton>
  );
};
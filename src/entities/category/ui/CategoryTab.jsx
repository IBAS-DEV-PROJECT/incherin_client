import React from 'react';
import styled from '@emotion/styled';
import { media } from '@shared/config/media';

const TabButton = styled.button`
  padding: 14px 28px;
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  border-radius: 12px;
  border: ${({ isActive }) => (isActive ? 'none' : '1px solid #e2e8f0')};
  cursor: pointer;

  background-color: ${({ isActive }) => (isActive ? '#0066cc' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#475569')};

  box-shadow: ${({ isActive }) =>
    isActive
      ? '0 4px 12px rgba(0, 102, 204, 0.3)'
      : '0 1px 3px rgba(0,0,0,0.05)'};

  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#0066cc' : '#f8fafc')};
    border-color: ${({ isActive }) => (isActive ? 'none' : '#cbd5e1')};
  }

  /* Tablet */
  ${media.tablet} {
    padding: 12px 22px;
    font-size: 15px;
    border-radius: 10px;
  }

  /* Mobile */
  ${media.mobile} {
    padding: 8px 14px;
    font-size: 13px;
    border-radius: 8px;
  }

  /* Small Mobile */
  ${media.mobileS} {
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 6px;
  }
`;

export const CategoryTab = ({ label, isActive, onClick }) => {
  return (
    <TabButton isActive={isActive} onClick={onClick}>
      {label}
    </TabButton>
  );
};

// --- 라이브러리 ---
import React from 'react';
import styled from '@emotion/styled';

// --- 스타일 ---
const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  padding-left: 470px;
`;

const TabButton = styled.button`
  padding: 12px 30px; /* ◀ 버튼의 상하좌우 여백을 늘렸습니다 */
  font-size: 21px;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.colors.blue : theme.colors.darkGray};
  border-bottom: 3.3px solid
    ${({ theme, active }) => (active ? theme.colors.blue : 'transparent')}; /* ◀ 아래 파란 선 두께를 키웠습니다 */
  margin-bottom: -1px;
`;

const TABS = ['정보', '메뉴', '리뷰'];

/**
 * @param {object} props
 * @param {string} props.activeTab - 현재 활성화된 탭
 * @param {function} props.setActiveTab - 탭 변경 핸들러
 */
export function StoreDetailTabs({ activeTab, setActiveTab }) {
  return (
    <TabContainer>
      {TABS.map(tab => (
        <TabButton
          key={tab}
          active={activeTab === tab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </TabButton>
      ))}
    </TabContainer>
  );
}

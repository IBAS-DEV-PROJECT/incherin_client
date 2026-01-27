import React from 'react';

/**
 * 카테고리 탭 (버튼) 컴포넌트
 * @param {Object} props
 * @param {string} props.label - 탭에 표시할 텍스트
 * @param {boolean} props.isActive - 활성화 여부
 * @param {function} props.onClick - 클릭 핸들러
 */
export const CategoryTab = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '14px 28px',
        fontSize: '16px',
        fontWeight: isActive ? 700 : 500,
        borderRadius: '12px',
        border: isActive ? 'none' : '1px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        // 상태에 따른 색상 분기
        backgroundColor: isActive ? '#0066cc' : '#ffffff',
        color: isActive ? '#ffffff' : '#475569',
        boxShadow: isActive
          ? '0 4px 12px rgba(0, 102, 204, 0.3)'
          : '0 1px 3px rgba(0,0,0,0.05)',
        transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.target.style.backgroundColor = '#f8fafc';
          e.target.style.borderColor = '#cbd5e1';
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.target.style.backgroundColor = '#ffffff';
          e.target.style.borderColor = '#e2e8f0';
        }
      }}
    >
      {label}
    </button>
  );
};

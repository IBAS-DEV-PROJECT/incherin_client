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
        padding: '16px 32px',
        fontSize: '17px',
        fontWeight: isActive ? 700 : 600,
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        // 활성/비활성 상태에 따른 배경색 및 그림자
        backgroundColor: isActive ? '#0066cc' : 'rgba(255,255,255,0.25)',
        color: '#ffffff',
        boxShadow: isActive
          ? '0 6px 20px rgba(0, 102, 204, 0.5)'
          : '0 2px 8px rgba(0,0,0,0.15)',
        transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
        backdropFilter: 'blur(10px)',
      }}
      // 호버 효과 (인라인 스타일 조작)
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = 'rgba(255,255,255,0.35)';
          e.target.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = 'rgba(255,255,255,0.25)';
          e.target.style.transform = 'translateY(0)';
        }
      }}
    >
      {label}
    </button>
  );
};

import React from 'react';

const Badge = ({
  children,
  variant = 'primary',
  size = 'medium',
  color,
  backgroundColor,
  onClick,
  rounded = true
}) => {
  // 기본 색상 변형들
  const variants = {
    primary: {
      backgroundColor: '#27509B',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#B1B1B1',
      color: 'white'
    },
    success: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    danger: {
      backgroundColor: '#AC182D',
      color: 'white'
    },
    warning: {
      backgroundColor: '#ffc107',
      color: '#212529'
    },
    info: {
      backgroundColor: '#D4E7FA',
      color: 'black'
    },
    light: {
      backgroundColor: '#f8f9fa',
      color: '#495057',
      border: '1px solid #dee2e6'
    },
    dark: {
      backgroundColor: '#121212',
      color: 'white'
    }
  };

  // 크기 설정
  const sizes = {
    small: {
      fontSize: '10px',
      padding: '2px 6px',
      minWidth: '16px',
      height: '16px'
    },
    medium: {
      fontSize: '12px',
      padding: '4px 8px',
      minWidth: '20px',
      height: '20px'
    },
    large: {
      fontSize: '14px',
      padding: '6px 12px',
      minWidth: '24px',
      height: '24px'
    }
  };

  // 스타일 조합
  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    borderRadius: rounded ? '12px' : '4px',
    cursor: onClick ? 'pointer' : 'default',
    border: 'none',
    lineHeight: '1',
    ...sizes[size],
    ...variants[variant],
    // 커스텀 색상이 있으면 덮어쓰기
    ...(backgroundColor && { backgroundColor }),
    ...(color && { color })
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log('뱃지가 클릭되었습니다:', children);
    }
  };

  const handleMouseOver = (e) => {
    if (onClick) {
      e.target.style.opacity = '0.8';
    }
  };

  const handleMouseOut = (e) => {
    if (onClick) {
      e.target.style.opacity = '1';
    }
  };

  return (
    <span
      style={badgeStyle}
      onClick={onClick ? handleClick : undefined}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </span>
  );
};

export default Badge;
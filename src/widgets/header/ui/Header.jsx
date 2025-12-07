import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '@shared/assets/image/logo2.png';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '11px 40px',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky', // 스크롤 시 상단 고정 (선택사항)
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
    }}>
      <img 
        src={logo2} 
        alt="INCHELIN" 
        style={{ height: '42px', width: 'auto', cursor: 'pointer' }}
        onClick={() => navigate('/')} // 로고 클릭 시 홈으로
      />
    </div>
  );
};
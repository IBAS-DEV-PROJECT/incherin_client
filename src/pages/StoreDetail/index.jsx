// --- 라이브러리 ---
import React from 'react';

// --- 내부 (부모) ---
import { StoreCard } from '../../components/Store';

// --- 페이지 엔트리 (Default Export 허용) ---
export default function Stores() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div style={{ width: '320px' }}>
        {/* props 없이 호출하면 설정된 기본 데이터가 보입니다 */}
        <StoreCard />
      </div>
    </div>
  );
}

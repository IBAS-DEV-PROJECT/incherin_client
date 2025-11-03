// --- 라이브러리 ---
import React, { useState } from 'react';

// --- 내부 (부모) ---
import {
  StoreDetailHeader,
  StoreDetailTabs,
  StoreDetailInfo,
} from '../../components/StoreDetail';

// --- 페이지 엔트리 (Default Export 허용) ---
export default function StoreDetail() {
  const [activeTab, setActiveTab] = useState('정보');

  return (
    <main>
      <StoreDetailHeader />
      <StoreDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 현재 활성화된 탭에 따라 다른 내용을 보여줍니다 */}
      {activeTab === '정보' && <StoreDetailInfo />}
      {activeTab === '메뉴' && (
        <div style={{ padding: 48 }}>메뉴 컴포넌트가 여기에 표시됩니다.</div>
      )}
      {activeTab === '리뷰' && (
        <div style={{ padding: 48 }}>리뷰 컴포넌트가 여기에 표시됩니다.</div>
      )}
    </main>
  );
}

//---라이브러리---
import React from "react";
import { UserInfoSection } from "../../components/My";
//---내부(현재)---
import Sidebar from "../../layouts/Sidebar";

export default function MyPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 왼쪽 사이드바 */}
      <Sidebar userType="user" nickname="" />

      {/* 오른쪽 메인 영역 */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <UserInfoSection />
      </div>
    </div>
  );
}
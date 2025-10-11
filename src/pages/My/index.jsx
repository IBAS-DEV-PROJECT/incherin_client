// --- 라이브러리 ---
import { Outlet } from "react-router-dom";
// --- 내부 ---
import Sidebar from "../../layouts/Sidebar";

export default function MyPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 왼쪽 사이드바 */}
      <Sidebar userType="user" nickname="김지후" />

      {/* 오른쪽 메인 영역 */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", scrollbarWidth: "none", msOverflowStyle: "none",}}>
        <Outlet />
      </div>
    </div>
  );
}

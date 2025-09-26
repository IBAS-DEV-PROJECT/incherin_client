# 컴포넌트 구조 컨벤션

> React 컴포넌트 (JS 기준)
> 

---

### **1) 컴포넌트 파일 기본 구조**

1. **Props 주석(JSDoc)**: 컴포넌트가 받는 props 설명 (타입은 string, boolean, function 등 간단하게)
2. **내부 상수/훅 호출**: useState, useEffect, 커스텀 훅 등
3. **핸들러 함수**: 이벤트 핸들러 (네이밍: handleXxx)
4. **렌더링(JSX)**: 의미별 섹션을 주석으로 구분

---

### **2) 네이밍 규칙**

- **컴포넌트 이름**: PascalCase → UserCard, LoginForm
- **상태 변수**: xxxState, 불리언은 isXxx
- **핸들러 함수**: handleXxx

---

### **3) 예시 코드**

```jsx
// --- Props 주석 ---
/**
 * @param {boolean} isOpen - 모달 열림 여부
 * @param {function} onClose - 닫기 핸들러
 */
export function Modal({ isOpen, onClose }) {
  // --- 내부 상태/훅 ---
  const [countState, setCountState] = useState(0);

  // --- 핸들러 ---
  const handleClick = () => setCountState((c) => c + 1);

  // --- 렌더링 ---
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      {/* 헤더 */}
      <h1>모달</h1>

      {/* 내용 */}
      <p>count: {countState}</p>

      {/* 액션 */}
      <button onClick={handleClick}>증가</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}
```

---

### **4) 추가 가이드**

- JSX는 **의미 단위로 주석** 처리 (헤더/내용/액션 등)
- 컴포넌트 크기가 커지면 **하위 컴포넌트로 분리**
- DOM 요소는 역할/의미에 맞는 태그 사용 (<button>, <a> 등)
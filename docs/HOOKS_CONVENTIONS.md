# 훅(Hooks) 컨벤션

> 팀 파일명 규칙은 **PascalCase**지만, **훅 파일은 업계 관례상 `useXxx.js`** 를 권장(소문자 u).
문서에서는 `useXxx.js` 표기를 사용.
> 

---

### **1) 위치 & 파일명**

- 위치: src/hooks/
- 파일: useToggle.js, useDebounce.js, useFetch.js 등
- 이름 규칙: **훅 이름은 반드시 use 접두사**

---

### **2) 훅 파일 기본 구조**

1. **입력(Params)**: 명확한 인자(기본값 허용)
2. **내부 상태/레퍼런스**: useState, useRef, useReducer
3. **사이드이펙트**: useEffect 내부에서 캡슐화
4. **핸들러/도우미**: 내부 util/콜백 (handleXxx/doXxx)
5. **반환값**: 객체 형태로 명확하게 반환 { data, isLoading, error, ... }

> 컴포넌트에서 훅은 **파일 상단에서만 호출**합니다.
> 

---

### **3) 패턴 1: 토글 훅**

**useToggle.js**

```jsx
import { useCallback, useState } from 'react';

/**
 * @param {boolean} initial - 초기 값 (기본값: false)
 * @returns {{ isOn: boolean, toggle: function, on: function, off: function }}
 */
export function useToggle(initial = false) {
  const [isOn, setIsOn] = useState(Boolean(initial));

  const toggle = useCallback(() => setIsOn((v) => !v), []);
  const on = useCallback(() => setIsOn(true), []);
  const off = useCallback(() => setIsOn(false), []);

  return { isOn, toggle, on, off };
}
```

**사용 예시**

```jsx
import { useToggle } from '../../hooks/useToggle';

export function Sidebar() {
  const { isOn: isOpen, toggle } = useToggle();
  return (
    <>
      <button onClick={toggle}>토글</button>
      {isOpen && <aside>내용</aside>}
    </>
  );
}
```

---

### **4) 패턴 2: 디바운스 값**

**useDebounce.js**

```jsx
import { useEffect, useState } from 'react';

/**
 * @param {string|number} value - 원본 값
 * @param {number} delay - 지연(ms)
 * @returns {string|number} - 디바운스된 값
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
```

---

### **5) 패턴 3: 비동기 페치(3분기 포함)**

**useFetch.js**

```jsx
import { useEffect, useRef, useState } from 'react';

/**
 * @param {string} url - 요청 URL
 * @param {object} options - fetch 옵션 (method, headers, body 등)
 * @returns {{ data: any, isLoading: boolean, error: Error|null, refetch: function }}
 */
export function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const ctrlRef = useRef(null);

  const fetchData = async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    ctrlRef.current?.abort?.();
    ctrlRef.current = new AbortController();

    try {
      const res = await fetch(url, { ...options, signal: ctrlRef.current.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      if (e.name !== 'AbortError') setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => ctrlRef.current?.abort?.();
    // url/options가 자주 바뀌면 의존성 관리에 주의
  }, [url]);

  return { data, isLoading, error, refetch: fetchData };
}
```

**사용 예시**

```jsx
import { useFetch } from '../../hooks/useFetch';

export function UsersPage() {
  const { data, isLoading, error, refetch } = useFetch('/api/users');

  if (isLoading) return <p>로딩…</p>;
  if (error) return <p>에러: {String(error.message || error)}</p>;
  if (!data || !data.length) return <p>비어 있음</p>;

  return (
    <div>
      <button onClick={refetch}>다시 불러오기</button>
      <ul>
        {data.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **6) 패턴 4: 이벤트 리스너**

**useEventListener.js**

```jsx
import { useEffect } from 'react';

/**
 * @param {Element|Window|Document} target - 대상 (window, document, ref.current)
 * @param {string} type - 이벤트 타입 (예: 'click')
 * @param {function} handler - 핸들러
 * @param {object} options - addEventListener 옵션
 */
export function useEventListener(target, type, handler, options) {
  useEffect(() => {
    const el = target?.current || target;
    if (!el || !el.addEventListener) return;
    el.addEventListener(type, handler, options);
    return () => el.removeEventListener(type, handler, options);
  }, [target, type, handler, options]);
}
```

---

### **7) 작성 체크리스트**

- 입력/출력(JSDoc) **명확히 설명**
- 사이드이펙트는 **반드시 훅 내부에 캡슐화**
- 반환은 **객체 형태** 우선 (확장성/가독성)
- **불변성**과 **정의역 체크**(방어적 코딩)
- 네이밍: 상태 `xxxState`/불리언 `isXxx`/핸들러 `handleXxx`/내부 동작 `doXxx`
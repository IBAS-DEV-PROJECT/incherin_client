# 상태 관리 & 비동기 컨벤션

> 전역 상태는 Jotai를 사용.
> 비동기는 서비스 레이어(services/)와 컴포넌트 사이에 명시적 3분기(로딩/에러/빈) 를 적용.

---

### 1) 상태 선택 기준 (결정 트리)

1. **한 컴포넌트에서만 쓰나?** → **지역 상태**로.
2. **여러 독립 화면에서 동일 데이터 필요?** → 전역 상태(Jotai) + 캐싱.
3. **서버 데이터인가?** → 서비스 레이어(또는 react-query 등)로 가져오고, UI에서는 3분기 처리.

> 원칙: 가장 좁은 범위에 상태를 둔다. 전역으로 올릴 합당한 이유(공유·동기화·캐싱)가 있을 때만 끌어올린다.

---

### 로컬(지역) 상태 패턴

- 파일 구조: 컴포넌트 내부 `useState`, `useReducer`.
- 네이밍: 불리언 `isXxx`, 일반 상태 `xxxState`.

```jsx
export function QuantityCounter() {
  const [countState, setCountState] = useState(1);

  const handleInc = () => setCountState(v => v + 1);
  const handleDec = () => setCountState(v => Math.max(1, v - 1));

  return (
    <div>
      <button onClick={handleDec}>-</button>
      <span>{countState}</span>
      <button onClick={handleInc}>+</button>
    </div>
  );
}
```

---

### 전역 상태 – Jotai

- 위치: `src/contexts/` 또는 `src/contexts/<domain>/` (도메인별 구분 권장)
- 파일 예: `authAtoms.js`

```jsx
// contexts/authAtoms.js
import { atom } from 'jotai';

export const userAtom = atom(null); // null | { id, name, ... }
export const authLoadingAtom = atom(false);
```

**사용 예시:**

```jsx
import { useAtom } from 'jotai';
import { userAtom, authLoadingAtom } from '../../contexts/authAtoms';

export function ProfileBadge() {
  const [user] = useAtom(userAtom);
  const [isLoading] = useAtom(authLoadingAtom);

  if (isLoading) return <span>...</span>;
  if (!user) return <button>로그인</button>;
  return <span>{user.name}</span>;
}
```

> 도메인별 파일로 분리해 관리(예: cartAtoms.js, uiAtoms.js).
> 전역 원시값 남용 금지, **읽기 전용 파생(atom)**을 적극 활용.

---

### 서비스 레이어와의 연결 (표준 흐름)

1. **서비스**: `services/<feature>.js`에서 API 호출/에러 정규화.
2. **훅**: 화면에서 쓰기 좋게 래핑(`useFetch`, `useUsers` 등).
3. **컴포넌트**: 훅이 반환하는 3분기 신호로 UI 분기.

```
services/
  users.js
hooks/
  useUsers.js
pages/Users/index.jsx

```

```jsx
// services/users.js
export async function getUsers() {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

```jsx
// hooks/useUsers.js
import { useEffect, useState } from 'react';
import { getUsers } from '../../services/users';

export function useUsers() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await getUsers();
      setData(list);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, isLoading, error, refetch };
}
```

```jsx
// pages/Users/index.jsx
import { useUsers } from '../../hooks/useUsers';

export default function UsersPage() {
  const { data, isLoading, error, refetch } = useUsers();

  if (isLoading) return <SkeletonUsers />; // 로딩 상태
  if (error)
    return (
      <ErrorBlock
        message="사용자 목록을 불러오지 못했습니다."
        onRetry={refetch}
      />
    ); // 에러 상태
  if (!data || data.length === 0)
    return <EmptyState text="사용자가 없습니다" />; // 빈 상태

  return <UsersList items={data} />; // 성공 상태
}
```

---

### 비동기 3분기(Loading / Error / Empty) 규칙

- **항상 세 가지 상태를 명시**한다.
- 로딩은 **스켈레톤/스피너**, 에러는 **친절한 메시지 + 재시도**, 빈 상태는 **다음 행동 CTA** 포함.
- UI 컴포넌트화를 권장: `SkeletonXxx`, `ErrorBlock`, `EmptyState`.

```jsx
export function ErrorBlock({ message, onRetry }) {
  return (
    <div role="alert">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>다시 시도</button>}
    </div>
  );
}
```

---

### 파생 상태 & 메모화

- **파생 상태는 계산으로** 해결(`useMemo`)하고, 원본 상태는 단일 소스 유지.
- 콜백은 필요할 때만 `useCallback`으로 고정(남용 금지).

```jsx
const totalPrice = useMemo(
  () => items.reduce((a, b) => a + b.price, 0),
  [items]
);
```

---

### 수명/정리 규칙

- 비동기 작업 취소: `AbortController` 또는 플래그.
- 언마운트 때 이벤트/타이머 해제.
- 페이지 이동 시 **전역 UI 상태 초기화**가 필요하면 전용 API 추가(예: `resetCart()`).

---

### 체크리스트

- 전역으로 올리기 전에 **필요성**을 증명했는가?
- 서비스 레이어로 **I/O 분리**했는가?
- **로딩/에러/빈** 상태가 모두 보이는가?
- 파생 상태는 **계산**으로 만들었는가?
- 리스너/타이머/요청 **정리(cleanup)**가 있는가?

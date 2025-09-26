# Import 컨벤션

<aside>

**JS, 별칭(@/) 미사용 기준**

</aside>

### **1) 그룹 순서 (위 → 아래)**

<aside>

1. **사이드 이펙트 전용(import 값 미사용)** — _폴리필/글로벌 스타일/레지스트리 초기화 등_
2. **외부 라이브러리** — react, react-dom, axios, @tanstack/react-query 등
3. **내부 모듈(상대 경로)**
   - 2‑A. **부모 경로**: ../../…
   - 2‑B. **형제 경로**: ../…
   - 2‑C. **현재 경로**: ./…
4. **스타일/에셋 사이드 이펙트** — _.css, _.scss, reset, 폰트 등 (**파일 끝**)
</aside>

> 각 그룹 **사이는 한 줄 공백**을 둡니다.

---

### **2) 그룹 내 정렬 규칙**

<aside>

- **모듈 경로 알파벳 오름차순** (대소문자 무시)
- 같은 모듈을 여러 번 import하지 말고 **하나로 합치기**
- **Default → Named** 순으로 배치, Named specifier는 **알파벳 정렬**
- 불필요/미사용 import 금지
</aside>

> **Named 정렬 예시:**

```jsx
import { AlertDialog, Button, Card } from '../ui';
```

---

### **3) ✅ 올바른 예시 (주석으로 그룹 표기)**

```jsx
// --- 사이드 이펙트 ---
import 'focus-visible';

// --- 라이브러리 ---
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// --- 내부 (부모) ---
import Button from '../../components/common/Button';
import { fetchUsers } from '../../services/api';

// --- 내부 (형제) ---
import useToggle from '../hooks/useToggle';

// --- 내부 (현재) ---
import { formatDate } from './date';

// --- 스타일 ---
import './style.css';
```

---

### **4) ❌ 나쁜 예시 → ✅ 수정**

**Before**

```jsx
import './style.css';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { formatDate } from './date';
import useToggle from '../hooks/useToggle';
import { fetchUsers } from '../../services/api';
import Button from '../../components/common/Button';
```

**After**

```jsx
// --- 라이브러리 ---
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// --- 내부 (부모) ---
import Button from '../../components/common/Button';
import { fetchUsers } from '../../services/api';

// --- 내부 (형제) ---
import useToggle from '../hooks/useToggle';

// --- 내부 (현재) ---
import { formatDate } from './date';

// --- 스타일 ---
import './style.css';
```

# API Client Module

백엔드 연동을 위한 API 클라이언트 레이어

## 구조

```
lib/api/
├── client.ts      # HTTP 클라이언트 (fetch wrapper)
├── types.ts       # API 응답 타입 정의
├── index.ts       # 모듈 엔트리포인트
└── README.md      # 이 문서
```

## 사용법

### 기본 사용

```typescript
import { apiClient } from '@/lib/api';

// GET 요청
const questions = await apiClient.get('/api/v1/questions/daily');

// POST 요청
const answer = await apiClient.post('/api/v1/answers', {
  questionId: '123',
  content: '답변 내용',
});
```

### 타입 안전성

```typescript
import { apiClient, type ApiResponse, type Question } from '@/lib/api';

const response = await apiClient.get<ApiResponse<Question[]>>('/api/v1/questions/daily');
if (response.success && response.data) {
  const questions = response.data;
  console.log(questions[0].content);
}
```

## 환경변수

- `NEXT_PUBLIC_API_URL`: QueryDaily Mobile Service URL
- `NEXT_PUBLIC_GATEWAY_URL`: API Gateway URL
- `NEXT_PUBLIC_USE_BACKEND`: 백엔드 사용 여부 (true/false)

## 백엔드 연동 전환

### 1. 환경변수 설정

```bash
# .env.local
NEXT_PUBLIC_USE_BACKEND=true
NEXT_PUBLIC_API_URL=http://localhost:8388
```

### 2. 컴포넌트에서 사용

```typescript
'use client';

import { useEffect, useState } from 'react';
import { apiClient, type Question } from '@/lib/api';

export default function DashboardPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await apiClient.get<ApiResponse<Question[]>>('/api/v1/questions/daily');
        if (response.success && response.data) {
          setQuestions(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {questions.map(q => (
        <div key={q.id}>{q.content}</div>
      ))}
    </div>
  );
}
```

## 에러 처리

```typescript
try {
  const response = await apiClient.get('/api/v1/questions/daily');
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
  }
}
```

## Gateway 인증

Gateway를 통해 전달되는 JWT 헤더:
- `X-User-Id`: 사용자 ID
- `X-User-Email`: 사용자 이메일
- `X-User-Roles`: 사용자 권한

백엔드에서는 `GatewayAuthenticationFilter`가 자동으로 처리합니다.

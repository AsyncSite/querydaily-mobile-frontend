# QueryDaily Mobile Frontend

> 매일 3문제, 다른 사람의 생각 엿보기

현직 개발자들의 면접 답변을 보며 성장하는 모바일 우선 PWA 학습 플랫폼

## 🎯 핵심 가치

**"다른 사람의 생각을 엿보며 배우는"** - 특히 LINE, Kakao, Naver 등 현직자들의 면접 답변을 보며 학습

## 🚀 기술 스택

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Animation**: Framer Motion 12
- **Font**: Raleway (Google Fonts)
- **Platform**: Progressive Web App (PWA)

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트: 4501)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 타입 체크
npm run typecheck

# Lint 실행
npm run lint
npm run lint:fix

# 코드 포맷팅
npm run format
npm run format:check
```

## 🎨 주요 기능

### MVP (Phase 1)
- ✅ 카카오 OAuth 로그인
- ✅ 매일 3개 질문 (카드 스택 UI)
- ✅ 다른 사람 답변 보기 (회사/경력/기술스택 뱃지)
- ✅ 내 답변 작성 → 10 💎 획득
- ✅ 5 💎 소비해서 과거 질문 보기
- ✅ 친구 초대 시스템 (+50 💎 양쪽)
- ✅ 인사이트 충전 (PortOne 결제)

### Phase 2 (예정)
- ⏳ 프리미엄 구독
- ⏳ 회사 인증
- ⏳ 검색 기능
- ⏳ 북마크

## 📱 PWA 기능

- ✅ Manifest 설정
- ✅ 모바일 우선 반응형 디자인
- ✅ Standalone 모드 지원
- ⏳ Service Worker (오프라인 지원)
- ⏳ Push 알림

## 🏗️ 프로젝트 구조

```
querydaily-mobile-frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout (metadata, viewport)
│   ├── page.tsx          # Landing Page
│   ├── components/       # Shared Components
│   │   ├── InnerLayout.tsx
│   │   └── Logo*.tsx
│   ├── dashboard/        # 메인 대시보드
│   ├── categories/       # 카테고리별 탐색
│   ├── questions/        # 질문 상세
│   ├── mypage/          # 마이페이지
│   ├── onboarding/      # 온보딩
│   ├── shop/            # 인사이트 충전
│   └── compare*/        # A/B 테스트 페이지
├── public/
│   ├── manifest.json    # PWA Manifest
│   └── icons/           # PWA Icons (TODO)
└── package.json
```

## 🎨 디자인 시스템

**브랜드 컬러:**
- Primary: `#10b981` (Emerald Green)
- Background: `#f9fafb` (Gray 50)

**타이포그래피:**
- Font: Raleway (400, 500, 600, 700, 800)

**컴포넌트:**
- 모바일 프레임: `max-w-md mx-auto`
- 카드: `rounded-2xl shadow-md`
- 버튼: `rounded-xl hover:shadow-xl transition-all`

## 🔗 백엔드 연동

**백엔드 서비스:** `querydaily-mobile-service`
- Local: `http://localhost:8388`
- Docker: `asyncsite-querydaily-mobile-service:8388`
- Production: `https://api.asyncsite.com`

**현재 상태:** 하드코딩된 목업 데이터 사용 (백엔드 연동 예정)

**API 클라이언트:** `lib/api/` 모듈 준비 완료

## 🚀 배포

**Vercel 배포:**
- Production URL: `m.querydaily.asyncsite.com`
- Preview URL: Auto-generated per PR

**배포 가이드:**
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 전체 배포 프로세스
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Step-by-step Vercel 설정

**자동 배포:**
- `main` 브랜치 push → Production 배포
- PR 생성 → Preview 배포

## 📄 라이선스

Private - AsyncSite Platform

## 👥 팀

- **Product**: AsyncSite Team
- **Design**: v11 Prototype
- **Development**: QueryDaily Mobile Team

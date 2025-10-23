# Deployment Guide - QueryDaily Mobile Frontend

## 🚀 Vercel 배포 가이드

### 1️⃣ 사전 준비

**필요한 것:**
- Vercel 계정 (GitHub 연동)
- AsyncSite Organization 접근 권한
- 도메인 관리 권한 (asyncsite.com)

### 2️⃣ Vercel 프로젝트 생성

#### CLI를 통한 배포 (권장)

```bash
# Vercel CLI 설치 (없는 경우)
npm i -g vercel

# 프로젝트 디렉토리에서
cd /Users/rene/asyncsite/querydaily-mobile-frontend

# Vercel 로그인
vercel login

# 초기 배포
vercel

# 프로덕션 배포
vercel --prod
```

#### 웹 대시보드를 통한 배포

1. https://vercel.com/new 접속
2. **Import Git Repository**
3. GitHub에서 `AsyncSite/querydaily-mobile-frontend` 선택
4. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build` (자동 감지됨)
   - Output Directory: `.next` (자동 감지됨)
   - Install Command: `npm install` (자동 감지됨)

### 3️⃣ 환경변수 설정

Vercel Dashboard → Settings → Environment Variables에 추가:

```bash
# Production
NEXT_PUBLIC_API_URL=https://api.asyncsite.com
NEXT_PUBLIC_GATEWAY_URL=https://api.asyncsite.com
NEXT_PUBLIC_USE_BACKEND=true

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**주의사항:**
- `NEXT_PUBLIC_*` prefix가 있는 변수만 브라우저에 노출됩니다
- 민감한 정보는 절대 `NEXT_PUBLIC_*` prefix 사용 금지

### 4️⃣ 커스텀 도메인 설정

#### Option A: Subdomain 설정 (권장)

**대상 도메인**: `m.querydaily.asyncsite.com`

**Vercel 대시보드:**
1. Project Settings → Domains
2. **Add Domain** 클릭
3. 입력: `m.querydaily.asyncsite.com`
4. DNS 설정 정보 확인

**CloudFlare DNS 설정:**
```
Type: CNAME
Name: m.querydaily
Target: cname.vercel-dns.com
Proxy status: DNS only (회색 구름)
```

**또는 A Record:**
```
Type: A
Name: m.querydaily
IPv4 address: 76.76.21.21
Proxy status: DNS only
```

#### Option B: 별도 도메인

`querydaily.app` 또는 `querydaily.io` 등 별도 도메인 사용 가능

### 5️⃣ 배포 확인

```bash
# 배포 상태 확인
vercel ls

# 로그 확인
vercel logs [deployment-url]

# 프로덕션 URL 확인
vercel --prod
```

**예상 URL:**
- Preview: `querydaily-mobile-frontend-git-main-asyncsite.vercel.app`
- Production: `m.querydaily.asyncsite.com`

---

## 🔧 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트: 4501)
npm run dev

# 프로덕션 빌드 테스트
npm run build
npm start

# 타입 체크
npm run typecheck

# Lint
npm run lint
npm run lint:fix
```

---

## 📊 성능 최적화

### 1. 이미지 최적화

```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.png"
  alt="Description"
  width={500}
  height={300}
  priority // Above the fold images
/>
```

### 2. 코드 스플리팅

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### 3. 캐싱 전략

- Static Assets: `public/` → 1년 캐싱 (`immutable`)
- API Responses: `Cache-Control` 헤더 활용
- PWA Manifest: 1년 캐싱

---

## 🔐 보안 설정

### Headers (자동 적용됨)

```javascript
// next.config.js
{
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin'
}
```

### CORS

API Gateway에서 처리:
```
Access-Control-Allow-Origin: https://m.querydaily.asyncsite.com
Access-Control-Allow-Credentials: true
```

---

## 📱 PWA 배포 체크리스트

- [x] `manifest.json` 생성 완료
- [x] Viewport meta tag 설정
- [x] Theme color 설정
- [ ] PWA 아이콘 생성 (192x192, 512x512)
- [ ] Apple touch icon (180x180)
- [ ] Service Worker 구현 (선택)
- [ ] Offline 페이지 (선택)

---

## 🐛 트러블슈팅

### 빌드 실패

```bash
# 로컬에서 빌드 테스트
npm run build

# 캐시 클리어
rm -rf .next node_modules
npm install
npm run build
```

### 환경변수 인식 안됨

- Vercel Dashboard에서 환경변수 재확인
- `NEXT_PUBLIC_` prefix 확인
- 배포 후 재빌드 필요: **Deployments → Redeploy**

### 도메인 연결 안됨

- DNS 전파 대기 (최대 24시간)
- `dig m.querydaily.asyncsite.com` 명령어로 확인
- CloudFlare Proxy 비활성화 (회색 구름)

### 빌드 경고 (metadata viewport)

이미 수정 완료:
```typescript
// app/layout.tsx
export const viewport: Viewport = { ... }
```

---

## 📞 지원

**Vercel 문서**: https://vercel.com/docs
**Next.js 문서**: https://nextjs.org/docs
**AsyncSite 팀**: GitHub Issues

---

## 🔄 CI/CD Pipeline

**자동 배포 트리거:**
- `main` 브랜치 push → Production 배포
- PR 생성 → Preview 배포
- 모든 커밋 → Build 체크

**배포 프로세스:**
1. GitHub push
2. Vercel 자동 빌드
3. 빌드 성공 → 배포
4. 배포 완료 → Slack/이메일 알림 (선택)

---

**마지막 업데이트**: 2025-01-20
**Vercel Region**: ICN1 (Seoul)

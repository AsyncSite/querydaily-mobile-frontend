# Vercel 프로젝트 생성 및 도메인 연결 가이드

## 🎯 목표

`m.querydaily.asyncsite.com` 도메인으로 QueryDaily Mobile Frontend 배포

---

## 📋 Step-by-Step 가이드

### Step 1: Vercel 프로젝트 임포트

1. **Vercel 대시보드 접속**
   - https://vercel.com/asyncsite (AsyncSite Organization)
   - 또는 https://vercel.com/new

2. **Import Git Repository**
   - "Add New..." → "Project" 클릭
   - GitHub 레포지토리 검색: `AsyncSite/querydaily-mobile-frontend`
   - "Import" 클릭

3. **프로젝트 설정**
   ```
   Project Name: querydaily-mobile-frontend
   Framework Preset: Next.js (자동 감지)
   Root Directory: ./ 
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **환경변수 설정** (⚠️ 중요!)
   
   **Production 환경변수:**
   ```bash
   NEXT_PUBLIC_API_URL=https://api.asyncsite.com
   NEXT_PUBLIC_GATEWAY_URL=https://api.asyncsite.com
   NEXT_PUBLIC_USE_BACKEND=false
   ```
   
   **현재는 `false`로 설정** (백엔드 연동 전)
   - 백엔드 연동 시: `NEXT_PUBLIC_USE_BACKEND=true`로 변경

5. **Deploy 클릭**
   - 첫 배포는 5-10분 소요
   - 완료 후 Preview URL 생성됨
   - 예: `querydaily-mobile-frontend-asyncsite.vercel.app`

---

### Step 2: 커스텀 도메인 연결

#### 2-1. Vercel에서 도메인 추가

1. **Project Settings → Domains**로 이동

2. **Add Domain** 클릭

3. 도메인 입력:
   ```
   m.querydaily.asyncsite.com
   ```

4. Vercel이 DNS 설정 정보 제공:
   ```
   Type: CNAME
   Name: m.querydaily
   Value: cname.vercel-dns.com
   ```

#### 2-2. CloudFlare DNS 설정

**CloudFlare 대시보드 접속:**
- https://dash.cloudflare.com/
- `asyncsite.com` 도메인 선택
- DNS → Records

**CNAME 레코드 추가:**
```
Type: CNAME
Name: m.querydaily
Target: cname.vercel-dns.com
Proxy status: DNS only (회색 구름 ⚠️ 중요!)
TTL: Auto
```

**또는 A 레코드 사용:**
```
Type: A
Name: m.querydaily
IPv4 address: 76.76.21.21
Proxy status: DNS only
TTL: Auto
```

**중요사항:**
- ⚠️ **Proxy 반드시 비활성화** (회색 구름)
- 🟠 Proxied (주황색) 상태면 Vercel SSL 인증서 발급 실패
- ⚪ DNS only (회색) 상태로 변경 필수

#### 2-3. DNS 전파 확인

```bash
# macOS/Linux 터미널
dig m.querydaily.asyncsite.com

# 또는
nslookup m.querydaily.asyncsite.com

# 기대 결과
# CNAME: cname.vercel-dns.com
# 또는 A: 76.76.21.21
```

**전파 시간:**
- 최소: 5-10분
- 최대: 24-48시간 (드물게)

---

### Step 3: SSL 인증서 자동 발급

1. **Vercel이 자동으로 처리:**
   - Let's Encrypt SSL 인증서
   - DNS 검증 완료 후 자동 발급 (5-10분)

2. **상태 확인:**
   - Project Settings → Domains
   - `m.querydaily.asyncsite.com` 옆에 ✅ 표시

3. **인증서 갱신:**
   - 자동 갱신 (90일마다)
   - 수동 작업 불필요

---

### Step 4: 배포 확인

#### 4-1. 브라우저 테스트

```
https://m.querydaily.asyncsite.com
```

**확인 사항:**
- ✅ 페이지 로딩
- ✅ HTTPS 자물쇠 아이콘
- ✅ 모바일 프레임 정상 표시
- ✅ 카카오 로그인 버튼 표시

#### 4-2. PWA 테스트

**모바일 Safari (iOS):**
1. `m.querydaily.asyncsite.com` 접속
2. 공유 버튼 → "홈 화면에 추가"
3. 앱 아이콘으로 실행 확인

**Chrome (Android):**
1. `m.querydaily.asyncsite.com` 접속
2. "홈 화면에 추가" 프롬프트
3. 설치 후 Standalone 모드 확인

#### 4-3. API 연결 테스트 (백엔드 연동 후)

```bash
# 개발자 도구 Console
console.log(process.env.NEXT_PUBLIC_API_URL);
// 출력: https://api.asyncsite.com

# Network 탭에서 API 호출 확인
# /api/v1/questions/daily
```

---

### Step 5: Git 기반 자동 배포 설정

**완료! 자동으로 설정됨:**

- ✅ `main` 브랜치 push → Production 자동 배포
- ✅ PR 생성 → Preview 배포 생성
- ✅ 커밋마다 빌드 체크

**워크플로우:**
```bash
# 로컬에서 개발
git add .
git commit -m "feat: 새 기능 추가"
git push origin main

# Vercel이 자동으로:
# 1. 빌드 시작
# 2. 빌드 성공 확인
# 3. m.querydaily.asyncsite.com 배포
# 4. 완료 알림 (GitHub 코멘트)
```

---

## 🔧 추가 설정 (선택사항)

### A. Preview 도메인 보호

**Settings → Deployment Protection**
- Vercel Authentication 활성화
- Preview 배포는 로그인 필요하도록 설정

### B. Analytics 연동

**Settings → Analytics**
- Vercel Analytics 활성화 (무료)
- 또는 Google Analytics 연동

### C. 커스텀 에러 페이지

```typescript
// app/not-found.tsx
export default function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

// app/error.tsx
'use client';
export default function Error({ error, reset }) {
  return <div>에러 발생: {error.message}</div>;
}
```

---

## 📊 모니터링

### Vercel 대시보드

**Deployments:**
- 배포 히스토리
- 빌드 로그 확인
- Rollback 가능

**Analytics:**
- 페이지뷰
- 사용자 위치
- 디바이스 정보

**Logs:**
- 실시간 로그
- 에러 추적
- 성능 모니터링

---

## ❓ 트러블슈팅

### Q1: 도메인 연결 안됨 (Invalid Configuration)

**원인**: CloudFlare Proxy 활성화 상태
**해결**:
1. CloudFlare → DNS → `m.querydaily` 레코드
2. Proxy status를 "DNS only" (회색 구름)로 변경
3. 5-10분 대기 후 Vercel에서 재확인

### Q2: SSL 인증서 발급 실패

**원인**: DNS 전파 미완료 또는 CNAME 잘못 설정
**해결**:
```bash
dig m.querydaily.asyncsite.com
# CNAME이 cname.vercel-dns.com 가리키는지 확인
```

### Q3: 빌드 실패

**원인**: 환경변수 누락 또는 타입 에러
**해결**:
1. Vercel → Settings → Environment Variables 확인
2. 로컬에서 빌드 테스트: `npm run build`
3. 에러 로그 확인: Vercel Deployments → 실패한 빌드 클릭

### Q4: API 호출 CORS 에러

**원인**: Gateway CORS 설정
**해결**:
- API Gateway 설정에서 `m.querydaily.asyncsite.com` 추가
- `Access-Control-Allow-Origin` 헤더 확인

---

## ✅ 최종 체크리스트

배포 완료 전 확인:

- [ ] Vercel 프로젝트 생성 완료
- [ ] GitHub 레포지토리 연결 완료
- [ ] 환경변수 설정 완료 (`NEXT_PUBLIC_*`)
- [ ] 도메인 `m.querydaily.asyncsite.com` 추가 완료
- [ ] CloudFlare DNS 설정 완료 (Proxy OFF)
- [ ] DNS 전파 확인 (`dig` 명령어)
- [ ] SSL 인증서 발급 완료 (✅ 표시)
- [ ] HTTPS 접속 테스트 완료
- [ ] 모바일 PWA 테스트 완료
- [ ] Git Push → 자동 배포 테스트 완료

---

**배포 준비 완료!** 🎉

이제 `git push origin main`만 하면 자동으로 `m.querydaily.asyncsite.com`에 배포됩니다.

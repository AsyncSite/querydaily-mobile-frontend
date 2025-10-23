# Vercel CI/CD 자동 배포 설정 가이드

이 가이드는 GitHub Actions를 통해 Vercel에 자동으로 배포하는 방법을 설명합니다.
**Vercel 대시보드에서 수동으로 Import하지 않고**, CI/CD만으로 배포가 가능합니다.

## 🎯 배포 방식

- **Production 배포**: `main` 브랜치 push → `m.querydaily.asyncsite.com`
- **Preview 배포**: Pull Request 생성 → 임시 URL 자동 생성 + PR 코멘트

## 📋 사전 준비사항

### 1. Vercel CLI로 프로젝트 생성

로컬에서 한 번만 실행하여 Vercel 프로젝트를 생성합니다:

```bash
cd /Users/rene/asyncsite/querydaily-mobile-frontend

# Vercel 로그인
npx vercel login

# 프로젝트 링크 (최초 1회만)
npx vercel link

# 아래 질문에 답변:
# ? Set up "~/asyncsite/querydaily-mobile-frontend"? [Y/n] y
# ? Which scope should contain your project? AsyncSite (team_yMyeIOWNF6CbONPiTFgN1nEx)
# ? Link to existing project? [y/N] n
# ? What's your project's name? querydaily-mobile-frontend
# ? In which directory is your code located? ./
```

이 명령은 `.vercel/project.json` 파일을 생성합니다:
```json
{
  "projectId": "prj_xxxxx",
  "orgId": "team_xxxxx"
}
```

### 2. Vercel Token 발급

1. [Vercel Account Settings](https://vercel.com/account/tokens) 접속
2. **Create Token** 클릭
3. Token 이름: `querydaily-mobile-frontend-ci`
4. Scope: **Full Account**
5. Expiration: **No Expiration** (또는 원하는 기간)
6. 생성된 토큰 복사 (다시 볼 수 없으니 안전하게 보관)

### 3. GitHub Secrets 설정

GitHub 저장소에 다음 3개의 Secrets를 등록합니다:

1. [GitHub Repository Settings](https://github.com/AsyncSite/querydaily-mobile-frontend/settings/secrets/actions) 접속
2. **New repository secret** 클릭
3. 아래 3개 Secret 추가:

| Secret Name | Value | 설명 |
|------------|-------|------|
| `VERCEL_TOKEN` | `vercel_xxxxx...` | Vercel Token (위에서 발급) |
| `VERCEL_ORG_ID` | `team_yMyeIOWNF6CbONPiTFgN1nEx` | `.vercel/project.json`의 `orgId` |
| `VERCEL_PROJECT_ID` | `prj_xxxxx...` | `.vercel/project.json`의 `projectId` |

**값을 찾는 방법:**
```bash
# VERCEL_ORG_ID와 VERCEL_PROJECT_ID 확인
cat .vercel/project.json
```

## 🚀 배포 워크플로우 동작 방식

### Production 배포 (main 브랜치)

```bash
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
```

GitHub Actions가 자동으로:
1. ✅ 코드 체크아웃
2. ✅ Node.js 20 설치
3. ✅ Vercel CLI 설치
4. ✅ Vercel 환경 정보 가져오기
5. ✅ 프로젝트 빌드
6. ✅ Production 배포 (`m.querydaily.asyncsite.com`)
7. ✅ Discord 알림 발송 (배포 성공/실패)

### Preview 배포 (Pull Request)

```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin feature/new-feature
```

GitHub에서 Pull Request 생성 → GitHub Actions가 자동으로:
1. ✅ Preview 환경으로 빌드
2. ✅ 임시 Vercel URL에 배포 (예: `querydaily-mobile-frontend-git-feature-asyncsite.vercel.app`)
3. ✅ PR에 Preview URL 코멘트 추가
4. ✅ Discord 알림 발송

## 📁 관련 파일

```
querydaily-mobile-frontend/
├── .github/workflows/
│   ├── vercel-deploy.yml              # 메인 배포 워크플로우
│   └── vercel-discord-notification.yml # Discord 알림 (deployment_status 이벤트)
├── .vercel/
│   └── project.json                    # Vercel 프로젝트 정보 (git에 커밋됨)
├── vercel.json                         # Vercel 설정 (region, headers, rewrites)
└── .env.production                     # Production 환경변수 (Vercel에서 자동 사용)
```

## 🔍 배포 확인

### GitHub Actions 로그 확인
1. GitHub Repository → **Actions** 탭
2. 최근 워크플로우 실행 클릭
3. **deploy** 잡 로그 확인

### Vercel 대시보드 확인
1. [Vercel Dashboard](https://vercel.com/asyncsite/querydaily-mobile-frontend) 접속
2. **Deployments** 탭에서 배포 이력 확인
3. Production URL: `m.querydaily.asyncsite.com`

### Discord 알림 확인
배포 성공/실패 시 Discord에 자동 알림:
```
✅ QueryDaily Mobile 배포 성공
서비스: QueryDaily Mobile Frontend (PWA)
환경: Production
배포자: rene
커밋: a1b2c3d4
브랜치: main
시간: 2025-01-23 14:30:00 KST
배포 URL: m.querydaily.asyncsite.com
```

## 🛠️ 트러블슈팅

### 1. "Error: No token found"
→ GitHub Secrets에 `VERCEL_TOKEN`이 제대로 설정되었는지 확인

### 2. "Error: Project not found"
→ `VERCEL_PROJECT_ID`가 `.vercel/project.json`의 값과 일치하는지 확인

### 3. "Error: Team not found"
→ `VERCEL_ORG_ID`가 올바른지 확인 (AsyncSite 팀의 orgId)

### 4. 배포는 성공했는데 Discord 알림이 안 옴
→ `.github/workflows/vercel-discord-notification.yml`의 webhook URL 확인

### 5. Preview URL이 PR에 코멘트로 안 뜸
→ GitHub Actions에 **Read and write permissions** 권한 필요:
  - Repository Settings → Actions → General → Workflow permissions
  - **Read and write permissions** 선택

## 📚 참고 문서

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [GitHub Actions for Vercel](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎉 완료!

이제 `main` 브랜치에 push하거나 PR을 만들면 자동으로 Vercel 배포가 진행됩니다.
**Vercel 대시보드에서 수동 Import 없이** 순수 CI/CD로 배포되는 것을 확인할 수 있습니다! 🚀

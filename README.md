# 모바일 청첩장 템플릿 | Wedding Invitation Template

## 개요

React로 제작된 모던한 모바일 청첩장 웹사이트 템플릿입니다. 깔끔한 디자인을 특징으로 하며, 손쉽게 커스터마이징하여 자신만의 청첩장으로 만들 수 있습니다.

## 주요 기능

- 📱 반응형 디자인 - 모바일과 데스크톱 모두 지원
- ✨ 깔끔하고 모던한 UI
- 🚀 GitHub Pages 간편 배포
- 다양한 기능 지원
  - 🎞️ 이미지 갤러리
  - 🗺️ 웨딩홀 위치 지도 표시
  - 💌 방명록
  - 💬 카카오톡 공유
  - 🎯 참석 의사 전달

## 사전 요구사항

- Node.js (버전은 `.nvmrc` 파일에 명시)

## 시작하기

1. 저장소 복제:

```bash
git clone https://github.com/seongsik-choi/wedding-invitation.git
cd wedding-invitation
```

2. 의존성 설치:

```bash
npm install
```

3. 환경변수 설정:

환경변수 샘플은 `.env.example` 파일에 저장되어 있습니다. 이 파일을 복사하여 `.env` 파일을 생성하고 각 환경변수를 수정합니다.

```bash
cp .env.example .env
```

- `VITE_NAVER_MAP_CLIENT_ID`
  - 웨딩홀 위치를 표시하기 위한 네이버 지도 API 키
  - Naver Cloud Platform에서 발급 가능 (Dynamic Map API)
- `VITE_KAKAO_SDK_JS_KEY`
  - 카카오톡 공유하기 기능을 위한 KAKAO SDK 키
  - Kakao Developers에서 발급 가능 (JavaScript Key)
- `VITE_SERVER_URL`
  - 방명록과 참석 의사 전달 등을 위한 서버의 URL
  - 서버를 사용하지 않는 경우 비워두거나 설정하지 않음
  - 설정하지 않을 경우 소스코드상에 고정된 방명록만 보여줍니다.
    - 결혼식 끝난 이후 archive 용으로 사용 가능합니다. 지금까지 올라왔던 모든 방명록을 `offlineGuestBook.json`에 소스코드로 저장하여 read only로 보관해보세요.
- `VITE_STATIC_ONLY`
  - 방명록과 참석 의사 전달 기능은 별도의 서버를 호스팅해야 합니다.
  - 이 기능을 사용하지 않고 정적 웹사이트로만 운영하려면 이 환경변수를 `true`로 설정합니다.

4. 개발 서버 실행:

```bash
npm run dev
```

## 커스터마이징

1. `src/const.ts` 파일에서 웨딩 정보 수정:
   - 신랑 신부 이름
   - 결혼식 날짜
   - 예식장 위치
   - 연락처 및 축의금 계좌 정보

2. 이미지 교체
   - `src/images`: 표지 이미지 및 갤러리 이미지
   - `public/preview_image.png`: SNS 공유용 미리보기 이미지

3. 글귀 수정
   - `src/component/location`: 예식장 위치 관련 글귀 수정
   - `src/component/information`: 식사 안내 글귀 수정
   - 그 외 컴포넌트 디렉토리에서 관련 글귀 수정 가능

4. 스타일 수정:
   - SASS를 사용한 스타일링
   - Root의 `font-size`가 window size에 따라 변경되므로, rem 단위를 사용하여 반응형 디자인 구현. 가능하면 px와 같은 절대 단위 사용 지양.

## 배포하기

### GitHub Pages 배포 방법

1. `package.json`의 `homepage` 필드가 본인의 GitHub Pages URL로 설정되어 있는지 확인

2. GitHub 저장소에서 GitHub Pages 배포 관련 설정
   - Settings > Actions > General에서 "Workflow permissions"를 "Read and write permissions"로 설정
   - Settings > Pages에서 "Build and deployment" 소스를 "GitHub Actions"로 설정

3. GitHub 저장소의 Settings > Secrets and variables > Actions에서 환경변수 추가 (각 환경변수에 대한 설명은 위 환경변수 설정 참고)
   - Secrets:
     - `VITE_NAVER_MAP_CLIENT_ID`
     - `VITE_KAKAO_SDK_JS_KEY`
   - Variables:
     - `VITE_SERVER_URL`
     - `VITE_STATIC_ONLY`

4. `main` 브랜치에 푸시하면 자동으로 GitHub Pages에 배포됩니다.

### 다른 호스팅 플랫폼

이 프로젝트는 정적 웹사이트이므로 정적 파일을 제공하는 모든 플랫폼에서 호스팅할 수 있습니다.

1. `package.json`의 `homepage` 필드를 본인의 호스팅 플랫폼 URL로 수정

2. 환경변수 설정:
   - 환경변수 설정 방법은 위 환경변수 설정 참고

3. 프로젝트 빌드:

```bash
npm run build
```

4. `build` 디렉토리의 내용을 호스팅 플랫폼에 배포

## 📋 업데이트 내역

### 2025.01.XX - v0.2.0
- 🎬 동영상 갤러리 지원
  - 갤러리 섹션에 동영상(mp4) 추가 기능
  - main.mp4를 갤러리 첫 번째 항목으로 표시
  - 동영상 자동 재생, 반복 재생 지원
- 🎨 디자인 개선
  - 트렌디한 글래스모피즘(Glassmorphism) 효과 적용
  - 부드러운 그라데이션 배경 및 색상 팔레트 업데이트
  - 카드 디자인에 둥근 모서리 및 부드러운 그림자 효과
  - 버튼 스타일 개선 (그라데이션, 호버 애니메이션)
  - 모달 디자인 모던화 (슬라이드 업 애니메이션, 블러 배경)
  - 타이포그래피 개선 (그라데이션 텍스트, 간격 조정)
- 📱 UI/UX 개선
  - 연락처 표시 순서 개선 (신랑/신부 부모 → 신랑/신부)
  - 참석 의사 전달 모달 크기 및 레이아웃 최적화
  - 아이콘 크기 및 간격 조정
  - 반응형 디자인 개선

### 2025.11.14 - v0.1.0

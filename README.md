# StudyWith.

![스크린샷 2023-08-21 055137](https://github.com/JaeSeong17/web-portfolio/assets/37216958/4adb153f-8bf5-4147-9421-b932cb12ee0f)
<br />
<img src="https://img.shields.io/badge/nextdotjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwind&logoColor=white">
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
<br/>

개발 스터디 모집 플랫폼 토이 프로젝트입니다.<br/>
Airbnb의 UI를 참고했습니다. <br/>
프로젝트 배포 주소 : <br/>

#### 페이지 구성

| [Page Description](#page-description)                                                                         | [Modal Description](#modal-description)                               | [Api Description](#api-description) |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------- |
| - [Main Page (root)](#main-page-root) <br/> - [Study Page](#study-page) <br/> - [Planner Page](#planner-page) | - [LoginModal/RegisterModal]() <br/> - [OpenStudyModal/SearchModal]() |

---

```bash
src
├─actions           // ServerSideProps 함수
├─app
│  ├─api                // ClientSideProps 함수
│  │  ├─attend
│  │  ├─auth
│  │  ├─favorites
│  │  ├─journal
│  │  ├─journals
│  │  ├─register
│  │  ├─studies
│  │  └─studyRegister
│  ├─favorites          // 좋아요를 표시한 스터디 목록 페이지
│  ├─planner            // 스터디 일지 페이지
│  ├─study              // 스터디 상세 정보 페이지
│  ├─studyOwns         // 내가 개설한 스터디 목록 페이지
│  └─studyRegistrations // 내가 신청한 스터디 목록 페이지
├─components
│  ├─inputs             // 입력 컴포넌트
│  ├─modals             // 모달 창 컴포넌트
│  ├─navbar             // 상단부 바 컴포넌트
│  ├─planner            // 스터디 일지 구성 컴포넌트
│  └─studies            // 스터디 목록, 세부 정보 구성 컴포넌트
├─hooks             // 모달, query를 위한 커스텀 훅
├─libs              // 정적 데이터 리스트,
├─providers         // 모듈 적용을 위한 래퍼
└─types             // DB로부터 읽어오는 데이터 타입
```

---

## Page Description

최상위 layout 상단부에 navbar를 고정, 하단 부에 페이지가 전환 되는 방식.

---

### Navbar - 상단 바

구현 기능

- 메인 페이지 버튼 (좌측 상단 아이콘): 메인 페이지로 이동
- 조건 탐색 버튼(검색 적용): 조건 지정을 위한 모달 창 열기
- 새 스터디 등록 버튼: 새 스터디 등록 모달 창 열기
- 사용자 메뉴 버튼: 사용자 메뉴 토글 기능
- 카테고리 바: 스터디 카테고리 지정 (root page에서만 표시)

---

### Main Page (root)

![스크린샷 2023-08-20 062527](https://github.com/JaeSeong17/web-portfolio/assets/37216958/10b03c2f-44a5-4ad4-9e69-2492cc8c57da)

#### 컴포넌트 구조

## ![스크린샷 2023-08-23 172449](https://github.com/JaeSeong17/web-portfolio/assets/37216958/6a6d93b8-55cd-4645-a413-3147e8eeb931)

검색 결과 목록, 좋아요를 누른 스터디 목록, 내가 개설한 스터디 목록, 내가 신청한 스터디 목록이 동일한 레이아웃을 사용

#### 구현 기능

- 조회
  - 전체 스터디 목록
  - 카테고리 별 목록
- 좋아요 버튼 (좋아요를 누른 스터디 목록 페이지에서 조회 가능)
- (내가 개설한 스터디 목록 페이지일 경우) : 개설한 스터디 삭제
- (내가 신청한 스터디 목록 페이지일 경우) : 등록 취소

---

### Study Page

![스크린샷 2023-08-21 071730](https://github.com/JaeSeong17/web-portfolio/assets/37216958/c1b59ac8-c3d0-45c1-8e4b-e2ec61f2a85f)

#### 컴포넌트 구조

![스크린샷 2023-08-23 172457](https://github.com/JaeSeong17/web-portfolio/assets/37216958/c870d390-3ad7-4e0d-a866-bba9205d156b)

#### 구현 기능

- 스터디 상세 정보 조회
  - 스터디 간단 정보
    - 인원 수
    - 주 미팅 횟수
    - 진행 방식 (대면 / 비대면 / 유연)
    - 벌금 (지각, 결석)
  - 스터디 소개글
  - 스터디 기간 (달력으로 표시)
  - 지역 (카카오맵 사용)
- 스터디 멤버 관리
  - 스터디 개설자
    - 스터디 멤버 승인/거부
  - 스터디 참여자
    - 스터디 멤버 신청
- 스터디 상태 간략 표기 (스터디 멤버일 경우)
  - 스터디 멤버 리스트 (이름/이메일)
  - 스터디 미팅 진행 횟수
  - 스터디 참여율
- 스터디 플래너 진입 버튼
  - 스터디 플래너 페이지로 연결

---

### Planner Page

![스크린샷 2023-08-21 075249](https://github.com/JaeSeong17/web-portfolio/assets/37216958/f3676c46-7ba9-49c6-82ce-dd2b34910980)

#### 컴포넌트 구조

![스크린샷 2023-08-23 172506](https://github.com/JaeSeong17/web-portfolio/assets/37216958/17b02a22-f96f-4871-98c5-bbcf1dcdf773)

#### 구현 기능

- 스터디 일지 작성 (날짜별 작성 가능)
  - 스터디 회고 (공동 작성)
  - 오늘의 한마디 (개인 작성)
  - 이날의 활동 평가 (만족도 5단계)
- 스터디 통계 그래프 (Line Chart)
  - 스터디 참석률
  - 스터디 만족도
- 스터디 멤버 출결 관리(스터디 리더만 권한 보유)
  - 출석 / 지각 (미팅 요일시 활성화, 해당 날짜에 클릭하지 않으면 결석 처리)

---

## Modal Description

---

## Api Description

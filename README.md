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

#### 스펙 시트 목차

| [Page Description](#page-description)                                                                         | [Modal Description](#modal-description)                                                             | [Api Description](#api-description) |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- |
| - [Main Page (root)](#main-page-root) <br/> - [Study Page](#study-page) <br/> - [Planner Page](#planner-page) | - [Login/RegisterModal](#loginregistermodal) <br/> - [OpenStudy/SearchModal](#openstudysearchmodal) |

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
│  ├─studyOwn           // 내가 개설한 스터디 목록 페이지
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

<img src="https://github.com/JaeSeong17/web-portfolio/assets/37216958/6a6d93b8-55cd-4645-a413-3147e8eeb931" width="50%" height="50%"/>

> 검색 결과 목록, 좋아요를 누른 스터디 목록, 내가 개설한 스터디 목록, 내가 신청한 스터디 목록이 동일한 레이아웃을 사용

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

<img src="https://github.com/JaeSeong17/web-portfolio/assets/37216958/c870d390-3ad7-4e0d-a866-bba9205d156b" width="50%" height="50%"/>

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

<img src="https://github.com/JaeSeong17/web-portfolio/assets/37216958/17b02a22-f96f-4871-98c5-bbcf1dcdf773" width="50%" height="50%"/>

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

> Modal 컴포넌트는 Head(제목), Body(본문), Footer(버튼부) 3 부분으로 나뉨 <br/>
> Modal 컴포넌트는 템플릿으로 사용되는 공용 컴포넌트이며 모든 모달(Login, Register, OpenStudy, Search)은 Modal 컴포넌트에 기반

### Login/RegisterModal

<img src="https://github.com/JaeSeong17/web-portfolio/assets/37216958/860e2a6b-a2aa-4caf-91b3-d25cee4224b8" width="50%" height="50%"/>

> 로그인, 회원가입 모달창은 '단일' 스텝으로 구성되며 서로 전환 가능

### OpenStudy/SearchModal

<img src="https://github.com/JaeSeong17/web-portfolio/assets/37216958/9d67c544-e84e-4614-ba51-0e3ac6447064" width="50%" height="50%"/>

> 새 스터디 개설, 스터디 검색 모달창은 '다중' 스텝으로 구성되며 하단 버튼의 이전/다음 버튼으로 페이지 전환 가능

#### OpenStudyModal 스텝 구성

0. 카테고리 설정

   - 스터디 주제 카테고리를 지정 (프론트, 백, 알고리즘, 토이프로젝트 등)
   - 1개만 선택 가능

1. 스터디 소개

- 스터디 제목, 소제목을 입력

2. 스터디 세부 설명

- 스터디에 대한 소개글을 입력 (200자 제한)

3. 스터디 설정

- 인원 수, 모임 횟수(요일 지정), 운영방식(대면/비대면/유연)

4. 패널티(벌금) 설정

- 지각 / 결석 벌금 설정

5. 지역 설정

- 스터디 운영 지역 설정 (지도 표시)

6. 기간 설정

- 시작날짜와 종료날짜를 설정 (달력 표시)

7. 사진 추가

- 메인 이미지로 표시될 사진 업로드

#### SearchModal 스텝 구성 (검색 조건 설정)

0. 지역 설정
1. 운영방식 설정 (대면/비대면/유연)
2. 인원 수 설정

---

## Api Description

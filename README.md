# StudyWith.

![스크린샷 2023-08-20 222003](https://github.com/JaeSeong17/web-portfolio/assets/37216958/57e925a4-35c1-43d3-818b-a0124978b953)

<br />
<img src="https://img.shields.io/badge/nextdotjs-000000?style=for-the-badge&logo=next.js&logoColor=white">
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

##### 주요 기능

- 스터디 검색 (분류, 지역, 진행방식, 인원 수, 좋아요 여부에 따라 목록 표시)
- 스터디 등록 (스터디 주제, 지역, 날짜, 미팅 횟수, 벌금 설정)
- 스터디 멤버 관리 (가입 승인, 출결)
- 스터디 일지 (스터디 내용 기록, 평가, 출석률과 평가 통계)

---

# Project Specification

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
│  ├─studyOpens         // 내가 개설한 스터디 목록 페이지
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

# Page Description

layout 상단부에 navbar가 위치(고정)하고 하단 부에 페이지가 전환 되는 방식

## Main Page - 스터디 목록

![스크린샷 2023-08-20 062527](https://github.com/JaeSeong17/web-portfolio/assets/37216958/10b03c2f-44a5-4ad4-9e69-2492cc8c57da)

## Favorites Page - 좋아요 누른 스터디 목록

## StudyOpens Page - 내가 개설한 스터디 목록

## StudyRegistrations Page - 내가 신청한 스터디 목록

## Study Page - 스터디 상세 정보

## Planner Page - 스터디 일지

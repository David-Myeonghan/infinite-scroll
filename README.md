# infinite-scroll

Infinite scroll 구현 실습용 레포. Vite + React + TypeScript 기반.

## Stack

- Vite 8
- React 19
- TypeScript 6
- ESLint 10

## Getting Started

```bash
nvm use 22   # Node 20.19+ / 22.12+ 필요
npm install
npm run dev
```

## Scripts

| 명령어            | 설명                           |
| ----------------- | ------------------------------ |
| `npm run dev`     | 개발 서버 실행                 |
| `npm run build`   | 타입 체크 + 프로덕션 빌드      |
| `npm run preview` | 빌드 결과 미리보기             |
| `npm run lint`    | ESLint 실행                    |

## 구현 예정

- [ ] IntersectionObserver 기반 기본 무한 스크롤
- [ ] Window scroll 이벤트 기반 비교 구현
- [ ] 가상화(virtualization) 적용
- [ ] React Query `useInfiniteQuery` 연동

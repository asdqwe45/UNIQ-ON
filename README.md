## Commit convention
- feat: 새로운 기능 추가 또는 기능 관련

- fix: 버그 수정

- perf: 성능 개선을 위한 변경

- refactor: 기능 추가, 버그 수정의 목적이 아닌 코드 리팩토링을 담은 변경

- docs: 마크 다운 작성, 주석 작성 등의 문서 작업

- style: 코드의 의미를 변경하지 않는 formatting 등의 변경

- test: 테스트 관리를 위한 변경

- ci: CI를 위한 변경

- build: 빌드 설정, 개발툴 변경 등 사용자와 관련 없는 변경

- chore: 소스 파일 혹은 테스트 파일의 변화가 없는 단순 작업

- revert: 이전 커밋 취소

## Branch strategy
1. develop에서 주차별로 분기 ex) week1, week4
2. 서비스 단위로 분기 ex) collection, sale, nft
3. 프론트엔드는 front- 명시 백엔드는 back- 명시 세부 기능 단위로 분기 
ex) front-login ,back-login
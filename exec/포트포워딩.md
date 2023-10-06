# 프로젝트 사용 도구

1. 이슈 관리 : JIRA
2. 형상 관리 : Gitlab
3. 커뮤니케이션 : Notion, Mattermost
4. 디자인 : Figma
5. CI/CD : Jenkins

# 개발 환경

1. gradle version : 7.6.2
2. jdk : 17
3. JPA : 3.1.4
4. Fastapi : 0.90.1
5. Python : 3.10.5
6. Nodejs : 18.17.1
7. mysql : 8.0.33
8. Spring : 3.1.3
9. vscode : 1.79.2
10. Intellij IDEA : 2023.2.1 (Ultimate Edition)
11. DB : mysql (azure)
12. SERVER : AWS EC2 Ubuntu 20.04.3 LTS
13. NGINX : 1.18.0
14. Docker : 24.0.6

# 외부 서비스

1. 피나타(finata): nft Service(API키 필요)
2. 클로바OCR: 사진의 text를 불러옴(API키 필요)
3. ngrok: AI fastapi public url 생성(계정 연결 시 세션시간 연장)

# 빌드하기

1. front-react:

```
npm i
```

```
npm start
```

2. back-spring:

   gradle 실행
   Bootjar 실행

3. back-fastapi:

```
pip install -r requirements.txt
```

```
python launch.py
```

4. back-node:

```
npm i
```

```
npm start
```

# 환경 변수

    MYSQL_DATABASE: diti
    MYSQL_ROOT_PASSWORD: 1234
    TZ: Asia/Seoul
    SPRING_DATASOURCE_URL: 'jdbc:mysql://diti_mysql:3306/diti'
    SPRING_DATASOURCE_USERNAME: root
    SPRING_DATASOURCE_PASSWORD: 1234
    SPRING_JPA_HIBERNATE_DDL-AUTO: 'update'
    MYSQL_DATABASE: uniqon
    MYSQL_ROOT_PASSWORD: ssafyuniqon
    TZ: Asia/Seoul
    SPRING_DATASOURCE_URL: 'jdbc:mysql://uniqonMysql:3306/uniqon'
    SPRING_DATASOURCE_USERNAME: root
    SPRING_DATASOURCE_PASSWORD: ssafyuniqon
    SPRING_JPA_HIBERNATE_DDL-AUTO: 'update'
    SERVER_PORT: 5001
    REDIRECT_URL: https://j9c201.p.ssafy.io
    SPRING_SERVER_URI: http://uniqonSpringServer:5001
    DITI_SERVER_URL: https://j9c201.p.ssafy.io
    BC_NETWORK: 'https://gethrpc.ssafy-blockchain.com'
    BC_NETWORK_NAME: 'sepolia'
    BC_SMART_CONTRACT_ADDRESS: '0xc9C8Db9F05bF5A0ab10511Bc6Df56c300fbcf3B3'

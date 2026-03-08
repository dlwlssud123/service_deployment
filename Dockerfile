# 1. 웹 서버로 사용할 베이스 이미지를 선택합니다. (가볍고 성능이 좋은 nginx alpine 버전)
FROM nginx:alpine

# 2. 현재 폴더의 모든 파일(index.html, style.css, app.js 등)을 nginx의 기본 경로로 복사합니다.
COPY . /usr/share/nginx/html

# 3. 80번 포트를 외부에 공개합니다.
EXPOSE 80
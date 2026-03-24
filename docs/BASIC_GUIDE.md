# 🚀 웹 개발 기초 문법 가이드 (HTML, CSS, JS)

이 가이드는 웹 개발의 3대 요소인 HTML, CSS, JavaScript의 핵심 문법을 빠르게 익힐 수 있도록 정리한 자료입니다.

---

## 1. HTML (뼈대 잡기)
HTML은 웹페이지의 구조를 정의합니다. `<태그>` 형식을 사용합니다.

### 📌 핵심 태그
- `<div>`: 구역을 나눌 때 쓰는 가장 기본적인 박스 태그
- `<h1>` ~ `<h6>`: 제목 (1이 가장 크고 6이 가장 작음)
- `<p>`: 본문 텍스트 (문단)
- `<a>`: 하이퍼링크 (`href` 속성에 주소 입력)
- `<img>`: 이미지 (`src` 속성에 이미지 경로 입력)
- `<button>`: 클릭 가능한 버튼

### 💡 예시
```html
<div class="header">
    <h1>안녕하세요!</h1>
    <p>이것은 HTML 예시입니다.</p>
    <a href="https://naver.com">네이버로 이동</a>
</div>
```

---

## 2. CSS (옷 입히기)
CSS는 HTML 요소들에 스타일(색상, 크기, 간격 등)을 입힙니다.

### 📌 핵심 속성
- `color`: 글자 색상
- `background-color`: 배경 색상
- `font-size`: 글자 크기
- `padding`: 안쪽 여백 / `margin`: 바깥쪽 여백
- `border-radius`: 모서리 둥글게 하기
- `display: flex`: 요소들을 가로나 세로로 예쁘게 정렬할 때 쓰는 마법의 속성

### 💡 예시
```css
.header {
    background-color: #ff6b6b; /* 배경을 붉은색으로 */
    color: white;               /* 글자를 하얀색으로 */
    padding: 20px;              /* 안쪽 여백 20px */
    border-radius: 10px;        /* 모서리를 둥글게 */
    text-align: center;         /* 글자를 가운데 정렬 */
}
```

---

## 3. JavaScript (생명 불어넣기)
JavaScript는 클릭하면 무언가 변하게 하거나, 데이터를 계산하는 등의 동적인 기능을 담당합니다.

### 📌 핵심 문법
- **변수 (`let`, `const`)**: 데이터를 담는 상자
- **함수 (`function`)**: 반복되는 동작을 묶어둔 꾸러미
- **조건문 (`if`)**: "만약 ~라면 이렇게 해라"라는 규칙
- **이벤트 (`addEventListener`)**: "버튼을 클릭했을 때 이 함수를 실행해라" 같은 명령

### 💡 예시
```javascript
// 1. 변수 선언
const myName = "홍길동";

// 2. 함수 만들기
function sayHello() {
    alert("안녕하세요, " + myName + "님!");
}

// 3. 버튼 클릭 이벤트 연결
// HTML에 <button id="myBtn">이 있다고 가정
document.getElementById('myBtn').addEventListener('click', sayHello);
```

---

## 🏁 학습 팁!
1. **F12(개발자 도구)**: 브라우저에서 F12를 누르면 다른 웹사이트들이 HTML/CSS를 어떻게 썼는지 다 훔쳐볼 수 있습니다.
2. **직접 수정**: 지금 이 프로젝트의 `index.html`, `style.css`, `app.js` 코드를 한 줄씩 지워보거나 바꿔보면서 어떻게 변하는지 확인해 보세요.
3. **구글링**: 모르는 게 나오면 `CSS 버튼 중앙 정렬`, `JS 랜덤 숫자 만들기` 처럼 검색하면 수만 가지 예제가 나옵니다.

즐거운 코딩 되세요! 🔥

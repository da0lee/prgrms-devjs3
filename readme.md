# 1주차 README

> index.html

### src/main.js 가 가장 아래 있는 이유
앞선 utility들을 실행하고 마지막에 main.js 실행하라는 의미

<br/>

> api.js

### 바뀌지 않는 상수값은 대문자로 표현

```js
const API_ENDPOINT ="http://localhost:4001";
```

<br/>

> darkModeToggle.js

### DarkMode Toggle 

```js
class DarkModeToggle {
  // state

  isDarkMode = null;

  // element 생성, event 등록,

  constructor({ $target }) {
    const $DarkModeToggle = document.createElement('input');
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = 'checkbox';

    $DarkModeToggle.className = 'DarkModeToggle';
    $target.appendChild($DarkModeToggle);

    $DarkModeToggle.addEventListener('change', (e) => {
      this.setColorMode(e.target.checked);
    });
    this.initColorMode();
  }

  // 활용할 함수들 정의
  // constructor 안에 있어도 동작하지만, 더 깔끔하게 코드륵 작성하기 위해 바깥 쪽에 함수로 분리
  // this.isDarkMode의 경우 지금처럼 직접 할당하는 것보다 setState() 를 사용하는 것이 좋다.

  initColorMode() {
    // 초기화
    // isDarkMode state, checked 상태, html attribute
    this.isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matchs;
    // os의 darkmode 여부에 따라 우리가 만든 toggle btn의 클릭상태 결정
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }

  // os의 darkmode 여부에 따라 body의 color-mode 설정
  setColorMode(isDarkMode) {
    document.documentElement.setAttribute('color-mode', isDarkMode ? 'dark' : 'light');
  }

  render() {}
}
```

<br/>

### CSS의 선택자 / 변수

> style.css

```css
/* ':' : 선택자 */
/* '--' : css 변수 정의 */
:root[color-mode='light'] {
  --background: #fff;
  --color: #000;
  --primary: #01408e;
}

:root[color-mode='dark'] {
  --background: #000;
  --color: #fff;
  --primary: #8fceff;
}

/*  정의한 변수들의 실제 사용 */
 body * {
  font-family: Goyang;
  background-color: var(--background);
  color: var(--color);
}
```

<br/>

### Sementic markup

html은 본래 웹상의 문서를 나타내기 위함. 현재는 문서의 개념보다는 동적인 App의 느낌이 더 강하지만, 아무 의미없는 div로 모든 태그를 작성하는 것보다 section, article 등 의미를 부여해 작성하는 것이 나, 그리고 함께 일하는 개발자들이 읽었을 때도 의미파악을 하는 것에 도움을 준다.


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

### DarkMode Toggle 풀이

```js
class DarkModeToggle {
  // state

  isDarkMode = null;

  // element 생성, event 등록

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
  // constructor 안에 있어도 동작하지만, 1. 역할의 분리와 재사용 2. 가독성(깔끔한 코드)를 위해 바깥쪽에 method 분리
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

### DarkMode Toggle 나의 풀이 1-1

```js
class DarkLightBtn {
  $darkLightBtn = null;
  osDarkMode = null;
  getColorMode = null;

  constructor({ $target }) {
    const $darkLightLable = document.createElement('label');
    const $darkLightBtn = document.createElement('input');
    const $darkLightSlider = document.createElement('span');
    this.$darkLightLable = $darkLightLable;
    this.$darkLightBtn = $darkLightBtn;
    this.$darkLightSpan = $darkLightSlider;

    $darkLightBtn.type = 'checkbox';
    $darkLightBtn.className = 'darkLightBtn';
    $darkLightSlider.className = 'darkLightSlider';

    $target.appendChild($darkLightLable);
    $darkLightLable.appendChild($darkLightBtn);
    $darkLightLable.appendChild($darkLightSlider);

    // localStorage에서 가져온 color-mode / light, dark
    this.getColorMode = localStorage.getItem('color-mode');

    // 지금 내가 짠 로직은 os의 darkmode가 사용자의 toggle 설정여부 보다 우위로 적용되고 있다.
    // os의 Darkmode 값을 여부로 localStorage에 color-mode 값을 저장할 것이 아니라 사용자의 toggle 클릭 여부를 기점으로 저장해야 한다. 
    // 최초 진입시 color-mode를 설정하기 위한 로직
    if (this.osDarkMode) {
    // os의 다크모드 설정여부. 값이 boolean으로 반환된다.
    this.osDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;

      document.documentElement.setAttribute('color-mode', 'dark');
      localStorage.setItem('color-mode', 'dark');
    } else {
      document.documentElement.setAttribute('color-mode', 'light');
      localStorage.setItem('color-mode', 'light');
    }

    $darkLightBtn.addEventListener('change', (e) => {
      this.getColorMode = this.getColorMode === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('color-mode', this.getColorMode);
      localStorage.setItem('color-mode', this.getColorMode);
    });
  }
}
```

<br/>

### DarkMode Toggle 나의 풀이 1-2

```js
class DarkLightBtn {
  $darkLightLable = null;
  $darkLightBtn = null;
  $darkLightSlider = null;
  osDarkMode = null;
  getColorMode = null;

  constructor({ $target }) {
    const $darkLightLable = document.createElement('label');
    const $darkLightBtn = document.createElement('input');
    const $darkLightSlider = document.createElement('span');
    this.$darkLightLable = $darkLightLable;
    this.$darkLightBtn = $darkLightBtn;
    this.$darkLightSpan = $darkLightSlider;

    $darkLightBtn.type = 'checkbox';
    $darkLightBtn.className = 'darkLightBtn';
    $darkLightSlider.className = 'darkLightSlider';

    $target.appendChild($darkLightLable);
    $darkLightLable.appendChild($darkLightBtn);
    $darkLightLable.appendChild($darkLightSlider);

    this.getColorMode = localStorage.getItem('color-mode');

    this.initColorMode();

    $darkLightBtn.addEventListener('click', () => {
      this.setColorMode();
    });
  }

  initColorMode() {
    // boolean으로 반환된 것을 'dark' : 'light';로 변형해 getColorMode와 맞춰주었다.
    this.osDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches ? 'dark' : 'light';
    console.log(this.osDarkMode);

    if (this.getColorMode) {
      document.documentElement.setAttribute('color-mode', this.getColorMode);
    } else {
      // 위에서 osDarkMode와 getColorMode의 type을 맞춰주었으므로 분기처리가 줄어들었다.
      document.documentElement.setAttribute('color-mode', this.osDarkMode);
    }
  }

  setColorMode() {
    this.getColorMode = this.getColorMode === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('color-mode', this.getColorMode);
    localStorage.setItem('color-mode', this.getColorMode);
  }
}
```

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

html은 본래 웹상의 문서를 나타내기 위함. 현재는 문서의 개념보다는 동적인 App의 느낌이 더 강하지만, 아무 의미없는 div로 모든 태그를 작성하는 것보다 section, article 등 의미를 부여해 작성하는 것이 나, 그리고 함께 일하는 개발자들이 읽었을 때도 의미 파악에 도움을 준다.

<br/>

# 2주차 README

> Loading.js

```js
class Loading {
  $loading = null;
  data = null;

  constructor({ $target }) {
    const $loading = document.createElement('div');
    this.$loading = $loading;

    $loading.className = 'Loading';
    $target.appendChild($loading);

    this.data = {
      show: false,
    };

    this.render();
  }

  show() {
    // setState를 실행시켜 this.data를 nextData로 바꾼다.
    // this.data = show / nextData = true
    this.setState({ show: true });
  }

  hide() {
    this.setState({ show: false });
  }

  setState(nextData) {
    // state 변경 후 
    this.data = nextData;
    // render안의 내용 실행 시킨다
    // render함수 호출을 안하면 state 변경만 하고 아무런 UI적 변화가 일어나지 않는다.
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$loading.innerHTML = `
      <p>😺 고양이 소환 중 😺</p>
      `;
    } else {
      this.$loading.innerHTML = '';
    }
  }
}
```

> App.js
```js
this.loading = new Loading({
  $target
})

this.searchInput = new SearchInput({
  $target,
  onSearch: (keyword) => {
    // loading Component를 보여줄 '시점 잡기'
    // api 요청 전 loading show
    this.loading.show();

    api.fetchCats(keyword).then(({ data }) => {
      // api 요청하고 data 넘어오면 loading hide
      this.setState(data);
      this.loading.hide();
    });
  },
});
```


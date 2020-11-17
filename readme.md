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
// DarkLightBtn => DarkLightToggle
// 정확히는 button태그가 아닌 checkbox type의 input이다. 기능을 좀 더 직관적으로 드러내기 위해 toggle로 명칭 변경 
class DarkLightToggle {
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

> KeywordHistory.js

### 최근 검색어 저장

<br/>

> KeywordHistory

```js
class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement('ul');
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = 'KeywordHistory';
    this.onSearch = onSearch;

    $target.appendChild(this.$keywordHistory);

    // constructor안에서 data(state) 초기화, render
    this.init();
    this.render();
  }

  // 컴포넌트 실행될 때 data(state) 업데이트
  init() {
    const data = this.getHistory();
    this.setState(data);
  }

  // SearchInput에서 e.target.value를 인자(keyword)로 전달해 주었다.  
  addKeyword(keyword) {
    let keywordHistory = this.getHistory();
    keywordHistory.unshift(keyword);
    // 최근 검색결과가 5개 까지만 보이도록
    keywordHistory = keywordHistory.slice(0, 5);
    // localHistory에 keywordHistory저장. localHistory에는 string 형태만 저장이 되므로, 입력값을 ,로 join해준다. (join: 배열 내 요소들을 합쳐 string값으로 반환) 
    localStorage.setItem('keywordHistory', keywordHistory.join(','));
    // e.target.value 더한 값으로 다시 초기화(setState)
    this.init();
  }
  
  // localStorage의 keywordHistory 가져옴. 아직 값이 저장되기 전이면 배열(keywordHistory)에 붙힌 method 들에 err가 발생하므로 [] 빈 배열을 반환하게 처리해준다.
  getHistory() {
    return localStorage.getItem('keywordHistory') === null ? [] : localStorage.getItem('keywordHistory').split(',');
  }

  // state 변경하고, 바뀐 결과 rendering
  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map(
        (keyword) => `
    <li><button>${keyword}</button></li>
    `
      )
      .join('');

    // 매 keyword들 마다 event감지기를 붙힌다. 
    // click시 해당 el을 SearchInput의 onSerach()에 전달. 
    this.$keywordHistory.querySelectorAll('li button').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onSearch(this.data[index]);
      });
    });
  }
}
```

<br/>

> SearchInput

```js
class SearchInput {
  keywords = [];

  constructor({ $target, onSearch }) {
    const $wrap = document.createElement('section');
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';

    $searchInput.className = 'SearchInput';
    $target.appendChild($wrap);
    $wrap.appendChild($searchInput);

    // 'keyup' event는 한글 입력 시 event가 두번씩 일어나 'keypress'로 변경
    $searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
        // 최근 키워드 저장
        this.KeywordHistory.addKeyword(e.target.value);
      }
    });
    // KeywordHistory component 불러옴
    this.KeywordHistory = new KeywordHistory({
      $target,
      onSearch,
    });
  }
}

```

<br/>

> App.js

```js
class App {
  $target = null;
  data = [];

  constructor($target) {
   
    ... 

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.loading.showLoading();
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.hideLoading();
          this.setState(data);
          // 검색 이벤트 이후 localStorage에 [key: 'lastResult', value: 방금 검색어의 검색결과 저장
          this.saveResult(data);
        });
      },
    });

    // app 실행 시 마지막 검색결과 노출
    this.init();
  }

  ...
  // App 실행시 init()을 하는데, init() 시 this.setState에 마지막 검색결과인 this.lastResult를 전달해주면 그걸 다시 검색결과를 보여주는 component인 searchResult의 setState에 전달해주므로 App 처음 실행 시 마지막 검색결과를 볼 수 있다.
  setState(nextData) {
  console.log(this);
  this.data = nextData;
  this.searchResult.setState(nextData);
  }

  // server에서 result가 object 형태로 들어오고, localstorage에는 string 형태로만 저장이 되므로 JSON.stringify 
  saveResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    const lastResult =
      // localStorage에 lastResult가 string 형태로 저장되어 있으므로 JSON.parse 하여 사용가능한 data type으로 변경해준다.
      localStorage.getItem('lastResult') === null ? [] : JSON.parse(localStorage.getItem('lastResult'));
    this.setState(lastResult);
  }
}
```

### 상세정보 불러오기

<br/>

> App.js
```js

  ...

  this.searchResult = new SearchResult({
    $target,
    lastResult: this.lastResult,
    initialData: this.data,
    // 처음 랜더링 할 때 부터 detail 정보가 필요한 것은 아니기 때문에 App이 아닌 ImageInfo component에서 api 요청을 한다.
    onClick: (cat) => {
      // 요청했을 때 바로 setState로 가는 것이 아니라 showDetail을 거쳐 전달
      // click event 일어나면 visible을 true로 바꾸고, click한 cat(Item)의 정보 catData에 할당
      this.imageInfo.catDetails({
        visible: true,
        catData: cat,
      });
    },
  });

  this.imageInfo = new ImageInfo({
    $target,
    data: {
      visible: false,
      catData: null,
    },
  });

  ...

```

<br/>

> ImageInfo.js

```js
class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  catDetails(datas) {
    api.fetchCatDetail(datas.catData.id).then(({ data }) => {
      this.setState({
        visible: true,
        catData: data,
      });
    });
  }
  
  // 중복 코드 분리
  imageInfoDisplayNone() {
    this.$imageInfo.style.display = 'none';
  }

  // close btn 로직이 길어져 따로 분리.
  closeImageInfo() {
    this.$imageInfo.addEventListener('click', (e) => {
      if (e.target.className === 'close' || e.target.className === 'ImageInfo') {
        this.imageInfoDisplayNone();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.imageInfoDisplayNone();
      }
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.catData;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <head class="title">
            <h2>${name}</h2>
            <button type="button" class="close">x</button>
          </head>
          <div class="img-container">       
            <img src="${url}" alt="${name}"/>
          </div>
          <div class="description">
            <p>성격: ${temperament}</p>
            <p>태생: ${origin}</p>
          </div>
        </div>`;
      this.$imageInfo.style.display = 'block';
      // 실행만
      this.closeImageInfo();
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}

```

<br/>

> api.js

```js
const API_ENDPOINT = 'http://localhost:4001';

const api = {

  ...

  fetchCatDetail: (id) => {
    return fetch(`${API_ENDPOINT}/api/cats/${id}`).then((res) => res.json());
  },
};

```

<br/>

### Infinity Scroll / Lazy Loading

https://egg-programmer.tistory.com/275

> SearchResult.js
```js
class SearchResult {
  $wrap = null;
  $searchResult = null;
  data = null;
  keyword = null;
  lastResult = null;
  onClick = null;
  onNextPage = null;

  constructor({ $target, lastResult, initialData, keyword, onClick, onNextPage }) {
    const $wrap = document.createElement('section');
    const $searchResult = document.createElement('ul');
    this.$searchResult = $searchResult;

    this.$searchResult.className = 'SearchResult';
    $target.appendChild($wrap);
    $wrap.appendChild($searchResult);

    this.data = initialData;
    this.keyword = keyword;
    this.lastResult = lastResult;
    this.onClick = onClick;
    this.onNextPage = onNextPage;
    this.render();
  }

  setKeyword(nextKeyword) {
    this.keyword = nextKeyword;
  }

  setState(nextData) {
    this.data = nextData;
    this.lastResult = nextData;
    this.render();
  }

  // items : 객체 목록, observer : 관찰자 parameter로 전달
  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      // isIntersectiong: 타겟 요소가 현재 교차 루트와 교차하는지 여부를 boolean 값으로 알려줌.
      // 아이템이 화면에 보일 때
      if (item.isIntersecting) {
        // Lazy loading : 레이기존에 placeholder로 차지하고 있던 공간에 진짜 img src 대입
          // 이미지를 로드
        item.target.querySelector('img').src = item.target.querySelector('img').dataset.src;
      
        // 마지막 요소를 찾아내고
        let dataIndex = Number(item.target.dataset.index);
        // 마지막 요소라면 onNextPage 호출
        if (dataIndex=== this.data.length -1) {
          this.onNextPage();
        }
      }
    });
  });

  render() {
    if (this.keyword == null && (this.lastResult == null || this.lastResult.length == 0)) {
      return;
    }

    if (this.data?.length > 0) {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat, index) => `
        <li class="item" data-index=${index}>
          <img src='https://via.placeholder.com/200x300' data-src=${cat.url} alt=${cat.name} />
        </li>
      `
        )
        .join('');
    } else {
      this.$searchResult.innerHTML = `
      <div class="noItem">
        <p>🐈<br/>요청하신 고양이를<br/>찾을 수 없습니다.</p>
      </div>`;
    }

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });
      // Observer 등록
      // observe method의 인자에 target 요소를 넣어 관찰 시작
      this.listObserver.observe($item);
    });
  }
}

```

<br/>

> App.js
```js

class App {
  $target = null;
  data = [];
  lastResult = null;
  // page 정의
  page = 1;

  ... 

  this.searchResult = new SearchResult({
    $target,
    lastResult: this.lastResult,
    initialData: this.data,
    onClick: (cat) => {
      this.imageInfo.catDetails({
        visible: true,
        catData: cat,
      });
    },
    onNextPage: () => {
      // 전달할 검색어
      const recentKeywords = localStorage.getItem('recentKeywords')
        ? localStorage.getItem('recentKeywords').split(',')
        : [];
      // 전달할 page 
      const page = this.page + 1;
      this.loading.showLoading();
      api.fetchNextCats(recentKeywords, page).then(({ data }) => {
        // newData : 넘어온 새로운 data를 기존 data 뒤에 붙혀주었다.
        let newData = this.data.concat(data);
        this.loading.hideLoading();
        // setState에서 검색결과를 뿌려주는 searchResult component에 뿌려줄 data값을 관리하고 있으므로 concat한 data를 setState에 전달해준다.
        this.setState(newData);
        // const page = this.page + 1; 까지만 하면 page가 1 +1 = 2에서 변하지 않으므로 더한 값 this.page에 재 할당 
        this.page = page;
      });
    },
  });

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  ...

}

```

<br/>

> api.js
```js
const API_ENDPOINT = 'http://localhost:4001';

const api = {

  ... 

  fetchNextCats: (keyword, page) => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`).then((res) => res.json());
  },

  ...

};

```

### 이벤트 위임

https://ko.javascript.info/event-delegation

- 많은 핸들러를 할당하지 않아도 되기 때문에 초기화가 단순해지고 메모리가 절약된다.
- 요소를 추가하거나 제거할 때 해당 요소에 할당된 핸들러를 추가하거나 제거할 필요가 없기 때문에 코드가 짧아진다.

<br/>

# 3주차 README

### Module

https://velog.io/@takeknowledge/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88-%ED%95%99%EC%8A%B5-%EB%82%B4%EC%9A%A9-%EC%9A%94%EC%95%BD-lwk4drjnni

- export한 각각의 모듈은 독립된 Scope를 갖고 있기 때문에 import하지 않으면 사용할 수 없다.
- 일부 module 시스템에선 확장명을 생략할 수 있지만, 네이티브 자바스크립트에서는 확장명이 있어야 한다.

#### export default
- 한 파일에서 하나의 개체만 넘길 수 있기 때문에 이름없는 함수, 배열도 넘길 수 있다.
```js
export default fuction(temp) {
alert(`오늘 낮 최고기온은 ${temp} °C 입니다.`)
} 
```

<br/>

```js
export default ['봄','여름','가을','겨울']
```

<br/>

export default sayTemp() 와 동일
```js
function sayTemp(temp) {
  alert(`오늘 낮 최고기온은 ${temp} °C 입니다.`)

  export {sayTemp as default}
}
```

<br/>

```js
import { api as authApi } from './auth';
import { api as usersApi } from './users';
import { api as postsApi } from './posts';

const apis = { authApi, usersApi, postsApi };

export default apis;
```

<br/>

### API 요청 결과 처리

<br/>

API statuse : https://www.codota.com/code/javascript/functions/axios/AxiosResponse/status     

Fetch API : https://www.zerocho.com/category/HTML&DOM/post/595b4bc97cafe885540c0c1c     

Promise : https://www.zerocho.com/category/jQuery/post/57c90814addc111500d85a19

try...catch : https://ko.javascript.info/try-catch

<br/>
<hr/>
<br/>

try..catch는 동기적으로 동작한다.     
setTimeout처럼 ‘스케줄 된(scheduled)’ 코드에서 발생한 예외는 try..catch에서 잡아낼 수 없다.


## package.json

```js
"start": "npm run crawling && node app.js",
"crawling": "node generateData"
```

-   start시 crwling 명령어 먼저 실행됌
-   generateData 폴더 실행

## 크롤링

-   https://thecatapi.com/
-   각 id 마다 100개씩 총 10페이지 가지고옴
-   file system으로 파일 저장 -> const fs = require('fs');
-   fs.wireFile
-   json 폴더로 저장하고 실제로는 저장된 데이터 불러와서 사용
-   api는 처음에만 사용한다.

## Static 폴더 사용

-   url 경로로 폴더 접근가능
-   express.static

```js
// public폴더에 접근가능하다
app.use(express.static(`${__dirname}/public`));
// http://localhost:4001/2.jpg
app.use("uploads", express.static(`${__dirname}/public`));
// http://localhost:4001/uploads/2.jpg
```

## lodash - shuffle

-   https://lodash.com/docs/4.17.15
-   배열 임의로 섞어준다.

## 라우터

-   express 사용시 router.get(/path, (request, response)) => {} 구조
-   request: 클라이언트가 서버쪽으로 넘겨줌
-   response: 서버에서 처리 후 데이터 또는 에러 넘겨줌

```js
// api/cats/random50
// api/cats/search
// api/cats/:id
```

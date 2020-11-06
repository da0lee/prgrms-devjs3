// const TEMPLATE = '<input type="text">';
// class SearchInput {
//   keywords = [];

//   constructor({ $target, onSearch }) {
//     const $wrap = document.createElement('section');
//     const $searchInput = document.createElement('input');
//     this.$searchInput = $searchInput;
//     this.$searchInput.placeholder = '고양이를 검색해보세요.|';

//     $searchInput.className = 'SearchInput';
//     $target.appendChild($wrap);
//     $wrap.appendChild($searchInput);

//     $searchInput.addEventListener('keyup', (e) => {
//       if (e.keyCode === 13) {
//         onSearch(e.target.value);

//         this.setLocalStorageKeywords(e.target.value);
//       }
//     });

//   setLocalStorageKeywords(keyword) {
//     this.keywords.push(keyword);
//     localStorage.setItem('recent-keyword', JSON.stringify(this.keywords));
//     console.log(this.keywords);
//   }
// }

const TEMPLATE = '<input type="text">';
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

    $searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);

        // 최근 키워드 저장
        this.KeywordHistory.addKeyword(e.target.value);
      }
    });

    this.keywordHistory = new KeywordHistory({ $target, onSearch });
  }

  setLocalStorageKeywords(keyword) {
    this.keywords.push(keyword);
    localStorage.setItem('recent-keyword', JSON.stringify(this.keywords));
    console.log(this.keywords);
  }
}

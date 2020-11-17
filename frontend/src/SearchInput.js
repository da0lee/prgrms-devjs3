import RandomSearchBtn from './RandomSearchBtn.js';
import RecentKeyword from './RecentKeyword.js';

const TEMPLATE = '<input type="text">';
export default class SearchInput {
  $wrap = null;
  $searchInput = null;
  value = null;
  onSearch = null;
  onRandomSearch = null;

  constructor({ $target, page, onSearch, onRandomSearch }) {
    const $wrap = document.createElement('section');
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.setAttribute('autofocus', true);
    this.page = page;

    $searchInput.className = 'SearchInput';
    $target.appendChild($wrap);
    $wrap.appendChild($searchInput);

    $searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
        this.recentKeyword.setRecentKeywords(e.target.value);
      }
    });

    $searchInput.addEventListener('click', (e) => (e.target.value = ''));

    this.randomSearchBtn = new RandomSearchBtn({
      $target: $wrap,
      onRandomSearch,
    });

    this.recentKeyword = new RecentKeyword({
      $target,
      page,
      onSearch,
    });
  }

  setInputValue(nextValue) {
    this.$searchInput.value = nextValue;
  }
}

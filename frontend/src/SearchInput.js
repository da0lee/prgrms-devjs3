import RandomSearchBtn from './RandomSearchBtn.js';
import SelectLimitResults from './SelectLimitResults.js';
import RecentKeyword from './RecentKeyword.js';

const TEMPLATE = '<input type="text">';
export default class SearchInput {
  $wrap = null;
  $searchInput = null;
  value = null;
  limit = 25;
  page = null;
  onSearch = null;
  onRandomSearch = null;

  constructor({ $target, page, onSearch, onRandomSearch }) {
    const $wrap = document.createElement('section');
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.setAttribute('autofocus', true);
    this.page = page;

    $wrap.className = 'SearchInputWrap';
    $searchInput.className = 'SearchInput';
    $target.appendChild($wrap);
    $wrap.appendChild($searchInput);

    $searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value, this.limit);
        this.recentKeyword.setRecentKeywords(e.target.value);
      }
    });

    $searchInput.addEventListener('click', (e) => (e.target.value = ''));

    this.selectLimitResults = new SelectLimitResults({
      $target: $wrap,
      $searchInput,
      setLimit: (nextLimit) => {
        this.limit = nextLimit;
      },
    });

    this.randomSearchBtn = new RandomSearchBtn({
      $target: $wrap,
      onRandomSearch,
    });

    this.recentKeyword = new RecentKeyword({
      $target: $wrap,
      page,
      limit: this.limit,
      onSearch,
    });
  }

  setInputValue(nextValue) {
    this.$searchInput.value = nextValue;
  }
}

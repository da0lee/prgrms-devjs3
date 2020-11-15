export default class RecentKeyword {
  $wrap = null;
  $recentKeywordUl = null;
  recentKeywords = [];
  page = null;
  onSearch = null;

  constructor({ $target, page, onSearch }) {
    const $wrap = document.createElement('section');
    const $recentKeywordText = document.createElement('span');
    const $recentKeywordUl = document.createElement('ul');
    this.$recentKeywordText = $recentKeywordText;
    this.$recentKeywordUl = $recentKeywordUl;
    this.page = page;
    this.onSearch = onSearch;

    $recentKeywordText.className = 'RecentKeywordText';
    $recentKeywordUl.className = 'RecentKeywordUl';
    $target.appendChild($wrap);
    $wrap.appendChild($recentKeywordText);
    $wrap.appendChild($recentKeywordUl);

    this.init();
    this.render();
  }

  init() {
    const recentKeywords = this.getRecentKeywords();
    this.setState(recentKeywords);
  }

  setRecentKeywords(keyword) {
    if (!this.recentKeywords.includes(keyword)) {
      this.recentKeywords = [keyword, ...this.recentKeywords];
    }
    this.recentKeywords = this.recentKeywords.slice(0, 5);
    localStorage.setItem('recentKeywords', this.recentKeywords);
    this.init();
  }

  getRecentKeywords() {
    return localStorage.getItem('recentKeywords') ? localStorage.getItem('recentKeywords').split(',') : [];
  }

  setState(nextData) {
    this.recentKeywords = nextData;
    this.render();
  }

  render() {
    this.$recentKeywordText.innerHTML = `
    <span>최근 검색어 : </span>
    `;

    this.$recentKeywordUl.innerHTML = this.recentKeywords
      .map((keyword) => `<li><a href="#">${keyword}</a></li>`)
      .join('');

    this.$recentKeywordUl.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      if (e.target && e.target.nodeName === 'A') {
        this.onSearch(e.target.innerHTML);
        this.page = 1;
      }
    });
  }
}

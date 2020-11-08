class RecentKeyword {
  $wrap = null;
  $recentKeywordUl = null;
  recentKeywords = [];

  constructor({ $target, onSearch }) {
    const $wrap = document.createElement('section');
    const $recentKeywordText = document.createElement('span');
    const $recentKeywordUl = document.createElement('ul');
    this.$recentKeywordText = $recentKeywordText;
    this.$recentKeywordUl = $recentKeywordUl;
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
    this.recentKeywords.unshift(keyword);
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
      if (e.target && e.target.nodeName === 'A') {
        this.onSearch(e.target.innerHTML);
      }
    });
  }
}

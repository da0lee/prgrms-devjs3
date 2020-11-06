class RecentKeyword {
  $wrap = null;
  $recentKeywordUl = null;
  $recentKeywordLi = null;
  getRecentKeywords = null;
  recentKeywords = [];

  constructor({ $target, getRecentKeywords }) {
    const $wrap = document.createElement('section');
    const $recentKeywordText = document.createElement('span');
    const $recentKeywordUl = document.createElement('ul');
    const $recentKeywordLi = document.createElement('li');
    this.$recentKeywordText = $recentKeywordText;
    this.$recentKeywordUl = $recentKeywordUl;
    this.$recentKeywordLi = $recentKeywordLi;

    $recentKeywordText.className = 'recentKeywordText';
    $recentKeywordUl.className = 'RecentKeywordUl';
    $target.appendChild($wrap);
    $wrap.appendChild($recentKeywordText);
    $wrap.appendChild($recentKeywordUl);
    $recentKeywordUl.appendChild($recentKeywordLi);

    this.getRecentKeywords = getRecentKeywords;
    this.recentKeywords = getRecentKeywords();

    this.render();
  }

  render() {
    this.$recentKeywordText.innerHTML = `
    <span>최근 검색어 : </span>
    `;

    if (this.recentKeywords) {
      this.$recentKeywordLi.innerHTML = this.recentKeywords.map((keyword) => `<li>${keyword}</li>`);
    }
  }
}

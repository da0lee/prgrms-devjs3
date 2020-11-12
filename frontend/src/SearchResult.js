class SearchResult {
  $wrap = null;
  $searchResult = null;

  data = null;
  keyword = null;
  lastResult = null;
  recentKeyword = null;
  page = 1;

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

  observer = new IntersectionObserver(
    (items, observer) => {
      const recentKeyword = localStorage.getItem('recentKeywords')
        ? localStorage.getItem('recentKeywords').split(',')[0]
        : [];

      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.querySelector('img').src = item.target.querySelector('img').dataset.src;
          let itemIndex = Number(item.target.children[0].dataset.index);
          if (itemIndex === this.data.length - 1) {
            this.page += 1;
            this.onNextPage(recentKeyword, this.page);
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  render() {
    if (this.keyword == null && (this.lastResult == null || this.lastResult.length == 0)) {
      return;
    }

    if (this.data?.length > 0) {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat, index) => `
        <li class="item">
          <img src='https://via.placeholder.com/200x300' data-src=${cat.url}  data-index=${index} alt=${cat.name} />
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

    this.$searchResult.addEventListener('click', (e) => {
      this.onClick(this.data[e.target.dataset.index]);
    });

    this.$searchResult.querySelectorAll('.item').forEach(($item) => this.observer.observe($item));
  }
}

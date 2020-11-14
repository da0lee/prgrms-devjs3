class SearchResult {
  $wrap = null;
  $searchResult = null;

  data = null;
  keyword = null;
  lastResult = null;
  page = 1;
  randomKeyword = false;

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

  isRandomKeyword(isRandom) {
    console.log('isRandom : ', isRandom);
    this.randomKeyword = isRandom;
  }

  setState(nextData) {
    this.data = nextData;
    this.lastResult = nextData;
    this.render();
  }

  observer = new IntersectionObserver((items, observer) => {
    if (this.randomKeyword) return;

    items.forEach((item) => {
      if (item.isIntersecting) {
        let itemIndex = Number(item.target.dataset.index);
        if (itemIndex === this.data.length - 1) {
          this.page += 1;
          this.onNextPage(this.keyword, this.page);
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
          <img src=${cat.url} alt=${cat.name} data-index=${index} />
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
      this.onClick(this.data[e.target.parentNode.dataset.index]);
    });

    this.$searchResult.querySelectorAll('.item').forEach(($item) => this.observer.observe($item));
  }
}

class SearchResult {
  $searchResult = null;
  data = null;
  keyword = null;
  lastResult = null;
  onClick = null;

  constructor({ $target, lastResult, initialData, keyword, onClick }) {
    const $wrapper = document.createElement('section');
    this.$searchResult = document.createElement('ul');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild($wrapper);
    $wrapper.appendChild(this.$searchResult);

    this.data = initialData;
    this.keyword = keyword;
    this.lastResult = lastResult;
    this.onClick = onClick;
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

  render() {
    if (this.keyword == null && (this.lastResult == null || this.lastResult.length == 0)) {
      return;
    }

    if (this.data?.length > 0) {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
        <li class="item">
          <img src=${cat.url} alt=${cat.name} />
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
    });
  }
}

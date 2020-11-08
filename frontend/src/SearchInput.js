const TEMPLATE = '<input type="text">';
class SearchInput {
  $wrap = null;
  $searchInput = null;

  constructor({ $target, onSearch }) {
    const $wrap = document.createElement('section');
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.setAttribute('autofocus', 'autofocus');

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

    this.recentKeyword = new RecentKeyword({
      $target,
      onSearch,
    });
  }
}

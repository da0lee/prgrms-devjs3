export default class selectLimitResults {
  $selectLimitResults = null;
  $searchInput = null;
  setLimit = null;

  constructor({ $target, $searchInput, setLimit }) {
    const $selectLimitResults = document.createElement('select');
    this.$selectLimitResults = $selectLimitResults;

    this.$selectLimitResults.className = 'SelectLimitResults';
    $target.insertBefore($selectLimitResults, $searchInput);

    $selectLimitResults.addEventListener('change', (e) => {
      setLimit(e.target.value);
    });

    this.render();
  }

  render() {
    const limitOptions = [25, 50, 10];
    this.$selectLimitResults.innerHTML = limitOptions.map((option) => `<option value=${option}>${option}개</option>`);
  }
}

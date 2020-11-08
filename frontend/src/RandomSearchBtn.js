class RandomSearchBtn {
  $randomSearchBtn = null;
  onRandomSearch = null;

  constructor({ $target, onRandomSearch }) {
    const $randomSearchBtn = document.createElement('button');
    this.$randomSearchBtn = $randomSearchBtn;

    this.$randomSearchBtn.className = 'RandomSearchBtn';
    $target.appendChild($randomSearchBtn);

    $randomSearchBtn.addEventListener('click', () => {
      onRandomSearch();
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$randomSearchBtn.innerHTML = `랜덤<br/>고양이`;
  }
}

class Loading {
  $loading = null;
  show = false;

  constructor({ $target }) {
    const $loading = document.createElement('div');
    this.$loading = $loading;

    $loading.className = 'Loading';
    $target.appendChild($loading);

    this.render();
  }

  setState(isShow) {
    this.show = isShow;
    this.render();
  }

  render() {
    if (this.show) {
      this.$loading.style.display = 'block';
      this.$loading.innerHTML = `
      <p>😺 고양이 소환 중 😺</p>
      `;
    } else {
      this.$loading.style.display = 'none';
      this.$loading.innerHTML = '';
    }
  }
}

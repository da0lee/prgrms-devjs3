class Loading {
  $loading = null;
  show = true;

  constructor({ $target }) {
    const $loading = document.createElement('div');
    this.$loading = $loading;

    $loading.className = 'Loading';
    $target.appendChild($loading);

    this.render();
  }

  render() {
    if (this.show) {
      this.$loading.innerHTML = `
      <p>😺 고양이 소환 중 😺</p>
      `;
    } else {
      this.$loading.innerHTML = `
      <p></p>
      `;
    }
  }
}

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

  showLoading() {
    this.setState({ show: true });
  }

  hideLoading() {
    this.setState({ show: false });
  }

  setState(nextShow) {
    this.show = nextShow;
    this.render();
  }

  render() {
    if (this.show) {
      this.$loading.innerHTML = `
      <p>😺 고양이 소환 중 😺</p>
      `;
    } else {
      this.$loading.innerHTML = '';
    }
  }
}

class DarkLightBtn {
  constructor({ $target }) {
    const $darkLightBtn = document.createElement('input');
    this.$darkLightBtn = $darkLightBtn;
    $darkLightBtn.type = 'checkbox';
    $target.appendChild($darkLightBtn);

    const osDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;
    let getColorMode = localStorage.getItem('color-mode');

    if (osDarkMode) {
      document.documentElement.setAttribute('color-mode', 'dark');
      localStorage.setItem('color-mode', 'dark');
    } else {
      document.documentElement.setAttribute('color-mode', 'light');
      localStorage.setItem('color-mode', 'light');
    }

    $darkLightBtn.addEventListener('click', () => {
      getColorMode = getColorMode === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('color-mode', getColorMode);
      localStorage.setItem('color-mode', getColorMode);
    });
  }

  render() {}
}

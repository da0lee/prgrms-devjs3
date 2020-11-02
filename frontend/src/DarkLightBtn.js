class DarkLightBtn {
  constructor({ $target }) {
    const $darkLightLable = document.createElement('label');
    const $darkLightBtn = document.createElement('input');
    const $darkLightSpan = document.createElement('span');
    this.$darkLightLable = $darkLightLable;
    this.$darkLightBtn = $darkLightBtn;
    this.$darkLightSpan = $darkLightSpan;

    $darkLightBtn.type = 'checkbox';
    $darkLightBtn.className = 'darkLightBtn';
    $darkLightSpan.className = 'darkLightSpan';

    $target.appendChild($darkLightLable);
    $darkLightLable.appendChild($darkLightBtn);
    $darkLightLable.appendChild($darkLightSpan);

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

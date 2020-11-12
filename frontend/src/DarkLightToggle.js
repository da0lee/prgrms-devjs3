class DarkLightToggle {
  $darkLightLable = null;
  $darkLightToggle = null;
  $darkLightSlider = null;
  osDarkMode = null;
  getColorMode = null;

  constructor({ $target }) {
    const $darkLightLable = document.createElement('label');
    const $darkLightToggle = document.createElement('input');
    const $darkLightSlider = document.createElement('span');
    this.$darkLightLable = $darkLightLable;
    this.$darkLightToggle = $darkLightToggle;
    this.$darkLightSpan = $darkLightSlider;

    $darkLightToggle.type = 'checkbox';
    $darkLightToggle.className = 'DarkLightToggle';
    $darkLightSlider.className = 'DarkLightSlider';

    $target.appendChild($darkLightLable);
    $darkLightLable.appendChild($darkLightToggle);
    $darkLightLable.appendChild($darkLightSlider);

    this.initColorMode();

    $darkLightToggle.addEventListener('click', () => {
      this.setColorMode();
    });
  }

  initColorMode() {
    this.osDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches ? 'dark' : 'light';
    this.getColorMode = localStorage.getItem('color-mode');
    document.documentElement.setAttribute('color-mode', this.getColorMode ? this.getColorMode : this.osDarkMode);
  }

  setColorMode() {
    this.getColorMode = this.getColorMode === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('color-mode', this.getColorMode);
    localStorage.setItem('color-mode', this.getColorMode);
  }
}

export default class DarkLightToggle {
  $darkLightLable = null;
  $darkLightToggle = null;
  $darkLightSlider = null;
  isDarkMode = null;
  userColorMode = null;

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

    $darkLightToggle.addEventListener('change', (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  initColorMode() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: Dark)').matches ? 'dark' : 'light';
    this.userColorMode = localStorage.getItem('color-mode');
    if (this.isDarkMode === 'dark' && this.userColorMode === 'light') {
      this.$darkLightToggle.checked = false;
    } else if (this.isDarkMode === 'dark') {
      this.$darkLightToggle.checked = true;
    }
    document.documentElement.setAttribute('color-mode', this.userColorMode ? this.userColorMode : this.isDarkMode);
  }

  setColorMode(ischecked) {
    this.userColorMode = ischecked ? 'dark' : 'light';
    localStorage.setItem('color-mode', this.userColorMode);
    document.documentElement.setAttribute('color-mode', ischecked ? 'dark' : 'light');
  }
}

// class DarkLightBtn {
//   $darkLightBtn = null;
//   osDarkMode = null;
//   getColorMode = null;

//   constructor({ $target }) {
//     const $darkLightLable = document.createElement('label');
//     const $darkLightBtn = document.createElement('input');
//     const $darkLightSlider = document.createElement('span');
//     this.$darkLightLable = $darkLightLable;
//     this.$darkLightBtn = $darkLightBtn;
//     this.$darkLightSpan = $darkLightSlider;

//     $darkLightBtn.type = 'checkbox';
//     $darkLightBtn.className = 'darkLightBtn';
//     $darkLightSlider.className = 'darkLightSlider';

//     $target.appendChild($darkLightLable);
//     $darkLightLable.appendChild($darkLightBtn);
//     $darkLightLable.appendChild($darkLightSlider);

//     this.osDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;
//     this.getColorMode = localStorage.getItem('color-mode');

//     if (this.osDarkMode) {
//       document.documentElement.setAttribute('color-mode', 'dark');
//       localStorage.setItem('color-mode', 'dark');
//     } else {
//       document.documentElement.setAttribute('color-mode', 'light');
//       localStorage.setItem('color-mode', 'light');
//     }

//     $darkLightBtn.addEventListener('click', () => {
//       this.getColorMode = this.getColorMode === 'light' ? 'dark' : 'light';
//       document.documentElement.setAttribute('color-mode', this.getColorMode);
//       localStorage.setItem('color-mode', this.getColorMode);
//     });
//   }
// }

class DarkLightBtn {
  $darkLightBtn = null;
  osDarkMode = null;
  getColorMode = null;

  constructor({ $target }) {
    const $darkLightLable = document.createElement('label');
    const $darkLightBtn = document.createElement('input');
    const $darkLightSlider = document.createElement('span');
    this.$darkLightLable = $darkLightLable;
    this.$darkLightBtn = $darkLightBtn;
    this.$darkLightSpan = $darkLightSlider;

    $darkLightBtn.type = 'checkbox';
    $darkLightBtn.className = 'darkLightBtn';
    $darkLightSlider.className = 'darkLightSlider';

    $target.appendChild($darkLightLable);
    $darkLightLable.appendChild($darkLightBtn);
    $darkLightLable.appendChild($darkLightSlider);

    this.osDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: Dark)').matches;
    this.getColorMode = localStorage.getItem('color-mode');

    this.initColorMode();

    $darkLightBtn.addEventListener('click', () => {
      this.setColorMode();
    });
  }

  initColorMode() {
    if (this.getColorMode) {
      document.documentElement.setAttribute('color-mode', this.getColorMode);
    } else if (this.osDarkMode) {
      document.documentElement.setAttribute('color-mode', 'dark');
    } else {
      document.documentElement.setAttribute('color-mode', 'light');
    }
  }

  setColorMode() {
    this.getColorMode = this.getColorMode === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('color-mode', this.getColorMode);
    localStorage.setItem('color-mode', this.getColorMode);
  }
}

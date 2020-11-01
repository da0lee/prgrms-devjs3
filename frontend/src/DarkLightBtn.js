class DarkLightBtn {
  constructor({ $target }) {
    const $darkLightBtn = document.createElement('input');

    this.$darkLightBtn = $darkLightBtn;
    this.$darkLightBtn.type = 'checkbox';

    $darkLightBtn.className = 'dark';
    $target.appendChild($darkLightBtn);

    $darkLightBtn.addEventListener('click', () => {
      const $html = document.documentElement;
      const $body = document.getElementsByTagName('body')[0];

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $html.classList.toggle('light');
        $body.classList.toggle('light');
      } else {
        $html.classList.toggle('dark');
        $body.classList.toggle('dark');
      }
    });
  }

  render() {}
}

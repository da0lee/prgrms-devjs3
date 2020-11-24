import api from './api.js';
export default class RandomSlider {
  $wrap = null;
  $inenrWrap = null;
  $slider = null;
  $sliderBtns = null;
  $prev = null;
  $next = null;

  data = [];
  INIT_POSITION = 0;
  INIT_INDEX = 0;
  currentIndex = this.INIT_INDEX;
  leftPosition = this.INIT_POSITION;

  constructor({ $target }) {
    const $wrap = document.createElement('section');
    const $slider = document.createElement('ul');
    const $sliderBtns = document.createElement('div');
    const $prev = document.createElement('button');
    const $next = document.createElement('button');
    this.$wrap = $wrap;
    this.$slider = $slider;
    this.$sliderBtns = $sliderBtns;
    this.$prev = $prev;
    this.$next = $next;

    $wrap.className = 'SliderWrap';
    $slider.className = 'Slider';
    $sliderBtns.className = 'SliderBtns';
    $prev.className = 'Prev';
    $next.className = 'Next';
    $prev.innerText = '<';
    $next.innerText = '>';
    $target.appendChild($wrap);
    $wrap.appendChild($slider);
    $wrap.appendChild($sliderBtns);
    $sliderBtns.appendChild($prev);
    $sliderBtns.appendChild($next);
    $sliderBtns.addEventListener('click', (e) => this.moveSlider(e));

    this.randomCats();
  }

  moveSlider(e) {
    if (e.target.className === 'Prev') {
      if (this.currentIndex === 0) return;
      this.moveSliderLeft(1);
    }

    if (e.target.className === 'Next') {
      if (this.currentIndex === this.data.length - 1) return;
      this.moveSliderLeft(-1);
    }
  }

  moveSliderLeft(direction) {
    this.currentIndex += -1 * direction;
    this.leftPosition += 1200 * direction;
    this.$slider.style.left = `${this.leftPosition}px`;
    console.log(this.currentIndex, this.leftPosition);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  randomCats() {
    api
      .fetchRandomCats()
      .then(({ data }) => {
        this.setState(data?.slice(0, 5));
      })
      .catch((e) => console.error(e));
  }

  render() {
    this.$slider.innerHTML = this.data.map((data) => `<li><img src="${data.url}"/></li>`).join('');

    const sliderWidth = `${Number(this.$wrap.clientWidth) * this.data.length}px`;
    const sliderLiWidth = `${this.$wrap.clientWidth}px`;
    this.$slider.style.width = sliderWidth;
    this.$slider.querySelectorAll('li').forEach((li) => {
      li.style.width = sliderLiWidth;
    });
  }
}

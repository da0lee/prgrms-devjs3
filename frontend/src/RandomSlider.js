export default class RandomSlider {
  $wrap = null;
  $inenrWrap = null;
  $slider = null;
  $sliderBtns = null;
  $prev = null;
  $next = null;

  INIT_POSITION = 0;
  INIT_INDEX = 0;
  currentIndex = this.INIT_INDEX;
  leftPosition = this.INIT_POSITION;

  constructor({ $target }) {
    const $wrap = document.createElement('section');
    const $inenrWrap = document.createElement('div');
    const $slider = document.createElement('ul');
    const sliderLists = [
      'http://placehold.it/1200x350.png?text=A',
      'http://placehold.it/1200x350.png?text=B',
      'http://placehold.it/1200x350.png?text=C',
      'http://placehold.it/1200x350.png?text=D',
      'http://placehold.it/1200x350.png?text=E',
    ];
    sliderLists.map((option) => {
      let $sliderLi = document.createElement('li');
      let $sliderImg = document.createElement('img');
      $sliderImg.setAttribute('src', option);
      $slider.appendChild($sliderLi);
      $sliderLi.appendChild($sliderImg);
    });
    const $sliderBtns = document.createElement('div');
    const $prev = document.createElement('button');
    const $next = document.createElement('button');
    this.$wrap = $wrap;
    this.$inenrWrap = $inenrWrap;
    this.$slider = $slider;
    this.$sliderBtns = $sliderBtns;
    this.$prev = $prev;
    this.$next = $next;

    $wrap.className = 'SliderWrap';
    $inenrWrap.className = 'InenrWrap';
    $slider.className = 'Slider';
    $sliderBtns.className = 'SliderBtns';
    $prev.className = 'Prev';
    $next.className = 'Next';
    $prev.innerText = '<';
    $next.innerText = '>';
    $target.appendChild($wrap);
    $wrap.appendChild($inenrWrap);
    $wrap.appendChild($sliderBtns);
    $inenrWrap.appendChild($slider);
    $sliderBtns.appendChild($prev);
    $sliderBtns.appendChild($next);

    $sliderBtns.addEventListener('click', (e) => this.moveSlider(e));
  }

  moveSlider(e) {
    if (e.target.className === 'Prev') {
      if (this.currentIndex === 0) return;
      this.moveSliderLeft(1);
    }

    if (e.target.className === 'Next') {
      if (this.currentIndex === 4) return;
      this.moveSliderLeft(-1);
    }
  }

  moveSliderLeft(direction) {
    this.currentIndex += -1 * direction;
    this.leftPosition += 1200 * direction;
    this.$slider.style.left = `${this.leftPosition}px`;
    console.log(this.currentIndex, this.leftPosition);
  }
}

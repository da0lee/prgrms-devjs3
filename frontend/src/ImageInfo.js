import Loading from './Loading.js';
import api from './api.js';

export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.loading = new Loading({
      $target,
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  async catDetails(datas) {
    this.loading.showLoading(true);
    await api
      .fetchCatDetail(datas.catData.id)
      .then(({ data }) => {
        if (data) {
          this.setState({
            show: true,
            catData: data,
          });
        }
      })
      .catch((e) => console.error(e))
      .finally(() => this.loading.showLoading(false));
  }

  imageInfoFadeEffect() {
    this.$imageInfo.classList.remove('show');
  }

  bindEvents() {
    this.$imageInfo.addEventListener('click', (e) => {
      if (e.target.className === 'close' || e.target.className === 'ImageInfo show') {
        this.imageInfoFadeEffect();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.imageInfoFadeEffect();
      }
    });
  }

  render() {
    if (this.data.show) {
      const { name, url, temperament, origin } = this.data.catData;
      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <head class="title">
            <h2>${name}</h2>
            <button type="button" class="close">x</button>
          </head>
          <div class="img-container">       
            <img src="${url}" alt="${name}"/>
          </div>
          <div class="description">
            <p>성격: ${temperament}</p>
            <p>태생: ${origin}</p>
          </div>
        </div>`;
      this.bindEvents();
      this.$imageInfo.classList.add('show');
    } else {
      this.imageInfoFadeEffect();
    }
  }
}

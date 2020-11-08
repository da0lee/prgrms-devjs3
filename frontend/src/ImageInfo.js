class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  closeImageInfo() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.$imageInfo.style.display = 'none';
      }
    });
    document.addEventListener('click', (e) => {
      if (e.target.nodeName === 'IMG') {
        return;
      }
      this.$imageInfo.style.display = 'none';
    });
    this.$imageInfo.querySelector('button').addEventListener('click', () => (this.$imageInfo.style.display = 'none'));
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

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
      this.$imageInfo.style.display = 'block';
      this.closeImageInfo();
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}

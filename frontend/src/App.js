console.log('app is running!');

class App {
  $target = null;
  data = [];
  lastResult = null;

  constructor($target) {
    this.$target = $target;

    this.darkLightToggle = new DarkLightToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.loading.showLoading();
        this.searchResult.setKeyword(keyword);
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.hideLoading();
          this.setState(data);
          this.setLastResult(data);
        });
      },
      onRandomSearch: () => {
        this.loading.showLoading();
        api.fetchRandomCats().then(({ data }) => {
          this.loading.hideLoading();
          this.setState(data);
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      lastResult: this.lastResult,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.catDetails({
          visible: true,
          catData: cat,
        });
      },
    });

    this.loading = new Loading({
      $target,
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        catData: null,
      },
    });

    this.init();
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  setLastResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    this.lastResult = localStorage.getItem('lastResult') ? JSON.parse(localStorage.getItem('lastResult')) : [];
    this.setState(this.lastResult);
  }
}

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
        this.loading.showLoading(true);
        this.searchResult.setKeyword(keyword);
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.showLoading(false);
          this.setState(data);
          this.setLastResult(data);
        });
      },
      onRandomSearch: () => {
        this.loading.showLoading(true);
        api.fetchCats().then(({ data }) => {
          this.searchResult.isRandomKeyword(true);
          this.loading.showLoading(false);
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
      onNextPage: (recentKeyword, page) => {
        api.fetchCats(recentKeyword, page).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState(newData);
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

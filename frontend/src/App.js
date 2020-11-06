console.log('app is running!');

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.darkLightToggle = new DarkLightToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.loading.showLoading();
        api.fetchCats(keyword).then(({ data }) => {
          this.loading.hideLoading();
          this.setState(data);
          // 로컬에 저장
          this.saveResult(data);
        });
      },
    });

    // this.recentKeyword = new RecentKeyword({
    //   $target,
    //   getRecentKeywords: () => JSON.parse(localStorage.getItem('recent-keyword')),
    // });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
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
        image: null,
      },
    });
    this.init();
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    const lastResult =
      localStorage.getItem('lastResult') === null ? [] : JSON.parse(localStorage.getItem('lastResult'));
    this.setState(lastResult);
  }
}

import DarkLightToggle from './DarkLightToggle.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import Loading from './Loading.js';
import ImageInfo from './ImageInfo.js';
import api from './api.js';

console.log('app is running!');

export default class App {
  $target = null;
  INIT_PAGE = 1;
  data = [];
  page = this.INIT_PAGE;
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
        this.searchInput.setInputValue(keyword);
        api.fetchCats(keyword).then(({ data }) => {
          this.page = this.INIT_PAGE;
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
      onNextPage: (recentKeyword) => {
        const nextPage = this.page + 1;
        api.fetchCats(recentKeyword, nextPage).then(({ data }) => {
          let newData = this.data.concat(data);
          this.page = this.page + 1;
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

  setKeyword(nextKeyword) {
    this.keyword = nextKeyword;
  }

  init() {
    this.lastResult = localStorage.getItem('lastResult') ? JSON.parse(localStorage.getItem('lastResult')) : [];
    this.setState(this.lastResult);
  }
}

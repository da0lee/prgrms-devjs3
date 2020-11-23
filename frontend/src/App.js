import DarkLightToggle from './DarkLightToggle.js';
import SearchInput from './SearchInput.js';
import RandomSlider from './RandomSlider.js';
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
      onSearch: (keyword, limit) => {
        this.loading.showLoading(true);
        this.searchResult.setKeyword(keyword);
        this.searchInput.setInputValue(keyword);
        api
          .fetchCats(keyword, limit)
          .then(({ data }) => {
            if (data) {
              this.setState(data);
              this.setLastResult(data);
            }
          })
          .catch((e) => console.error(e))
          .finally(() => {
            this.page = this.INIT_PAGE;
            this.loading.showLoading(false);
          });
      },
      onRandomSearch: () => {
        this.loading.showLoading(true);
        api
          .fetchCats()
          .then(({ data }) => {
            if (data) {
              this.setState(data);
            }
            this.searchResult.isRandomKeyword(true);
          })
          .catch((e) => console.error(e))
          .finally(() => this.loading.showLoading(false));
      },
    });

    this.randomSlider = new RandomSlider({
      $target,
    });

    this.searchResult = new SearchResult({
      $target,
      lastResult: this.lastResult,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.catDetails({
          show: true,
          catData: cat,
        });
      },
      onNextPage: (recentKeyword) => {
        const nextPage = this.page + 1;
        const limit = this.searchInput.limit;
        api
          .fetchCats(recentKeyword, limit, nextPage)
          .then(({ data }) => {
            if (data) {
              let newData = [...this.data, ...data];
              this.setState(newData);
            }
            this.page = this.page + 1;
          })
          .catch((e) => console.error(e));
      },
    });

    this.loading = new Loading({
      $target,
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        show: false,
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

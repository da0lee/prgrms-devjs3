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
      onSearch: async (keyword) => {
        this.loading.showLoading(true);
        this.searchResult.setKeyword(keyword);
        this.searchInput.setInputValue(keyword);
        await api
          .fetchCats(keyword)
          .then(({ data }) => {
            this.setState(data);
            this.setLastResult(data);
          })
          .catch((e) => console.error(e))
          .finally(() => {
            this.page = this.INIT_PAGE;
            this.loading.showLoading(false);
          });
      },
      onRandomSearch: async () => {
        this.loading.showLoading(true);
        await api
          .fetchCats()
          .then(({ data }) => {
            this.searchResult.isRandomKeyword(true);
            this.setState(data);
          })
          .catch((e) => console.error(e))
          .finally(() => this.loading.showLoading(false));
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
      onNextPage: async (recentKeyword) => {
        const nextPage = this.page + 1;
        await api
          .fetchCats(recentKeyword, nextPage)
          .then(({ data }) => {
            let newData = [...this.data, ...data];
            this.page = this.page + 1;
            this.setState(newData);
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

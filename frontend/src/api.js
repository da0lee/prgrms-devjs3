const API_ENDPOINT = 'http://localhost:4001';

const api = {
  fetchCats: (keyword, page = 1) => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`).then((res) => res.json());
  },

  fetchRandomCats: () => {
    return fetch(`${API_ENDPOINT}/api/cats/random50`).then((res) => res.json());
  },

  fetchCatDetail: (id) => {
    return fetch(`${API_ENDPOINT}/api/cats/${id}`).then((res) => res.json());
  },
};

export default api;

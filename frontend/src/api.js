const API_ENDPOINT = 'http://localhost:4001';

const request = async (url) => {
  try {
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    }
    throw Error(`\n😹 ${result.statusText} 😹`);
  } catch (error) {
    alert(error);
    return [];
  }
};

const api = {
  fetchCats: (keyword, page = 1) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },

  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },

  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api;

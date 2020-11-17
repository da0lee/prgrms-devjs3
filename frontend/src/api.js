const API_ENDPOINT = 'http://localhost:4001';

const ERRORS = {
  400: '잘못된 요청입니다.',
  500: '요청하신 정보를 찾을 수 없습니다.',
};

const request = async (url) => {
  const result = await fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      alert(`😹 ${res.statusText} 😹 \n ${ERRORS[res.status]}`);
    }
  });
  return result;
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

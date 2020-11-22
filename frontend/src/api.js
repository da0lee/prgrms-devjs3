const API_ENDPOINT = 'http://localhost:4001';

const ERRORS = {
  400: '잘못된 요청입니다.',
  500: '서버에 오류가 발생하였습니다.',
};

const request = async (url) => {
  try {
    const result = await fetch(url);

    if (result.status === 200) {
      return result.json();
    }
    throw result;
  } catch (error) {
    alert(`😹 ${error.statusText} 😹 \n ${ERRORS[error.status]}`);
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

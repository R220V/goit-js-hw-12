import axios from 'axios';

const API_KEY = '48306389-9c3f7e9b102fd2bc2270acf47';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchPhotosByQuery(query, currentPage) {
  const axiosOptions = {
    params: {
      key: API_KEY,
      page: currentPage,
      per_page: 15,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  return axios.get(`${BASE_URL}`, axiosOptions);
}

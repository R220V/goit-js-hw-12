import axios from 'axios';

export const fetchPhotosByQuery = (searchedQuery, currentPage) => {
  const axiosOptions = {
    params: {
      q: searchedQuery,
      key: '48306389-9c3f7e9b102fd2bc2270acf47',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: currentPage,
      per_page: 15,
    },
  };
  return axios.get(`https://pixabay.com/api/`, axiosOptions);
};
// ============================================
// export const fetchPhotosByQuery = searchedQuery => {
//   const searchParams = new URLSearchParams({
//     q: searchedQuery,
//     key: '48306389-9c3f7e9b102fd2bc2270acf47',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     page: 1,
//     per_page: '15',
//   });

//   return fetch(`https://pixabay.com/api/?${searchParams.toString()}`).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// };

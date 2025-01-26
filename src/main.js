// Завантажимо бібліотеки

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';
// Отримуємо посилання на елементи сторінки
const searchFormEl = document.querySelector('.js-form-search');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
// Ініціалізація SimpleLightbox
let gallerySLB = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});
//ф-ія викликається при сабміті форми
const onSearchFormSubmit = event => {
  // Запобігаємо перезавантаженню сторінки
  event.preventDefault();
  //зчитуємо значення з інпута, видаляючи пробіли
  const searchedQuery = event.currentTarget.elements.user_query.value.trim('');
  //перевірка, чи інпут не порожній
  if (searchedQuery === '') {
    iziToast.error({
      title: 'Error',
      messageColor: 'Purple',
      color: 'red',
      position: 'topRight',
      message: 'Please enter your request',
      messageSize: '20',
    });
    return;
  }
  //Видалимо клас is-hidden для показу індикатора завантаження
  loader.classList.remove('is-hidden');
  fetchPhotosByQuery(searchedQuery) //запит на сервер
    .then(data => {
      //перевірка на неіснуюче слово в інпуті
      //Якщо на серверінемає зображень за таким пошуком, відображається сповіщення про помилку.
      if (data.total === 0) {
        iziToast.error({
          title: 'Error',
          messageColor: 'Purple',
          color: 'red',
          position: 'topRight',
          messageSize: '20',
          message: 'Sorry, there are no images. Please try again!',
        });
        galleryEl.innerHTML = ''; //почистили галерею
        searchFormEl.reset(); //почистили імпут
        return;
      }
      //генеруємо розмітку(якщо є зображення, формуємо рядок з розміткою)
      const galleryTemplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');
      //відмальовуємо зображення на сторінці
      galleryEl.innerHTML = galleryTemplate;
      //ховаємо індикатор завантаження
      loader.classList.add('is-hidden');
      //оновлюємо галерею SimpleLightbox
      gallerySLB.refresh();
    })
    //Якщо є помилка, ховається індикатор завантаження, а помилка виводиться в консоль.
    .catch(err => {
      loader.style.display = 'none';
      console.log(err);
    });
  //очистимо форму після завершення запиту
  searchFormEl.reset();
};

// Додаємо обробник події на форму пошуку
searchFormEl.addEventListener('submit', onSearchFormSubmit);

// =====================================

// Завантажимо бібліотеки
// import axios from 'axios';
// import { fetchPosts } from './js/pixabay-api';
// const loadMoreBtn = document.querySelector('.load-more-btn');
// // console.log(fetchPosts);
// const renderPosts = async () => {
//   try {
//     const { data } = await fetchPosts(1);
//     const PostCardTempate = data
//       .map(post => createPostCardTempate(post))
//       .join('');
//     postslistEl.innerHTML = postCardTempate;
//     loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

//     console.log(loadMoreBtn);
//   } catch (err) {
//     console.log(err);
//   }
// };
// renderPosts();
// const onLoadMoreBtnClick = async () => {
//   try {
//     page++;
//     const { data } = await fetchPosts(page);
//     if (data.length === 0) {
//       loadMoreBtn.classList.addEventListener('click', onLoadMoreBtnClick);
//       return;
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   console.log('pop');
// };

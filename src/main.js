import iziToast from 'izitoast'; // Завантажимо бібліотеки
import SimpleLightbox from 'simplelightbox';

import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

// Отримуємо посилання на елементи сторінки
const searchFormEl = document.querySelector('.js-form-search');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

//Ініціалізація SimpleLightbox- створення модального вікна,
//(зображення відкривається у великому розмірі).
let gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

//номер сторінки результатів пошуку. Починаємо з 1.
let page = 1;

//зберігає ключове слово, яке ввів користувач у формі.
let searchedQuery = '';

//ф-ія викликається при сабміті форми
const onSearchFormSubmit = async event => {
  // Запобігаємо перезавантаженню сторінки
  event.preventDefault();

  try {
    //сховаємо кнопку Load More
    // loadMoreBtn.classList.add('hidden');
    // loader.style.display = 'none';

    //зчитуємо значення з інпута, видаляючи пробіли
    searchedQuery = event.currentTarget.elements.user_query.value.trim('');
    //перевірка, чи інпут не порожній
    if (searchedQuery === '') {
      iziToast.error({
        title: '',
        messageColor: 'Purple',
        color: 'red',
        position: 'topRight',
        message: 'Please enter your request',
        messageSize: '20',
      });
      return;
    }
    // відкриємо 1 сторінку при кожному пошуку
    // page = 1;

    //сховаємо кнопку Load More
    // loadMoreBtn.classList.add('hidden');
    // //Видалимо клас is-hidden для показу індикатора завантаження
    // loader.classList.remove('is-hidden');

    //Зробили запит поключовому слову searchedQuery
    const { data } = await fetchPhotosByQuery(searchedQuery, page);

    //перевірка на неіснуюче слово в інпуті
    //Якщо на сервері немає зображень за таким пошуком, відображається сповіщення про помилку.
    if (data.total === 0) {
      iziToast.error({
        title: '',
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
    // якщо на сервері > 1 групи зображень
    // if (data.totalHits > 1) {
    //   loadMoreBtn.classList.remove('hidden');
    // слухаємо подію клік на кнопці, якщо >1 групи зображень
    // loadMoreBtn.addEventListener('click'.onLoadMoreBtnClick);

    //генеруємо розмітку(якщо є зображення, формуємо рядок з розміткою)
    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');
    //відмалювали картки в галереї
    galleryEl.innerHTML = galleryTemplate;
    //Покажемо кнопку load-more --приберемо клас hidden
    loadMoreBtn.classList.remove('hidden');

    //слухаємо подію клік на кнопці
    loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
  } catch (err) {
    console.log(err);
  }
};
// Додаємо обробник події на форму пошуку
searchFormEl.addEventListener('submit', onSearchFormSubmit);

// опишемо ф-ію обробнику кліку
const onLoadMoreBtnClick = async event => {
  console.log('object');
  try {
    page++;
    // робимо запит по ключовому слову searchedQuery
    const { data } = await fetchPhotosByQuery(searchedQuery, page);
    console.log(data);
    //генеруємо розмітку(якщо є зображення, формуємо рядок з розміткою)
    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');
    //
    console.log(galleryTemplate);
    //додаємо нові зображення в кінець нашого списку
    galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
    //     //коли настає кінець колекції
    //     if (page === data.totalHits) {
    //       // ховаэмо кнопку
    //       loadMoreBtnEl.classList.add('is-hidden');
    //       //припиняємо прослуховування на кнопці
    //       loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick);
  } catch (err) {
    console.log(err);
  }
};

// iziToast.err({
//   title: 'Error',
//   position: 'topRight',
//   message: 'The image you requested could not be loaded. Please try again later.',

// });

//       const galleryTemplate = data.results
//         .map(el => createGalleryCardTemplate(el))
//         .join('');

//
//

//         iziToast.info({
//           title: 'Info',
//           position: 'topRight',
//           message: "There are no more images matching your request.",
//         });
//

//
//       }
//     }
//     const smoothScroll = document.querySelector('.gallery-item');
//     if(smoothScroll) {
//      const cardHeight = smoothScroll.getBoundingClientRect().height;
//       window.scrollBy({
//         top: cardHeight * 2,
//         behavior: 'smooth',
//       });
//     }

// ===================================================================

//--------------------------------------------------------------------------------------------------------------
// // Завантажимо бібліотеки

// import iziToast from 'izitoast';
// import SimpleLightbox from 'simplelightbox';

// import { createGalleryCardTemplate } from './js/render-functions';
// import { fetchPhotosByQuery } from './js/pixabay-api';
// // Отримуємо посилання на елементи сторінки
// const searchFormEl = document.querySelector('.js-form-search');
// const galleryEl = document.querySelector('.js-gallery');
// const loader = document.querySelector('.loader');
// // Ініціалізація SimpleLightbox
// let gallerySLB = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 300,
// });
// //ф-ія викликається при сабміті форми
// const onSearchFormSubmit = event => {
//   // Запобігаємо перезавантаженню сторінки
//   event.preventDefault();
//   //зчитуємо значення з інпута, видаляючи пробіли
//   const searchedQuery = event.currentTarget.elements.user_query.value.trim('');
//   //перевірка, чи інпут не порожній
//   if (searchedQuery === '') {
//     iziToast.error({
//       title: 'Error',
//       messageColor: 'Purple',
//       color: 'red',
//       position: 'topRight',
//       message: 'Please enter your request',
//       messageSize: '20',
//     });
//     return;
//   }
//   //Видалимо клас is-hidden для показу індикатора завантаження
//   loader.classList.remove('is-hidden');
//   fetchPhotosByQuery(searchedQuery) //запит на сервер
//     .then(data => {
//       //перевірка на неіснуюче слово в інпуті
//       //Якщо на серверінемає зображень за таким пошуком, відображається сповіщення про помилку.
//       if (data.total === 0) {
//         iziToast.error({
//           title: 'Error',
//           messageColor: 'Purple',
//           color: 'red',
//           position: 'topRight',
//           messageSize: '20',
//           message: 'Sorry, there are no images. Please try again!',
//         });
//         galleryEl.innerHTML = ''; //почистили галерею
//         searchFormEl.reset(); //почистили імпут
//         return;
//       }
//       //генеруємо розмітку(якщо є зображення, формуємо рядок з розміткою)
//       const galleryTemplate = data.hits
//         .map(el => createGalleryCardTemplate(el))
//         .join('');
//       //відмальовуємо зображення на сторінці
//       galleryEl.innerHTML = galleryTemplate;
//       //ховаємо індикатор завантаження
//       loader.classList.add('is-hidden');
//       //оновлюємо галерею SimpleLightbox
//       gallerySLB.refresh();
//     })
//     //Якщо є помилка, ховається індикатор завантаження, а помилка виводиться в консоль.
//     .catch(err => {
//       loader.style.display = 'none';
//       console.log(err);
//     });
//   //очистимо форму після завершення запиту
//   searchFormEl.reset();
// };

// // Додаємо обробник події на форму пошуку
// searchFormEl.addEventListener('submit', onSearchFormSubmit);

// ====================================

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

// ===========================================================
// ============================================================
// =========================================================
// // Завантажимо бібліотеки
// import iziToast from 'izitoast';
// import SimpleLightbox from 'simplelightbox';

// import { fetchPhotosByQuery } from './js/pixabay-api';
// import { createGalleryCardTemplate } from './js/render-functions';

// // Отримуємо посилання на елементи сторінки
// const formSearchCard = document.querySelector('.form-search');
// const listGalleryCard = document.querySelector('.gallery');
// const loaderStyle = document.querySelector('.loader');
// const buttonLoadEl = document.querySelector('.button-load');

// let page = 1; //номер сторінки результатів пошуку. Починаємо з 1.
// let query = ''; //зберігає ключове слово, яке ввів користувач у формі.

// loaderStyle.style.display = 'none'; //сховаємо лоадер
// buttonLoadEl.classList.add('is-hidden'); //сховаємо кнопку Load More

// //Ініціалізація SimpleLightbox- створення модального вікна,
// //(зображення відкривається у великому розмірі).
// const lightboxModalWindow = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionsData: 'alt',
//   captionsPosition: 'bottom',
//   captionsDelay: 500,
// });

// //ф-ія викликається при сабміті форми
// const searchImg = async event => {
//   try {
//     event.preventDefault(); // Запобігаємо перезавантаженню сторінки

//     query = event.target.query.value.trim(); //зчитуємо значення з інпута, видаляючи пробіли
//     //відмалювали картки в галереї
//     listGalleryCard.innerHTML = ''; //почистили галерею

//     //перевірка, чи інпут не порожній
//     if (!query) {
//       iziToast.error({
//         title: 'Error',
//         messageColor: 'Purple',
//         color: 'red',
//         position: 'topRight',
//         message: 'Please enter your request',
//         messageSize: '20',
//       });
//       return;
//     }

//     page = 1; // відкриємо 1 сторінку при кожному пошуку

//     buttonLoadEl.classList.add('is-hidden'); //сховаємо кнопку Load More

//     //Зробили запит по ключовому слову query
//     const { data } = await fetchPhotosByQuery(query, page);

//     //Якщо на сервері немає зображень за таким пошуком, відображається сповіщення про помилку.
//     if (data.hits.length === 0) {
//       iziToast.error({
//         title: '',
//         messageColor: 'Purple',
//         color: 'red',
//         position: 'topRight',
//         messageSize: '20',
//         message: 'Sorry, there are no images. Please try again!',
//       });
//       return;
//     }

//     //домалювали картки в кінець галереї
//     listGalleryCard.insertAdjacentHTML(
//       'beforeend',
//       createGalleryCardTemplate(data.hits)
//     );
//     // якщо карток більше 1 сторінки, покажемо кнопку Lode More
//     if (data.totalHits > page * 15) {
//       buttonLoadEl.classList.remove('is-hidden');
//     }
//     lightboxModalWindow.refresh(); //оновлюємо галерею SimpleLightbox
//     event.preventDefault();
//   } catch (error) {
//     console.error(error.message);
//   } finally {
//     loaderStyle.style.display = 'none'; //ховаємо лоадер
//   }
//   //очистимо форму після завершення запиту
//   event.target.reset();
// };

// // Додаємо обробник події на форму пошуку
// formSearchCard.addEventListener('submit', searchImg);

// // опишемо ф-ію обробника кліка
// const onButtonLoadClick = async () => {
//   try {
//     page++;
//     const { data } = await fetchPhotosByQuery(query, page);

//     //додаємо нові зображення в кінець нашого списку
//     listGalleryCard.insertAdjacentHTML(
//       'beforeend',
//       createGalleryCardTemplate(data.hits)
//     );

//     //коли настає кінець колекції
//     if (page * 15 >= data.totalHits || data.hits.length === 0) {
//       iziToast.info({
//         title: 'Info',
//         messageColor: 'teal',
//         color: 'blue',
//         position: 'topRight',
//         messageSize: '20',
//         message: "We're sorry, but you've reached the end of search results.",
//       });

//       buttonLoadEl.classList.add('is-hidden'); // ховаємо кнопку
//       return;
//     }
//     //реалізуєио плавний скрол на 2 карточки
//     const smoothScroll = document.querySelector('.gallery-item');
//     if (smoothScroll) {
//       const cardHeight = smoothScroll.getBoundingClientRect().height;
//       window.scrollBy({
//         top: cardHeight * 2,
//         behavior: 'smooth',
//       });
//     }
//   } catch (error) {
//     iziToast.error({
//       title: 'Error',
//       position: 'topRight',
//       message: 'Please try again later.',
//     });
//   }
// };
// //слухаємо подію клік на кнопці
// buttonLoadEl.addEventListener('click', onButtonLoadClick);

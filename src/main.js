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

//загальна кількість доступних зображень для заданого ключового слова (повертається API).
let totalHits = 0;

//ф-ія викликається при сабміті форми
const onSearchFormSubmit = async event => {
  try {
    // Запобігаємо перезавантаженню сторінки
    event.preventDefault();

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
    //відкриємо 1 сторінку при кожному пошуку
    page = 1;
    //сховаємо кнопку Load More
    loadMoreBtn.classList.add('hidden');
    //Видалимо клас is-hidden для показу індикатора завантаження
    loader.classList.remove('is-hidden');
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

    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );

    if (data.total.hits > page * 15) {
      loadMoreBtn.classList.remove('hidden');
      // loadMoreBtn.addEventListener('click'.onLoadMoreBtnClick);
    }
    gallerySimpleLightbox.refresh();

    //генеруємо розмітку(якщо є зображення, формуємо рядок з розміткою)
    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');
    //ховаємо індикатор завантаження
    loader.classList.add('is-hidden');

    //відмальовуємо зображення на сторінці
    galleryEl.innerHTML = galleryTemplate;

    //Покажемо кнопку load-more --приберемо клас hidden
    loadMoreBtn.classList.remove('hidden');

    //слухаємо подію клік на кнопці
    loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

    //ховаємо індикатор завантаження
    loader.classList.add('is-hidden');

    //оновлюємо галерею SimpleLightbox
    gallerySimpleLightbox.refresh();
  } catch (err) {
    console.log(err);
  } finally {
    loader.classList.remove('is-hidden');
  }
};

//очистимо форму після завершення запиту
searchFormEl.reset();

// Додаємо обробник події на форму пошуку
searchFormEl.addEventListener('submit', onSearchFormSubmit);

//опишемо ф-ію
const onLoadMoreBtnClick = async () => {
  const { data } = await fetchPhotosByQuery(searchedQuery, page);
  try {
    page++;
    const { data } = await fetchPhotosByQuery(query, page);
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );

    //Перевірка, якщо користувач дійшов до кінця колекції, ховай кнопку
    if (page * 15 >= data.totalHits || data.hits.length === 0) {
      iziToast.show({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        color: 'blue',
      });
      loadMoreBtn.classList.add('hidden');
      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
      return;
    }
    const smoothScroll = document.querySelector('.gallery-item');
    if (smoothScroll) {
      const cardHeight = smoothScroll.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message:
        'The image you requested could not be loaded. Please try again later.',
    });
  }
};

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
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

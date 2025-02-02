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
  captionDelay: 500,
});

let page = 1; //номер сторінки результатів пошуку. Починаємо з 1.
let searchedQuery = ''; //зберігає ключове слово, яке ввів користувач у формі.

loader.style.display = 'none'; //сховаємо лоадер
loadMoreBtn.classList.add('is-hidden'); //сховаємо кнопку Load More

//ф-ія викликається при сабміті форми
const onSearchFormSubmit = async event => {
  try {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    //сховаємо кнопку Load More
    // loadMoreBtn.classList.add('hidden');
    // loader.style.display = 'none';

    searchedQuery = event.target.query.value.trim(); //зчитуємо значення з інпута, видаляючи пробіли
    galleryEl.innerHTML = ''; //почистили галерею

    //перевірка, чи інпут не порожній
    if (!searchedQuery) {
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

    page = 1; // відкриємо 1 сторінку при кожному пошуку

    loadMoreBtn.classList.add('hidden'); //сховаємо кнопку Load More

    // //Видалимо клас is-hidden для показу індикатора завантаження
    // loader.classList.remove('is-hidden');

    //Зробили запит поключовому слову searchedQuery
    const { data } = await fetchPhotosByQuery(searchedQuery, page);

    //перевірка на неіснуюче слово в інпуті
    //Якщо на сервері немає зображень за таким пошуком, відображається сповіщення про помилку.
    if (data.hits.length === 0) {
      iziToast.error({
        title: '',
        messageColor: 'Purple',
        color: 'red',
        position: 'topRight',
        messageSize: '20',
        message: 'Sorry, there are no images. Please try again!',
      });

      // galleryEl.innerHTML = ''; //почистили галерею
      // searchFormEl.reset(); //почистили імпут
      return;
    }

    //додаємо нові зображення в кінець нашого списку
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );

    // якщо на сервері > 1 групи зображень
    if (data.totalHits > page * 15) {
      loadMoreBtn.classList.remove('is-hidden'); //покажемо кнопку
    }

    gallerySimpleLightbox.refresh(); //оновлюємо галерею SimpleLightbox
  } catch (error) {
    console.log(error.message);
  } finally {
    loader.style.display = 'none'; //ховаємо лоадер
  }
  //очистимо форму після завершення запиту
  event.target.reset();
};

// Додаємо обробник події на форму пошуку
searchFormEl.addEventListener('submit', onSearchFormSubmit);

// опишемо ф-ію обробника кліка
const onLoadMoreBtnClick = async () => {
  try {
    page++;
    const { data } = await fetchPhotosByQuery(searchedQuery, page);

    //додаємо нові зображення в кінець нашого списку
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );

    //коли настає кінець колекції
    if (page * 15 >= data.totalHits || data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        messageColor: 'teal',
        color: 'blue',
        position: 'topRight',
        messageSize: '20',
        message: "We're sorry, but you've reached the end of search results.",
      });

      buttonLoadEl.classList.add('is-hidden'); // ховаємо кнопку
      return;
    }

    //реалізуєио плавний скрол на 2 карточки
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
      message: 'Please try again later.',
    });
  }
};

//слухаємо подію клік на кнопці
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

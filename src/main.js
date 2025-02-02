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
  captions: true,
  captionsData: 'alt',
  captionDelay: 500,
});

let page = 1; //номер сторінки результатів пошуку. Починаємо з 1.
let searchedQuery = ''; //зберігає ключове слово, яке ввів користувач у формі.

loader.style.display = 'none'; //сховаємо лоадер
loadMoreBtn.classList.add('is-hidden'); //сховаємо кнопку Load More

//ф-ія викликається при сабміті форми
const searchFormImg = async event => {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки
  try {
    searchedQuery = event.target.elements.query.value.trim(); //зчитуємо значення з інпута, видаляючи пробіли
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
    loader.style.display = 'inline-block';

    page = 1; // відкриємо 1 сторінку при кожному пошуку

    loadMoreBtn.classList.add('is-hidden'); //сховаємо кнопку Load More

    //Зробили запит по ключовому слову searchedQuery
    const { data } = await fetchPhotosByQuery(searchedQuery, page);

    //Якщо на сервері немає зображень за таким пошуком, відображається сповіщення про помилку.
    if (!data.hits || data.hits.length === 0) {
      iziToast.show({
        title: '',
        messageColor: 'Purple',
        color: 'red',
        position: 'topRight',
        messageSize: '20',
        message: 'Sorry, there are no images. Please try again!',
      });
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
    console.error(error.message);
  } finally {
    loader.style.display = 'none';
    if (event && event.target) {
      event.target.reset();
    }
  }
};

// Додаємо обробник події на форму пошуку
searchFormEl.addEventListener('submit', searchFormImg);

// опишемо ф-ію обробника кліка
const onLoadMoreBtnClick = async event => {
  event.preventDefault();
  try {
    page++;
    const { data } = await fetchPhotosByQuery(searchedQuery, page);

    //додаємо нові зображення в кінець нашого списку
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );

    //коли настає кінець колекції
    if (!data.hits || page * 15 >= data.totalHits || data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        messageColor: 'teal',
        color: 'blue',
        position: 'topRight',
        messageSize: '20',
        message: "We're sorry, but you've reached the end of search results.",
      });

      loadMoreBtn.classList.add('is-hidden'); // ховаємо кнопку
      return;
    }
    gallerySimpleLightbox.refresh(); // Оновлюємо SimpleLightbox  на нових сторінках

    //реалізуєио плавний скрол на 2 карточки
    const smoothScroll = document.querySelector('.gallery-item');
    if (smoothScroll) {
      const cardHeight = smoothScroll.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2 + 600,
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

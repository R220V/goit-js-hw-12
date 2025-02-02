// Завантажимо бібліотеки
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

// Отримуємо посилання на елементи сторінки
const formSearchCard = document.querySelector('.form-search');
const listGalleryCard = document.querySelector('.gallery');
const loaderStyle = document.querySelector('.loader');
const buttonLoadEl = document.querySelector('.button-load');

let page = 1; //номер сторінки результатів пошуку. Починаємо з 1.
let query = ''; //зберігає ключове слово, яке ввів користувач у формі.

loaderStyle.style.display = 'none'; //сховаємо лоадер
buttonLoadEl.classList.add('is-hidden'); //сховаємо кнопку Load More

//Ініціалізація SimpleLightbox- створення модального вікна,
//(зображення відкривається у великому розмірі).
const lightboxModalWindow = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionsPosition: 'bottom',
  captionsDelay: 500,
});

//ф-ія викликається при сабміті форми
const searchImg = async event => {
  try {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    query = event.target.query.value.trim(); //зчитуємо значення з інпута, видаляючи пробіли
    //відмалювали картки в галереї
    listGalleryCard.innerHTML = ''; //почистили галерею

    //перевірка, чи інпут не порожній
    if (!query) {
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

    page = 1; // відкриємо 1 сторінку при кожному пошуку

    buttonLoadEl.classList.add('is-hidden'); //сховаємо кнопку Load More

    //Зробили запит по ключовому слову query
    const { data } = await fetchPhotosByQuery(query, page);

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
      return;
    }

    //домалювали картки в кінець галереї
    listGalleryCard.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );
    // якщо карток більше 1 сторінки, покажемо кнопку Lode More
    if (data.totalHits > page * 15) {
      buttonLoadEl.classList.remove('is-hidden');
    }
    lightboxModalWindow.refresh(); //оновлюємо галерею SimpleLightbox
    event.preventDefault();
  } catch (error) {
    console.error(error.message);
  } finally {
    loaderStyle.style.display = 'none'; //ховаємо лоадер
  }
  //очистимо форму після завершення запиту
  event.target.reset();
};

// Додаємо обробник події на форму пошуку
formSearchCard.addEventListener('submit', searchImg);

// опишемо ф-ію обробника кліка
const onButtonLoadClick = async () => {
  try {
    page++;
    const { data } = await fetchPhotosByQuery(query, page);

    //додаємо нові зображення в кінець нашого списку
    listGalleryCard.insertAdjacentHTML(
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
buttonLoadEl.addEventListener('click', onButtonLoadClick);

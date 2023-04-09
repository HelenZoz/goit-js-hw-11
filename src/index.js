// Для повідомлень використана бібліотека notiflix.
import Notiflix from 'notiflix';

// import { PixabayAPI } from './pixabayAPI.js';
import { fetchPhotosPixabay } from './pixabayAPI';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.btn__load-more');

// Початкове значення параметра page повинно бути 1
let page = 1;
// Початковий пошуковий запит
let inputSearchText = '';

// btnLoadMoreEl.classList.add('is-hidden');
let isHidden = true;
// btnLoadMoreEl.classList.add('isHidden');


formEl.addEventListener('submit', handleBtnOnSearch);
btnLoadMoreEl.addEventListener('click', handleBtnOnLoadMore);

async function handleBtnOnSearch(e) {
  e.preventDefault();
  inputSearchText = e.target.elements.searchQuery.value.trim();
  console.log(inputSearchText)

  if (!inputSearchText) {
    return;
  }

  page = 1;
  btnLoadMoreEl.classList.add('is-hidden');
  // Під час пошуку за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати.
  galleryEl.innerHTML = '';

  try {
    const { hits, totalHits } = await fetchPhotosPixabay(inputSearchText, page);
    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      btnLoadMoreEl.classList.add('is-hidden');
      return;
    }
    btnLoadMoreEl.classList.remove('is-hidden');
    handleSuccess(hits);
  } catch (error) {
    handleError(error);
  }
}

async function handleBtnOnLoadMore() {
  // З кожним наступним запитом, його необхідно збільшити на 1.
  page += 1;

  try {
    const { hits, totalHits } = await fetchPhotosPixabay(inputSearchText, page);

    if (page >= Math.ceil(totalHits / 40)) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      btnLoadMoreEl.classList.add('is-hidden');
    }
    handleSuccess(hits);
    //  btnLoadMoreEl.classList.remove('is-hidden');
  } catch (error) {
      handleError(error);
    }
  }

async function handleSuccess(hits) {

  const galleryItems = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="gallery-item">
              <a class="link" href="${largeImageURL}" target="_blank">
                <img src="${webformatURL}" alt="${tags}" width="300" height="200" loading="lazy">
              </a>
              <div class="gallery-item-info">
                <ul class="gallery-item-info__card">
                  <div class="span">
                    <li class="list name">Likes</li>
                    <li class="list number">${likes}</li>
                  </div>
                  <div class="span">
                    <li class="list name">Views</li>
                    <li class="list number">${views}</li>
                  </div>
                  <div class="span">
                    <li class="list name">Comments</li>
                    <li class="list number">${comments}</li>
                  </div>
                  <div class="span">
                    <li class="list name">Downloads</li>
                    <li class="list number">${downloads}</li>
                  </div>
                </ul>
              </div>
            </div>`;
    }).join('');

  galleryEl.insertAdjacentHTML('beforeend', galleryItems);
  // btnLoadMoreEl.classList.remove('is-hidden');
}

function handleError(error) {
  console.log(error);
  }
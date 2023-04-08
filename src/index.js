// Для повідомлень використана бібліотека notiflix.
import Notiflix from 'notiflix';

// import { PixabayAPI } from './pixabayAPI.js';
import { fetchPhotosPixabay } from './pixabayAPI';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more');

// Початкове значення параметра page повинно бути 1
let page = 1;
// Початковий пошуковий запит
let inputSearchText = '';

// btnLoadMoreEl.setAttribute('disabled', false);
btnLoadMoreEl.classList.add('is-hidden');

formEl.addEventListener('submit', handleBtnOnSearch);
btnLoadMoreEl.addEventListener('click', handleBtnOnLoadMore);

async function handleBtnOnSearch(e) {
  e.preventDefault();
  inputSearchText = e.target.elements.searchQuery.value.trim();

  if (!inputSearchText) {
    return;
  }

  page = 1;
  // Під час пошуку за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати.
  galleryEl.innerHTML = '';

  try {
    const photos = await fetchPhotosPixabay(inputSearchText, page);
    handleSuccess(photos);
    // return await photos.json();
  } catch (error) {
    handleError(error);
  }
}

async function handleBtnOnLoadMore() {
// З кожним наступним запитом, його необхідно збільшити на 1.
  page += 1; 
  try {
    const photos = await fetchPhotosPixabay(inputSearchText, page);
    handleSuccess(photos);
  } catch (error) {
    handleError(error);
  }
}

function handleSuccess(photos) {
  if (photos.length === 0) {
    Notiflix.Notify.success('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  function addMarkupPhotos(photos) {
    return photos.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
     `<div class="photo-card">
      <a href="${largeImageURL}"
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
  }).join('');
  };

  galleryEl.insertAdjacentHTML('beforeend', addMarkupPhotos());

  // Показуємо кнопку "Load more"
  btnLoadMoreEl.classList.remove('is-hidden'); 
  // btnLoadMoreEl.setAttribute('disabled', true);
}

function handleError(error) {
  // Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  console.error(error);
}


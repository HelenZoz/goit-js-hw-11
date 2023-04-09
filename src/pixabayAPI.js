import axios from 'axios';
import Notiflix from 'notiflix';

// // // сайт API
// // // 'https://pixabay.com/api/';
// // // отримай свій унікальний ключ доступу
const API_KEY = '35094796-5a2a00c884908a27b4c2774f3';

// // // key - твій унікальний ключ доступу до API.
// // // q - термін для пошуку. Те, що буде вводити користувач.
// // // image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
// // // orientation - орієнтація фотографії. Постав значення horizontal.
// // // safesearch - фільтр за віком. Постав значення true.
// // // `q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

// // // Pixabay API підтримує пагінацію і надає параметри page і per_page.
// // // Зроби так, щоб в кожній відповіді приходило 40 об'єктів (за замовчуванням 20)
// // // `page=${page}&per_page=40`;

// export async function fetchPhotosPixabay(searchQuery, page) {
//     const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
//     const response = await fetch(url);
//     console.log(response);
//   // return await response.json();
// }

export async function fetchPhotosPixabay(searchQuery, page) {
  const {data} = await axios
    .get(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
  console.log(data);
  return data;
}



import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { clearGallery, showLoader, hideLoader, showNoResults, hideNoResults, renderImages, showLoadMoreButton, hideLoadMoreButton, smoothScroll } from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';

document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  currentQuery = document.getElementById('search-input').value.trim();

  if (currentQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty!',
    });
    return;
  }

  currentPage = 1;
  clearGallery();
  hideNoResults();
  showLoader();
  hideLoadMoreButton();

  try {
    const imagesData = await fetchPhotosByQuery(currentQuery, currentPage);

    if (imagesData.hits.length === 0) {
      showNoResults();
    } else {
      renderImages(imagesData.hits);
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});

document.getElementById('load-more').addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const imagesData = await fetchPhotosByQuery(currentQuery, currentPage);

    if (imagesData.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      renderImages(imagesData.hits);
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});
import axios from "axios";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { clearGallery, showLoader, hideLoader, showNoResults, hideNoResults, renderImages, showLoadMoreButton, hideLoadMoreButton, smoothScroll } from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  currentQuery = searchInput.value.trim();

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

      if (imagesData.hits.length === 15) {
        showLoadMoreButton();
      }
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

loadMoreBtn.addEventListener('click', async () => {
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
      
      if (imagesData.hits.length < 15) {
        hideLoadMoreButton();
      }
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
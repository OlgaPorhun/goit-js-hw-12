import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const noResults = document.getElementById('no-results');
const loadMoreButton = document.getElementById('load-more');
let lightbox;

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showNoResults() {
  noResults.style.display = 'block';
}

export function hideNoResults() {
  noResults.style.display = 'none';
}

export function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

export function renderImages(images) {
  const markup = images.map(image => `
    <a class="gallery-item" href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      <div class="info">
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      </div>
    </a>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-item');
  } else {
    lightbox.refresh();
  }
}

export function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
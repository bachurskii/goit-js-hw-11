import { fetchImages } from './js/api';
import { searchForm, gallery, loadMoreBtn } from './js/refs';
import { showError } from './js/error';
import { showSuccess } from './js/success';
import { renderImages } from './js/markup';

let currentPage = 1;
let searchQuery = '';
let totalPages = 0;
const lightbox = new SimpleLightbox('.gallery-link', {});

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  currentPage = 1;

  try {
    const { images, totalHits } = await fetchImages(searchQuery, currentPage);
    totalPages = Math.ceil(totalHits / 40);
    renderImages(images, currentPage);
    lightbox.refresh();
    if (images.length > 0) {
      showSuccess(`Hooray! We found ${totalHits} images.`);
      showLoadMoreBtn();
    } else {
      clearGallery();
      showError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoadMoreBtn();
    }
  } catch (error) {
    console.error(error);
    showError('Oops! Something went wrong. Please try again later.');
    hideLoadMoreBtn();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    const { images, totalHits } = await fetchImages(
      searchQuery,
      currentPage + 1
    );
    renderImages(images, currentPage + 1);
    lightbox.refresh();
    currentPage += 1;
    if (currentPage === totalPages) {
      hideLoadMoreBtn();
      showError("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error(error);
    showError('Oops! Something went wrong. Please try again later.');
  }
});

const clearGallery = () => {
  gallery.innerHTML = '';
};

const showLoadMoreBtn = () => {
  loadMoreBtn.style.display = 'block';
};

const hideLoadMoreBtn = () => {
  loadMoreBtn.style.display = 'none';
};

hideLoadMoreBtn();

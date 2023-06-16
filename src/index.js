import { fetchImages } from './js/api';
import { searchForm, gallery, loadMoreBtn } from './js/refs';
import { showError } from './js/error';
import { renderImages } from './js/markup';

let currentPage = 1;
let searchQuery = '';

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  currentPage = 1;

  try {
    const images = await fetchImages(searchQuery, currentPage);
    renderImages(images, currentPage);

    if (images.length > 0) {
      showLoadMoreBtn();
    } else {
      showError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.error(error);
    showError('Oops! Something went wrong. Please try again later.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    const images = await fetchImages(searchQuery, currentPage + 1);
    renderImages(images, currentPage + 1);

    if (images.length === 0) {
      hideLoadMoreBtn();
      showError("We're sorry, but you've reached the end of search results.");
    } else {
      currentPage += 1;
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
clearGallery();
hideLoadMoreBtn();
hideLoadMoreBtn();

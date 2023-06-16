import { fetchImages } from './js/api';
import { searchForm, gallery, loadMoreBtn } from './js/refs';
import { showError } from './js/error';
import { renderImages } from './js/markup';

let currentPage = 1;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  currentPage = 1;
  clearGallery();
  hideLoadMoreBtn();

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
  currentPage += 1;
  const searchQuery = searchForm.elements.searchQuery.value.trim();

  try {
    const images = await fetchImages(searchQuery, currentPage);
    renderImages(images, currentPage);

    if (images.length === 0) {
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
  loadMoreBtn.removeAttribute('hidden');
};

const hideLoadMoreBtn = () => {
  loadMoreBtn.setAttribute('hidden', 'true');
};

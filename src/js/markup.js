import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const renderImages = (images, currentPage) => {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(
      image => `
      <a href="${image.largeImageURL}" class="gallery-link">
        <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" class="photo-card-img" loading="lazy" width="300" height="200" />
          <div class="photo-card-overlay">
            <p class="info-item"><b>Likes:</b> ${image.likes}</p>
            <p class="info-item"><b>Views:</b> ${image.views}</p>
            <p class="info-item"><b>Comments:</b> ${image.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </div>
      </a>
    `
    )
    .join('');

  if (currentPage === 1) {
    gallery.innerHTML = markup;
  } else {
    gallery.insertAdjacentHTML('beforeend', markup);
  }

  const lightbox = new SimpleLightbox('.gallery-link', {
    /* options */
  });
  lightbox.refresh();
};

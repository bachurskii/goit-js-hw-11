import axios from 'axios';

const API_KEY = '37252560-36dec1b2157d7a37d8f4686c6';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, pageNumber) {
  try {
    const response = await axios.get(
      `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`
    );

    const { data } = response;

    if (data.hits.length === 0) {
      gallery.innerHTML = '';
      showError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return [];
    }

    const images = data.hits.map(image => ({
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
      likes: image.likes,
      views: image.views,
      comments: image.comments,
      downloads: image.downloads,
    }));

    return images;
  } catch (error) {
    console.error(error);
    showError('Oops! Something went wrong. Please try again later.');
    throw error;
  }
}

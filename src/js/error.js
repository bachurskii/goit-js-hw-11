import Notiflix from 'notiflix';

export function showError(message) {
  Notiflix.Notify.failure(message);
}

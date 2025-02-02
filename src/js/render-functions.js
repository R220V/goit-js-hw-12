export function createGalleryCardTemplate(imgInfo) {
  return imgInfo
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
  <article class="card">
    <a class="gallery-link" href="${largeImageURL}"
      ><img class="gallery-img" src="${webformatURL}" alt="${tags}"
    /></a>
    <ul class="info-list">
      <li class="info-item">
        <h2 class="info-subtitle">Likes:</h2>
        <p class="info-text">${likes}</p>
      </li>
      <li class="info-item">
        <h2 class="info-subtitle">Views:</h2>
        <p class="info-text">${views}</p>
      </li>
      <li class="info-item">
        <h2 class="info-subtitle">Comments:</h2>
        <p class="info-text">${comments}</p>
      </li>
      <li class="info-item">
        <h2 class="info-subtitle">Downloads:</h2>
        <p class="info-text">${downloads}</p>
      </li>
    </ul>
  </article>
</li>`;
      }
    )
    .join('');
}

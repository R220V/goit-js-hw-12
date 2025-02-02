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
        return `<li class="gallery-card">
              <section class="card">
              <a class="gallery-link" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
              </a>
              <div class="gallery-container">
                <div class="gallery-item">
                  <p class="gallery-title">Likes</p>
                  <p class="gallery-count">${likes}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Views</p>
                  <p class="gallery-count">${views}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Comments</p>
                  <p class="gallery-count">${comments}</p>
                </div>
                <div class="gallery-item">
                  <p class="gallery-title">Downloads</p>
                  <p class="gallery-count">${downloads}</p>
                </div>
              </div>
            </section>
          </li>`;
      }
    )
    .join('');
}

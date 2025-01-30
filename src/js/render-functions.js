
export const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input[name="searchQuery"]'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'), 
    loadMore: document.querySelector('.load-more'),
};


export function renderGallery(hits, append = false) {
    const markup = hits.map(renderMarkup).join("");

    if (append) {
        refs.gallery.insertAdjacentHTML("beforeend", markup); 
    } else {
        refs.gallery.innerHTML = markup;
    }
}
function renderMarkup(hit) {
    return `
    <div class="photo-card">
        <a class="card-link" href="${hit.largeImageURL}">
            <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item"><b>Likes</b> <span>${hit.likes}</span></p>
            <p class="info-item"><b>Views</b> <span>${hit.views}</span></p>
            <p class="info-item"><b>Comments</b> <span>${hit.comments}</span></p>
            <p class="info-item"><b>Downloads</b> <span>${hit.downloads}</span></p>
        </div>
    </div>`;
}

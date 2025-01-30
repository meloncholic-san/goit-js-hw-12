import { refs, renderGallery } from './js/render-functions';
import getQuery from "./js/pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

let query = null;
let page = null;

refs.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = refs.input.value.trim();
    page = 1;
    if (!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query!',
            position: 'topRight',
            timeout: 3000
        });
        return;
    }

    refs.gallery.innerHTML = '';

    try {
        const response = await getQuery(query,page);
        const hits = response.hits;
        console.log(response)
        if (!hits || hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again.',
                position: 'topRight',
                timeout: 3000
            });
            return;
        }

        renderGallery(hits);
        lightBoxGallery.refresh();
        refs.loadMore.classList.remove('hidden');
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later!',
            position: 'topRight',
            timeout: 3000
        });
    }
});

const lightBoxGallery = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    animationSpeed: 300,
    enableKeyboard: true,
});




refs.loadMore.addEventListener('click', loadMoreHandler);

async function loadMoreHandler(event) {
    page+=1;
    event.preventDefault();
    refs.loadMore.classList.add('hidden');
    try {
        const response = await getQuery(query,page);
        const hits = response.hits;

        if (!hits || hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again.',
                position: 'topRight',
                timeout: 3000
            });
            return;
        }

        renderGallery(hits, true);
        lightBoxGallery.refresh();
        scrollToNewImages();
        refs.loadMore.classList.remove('hidden');

        if (page * 15 >= response.totalHits) {
            refs.loadMore.classList.add("hidden");

            iziToast.warning({
                title: 'Warning',
                message: "We`re sorry, but you've reached the end of search results.",
                position: 'topRight',
                timeout: 3000
            });
        }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later!',
            position: 'topRight',
            timeout: 3000
        });
    }
}


function scrollToNewImages() {
        const { height } = document.querySelector('.photo-card').getBoundingClientRect();
        window.scrollBy({ top: height*2, behavior: 'smooth' });
}
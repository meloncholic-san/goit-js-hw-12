import axios from "axios";
import { refs } from './render-functions';

const API_KEY = '47870617-7ec65d65554e9e3e1b4aa2202';
const BASE_URL = 'https://pixabay.com/api/';

export default async function getQuery(query, page) {

    refs.loader.classList.remove("hidden"); 
    refs.loadMore.classList.add("hidden");
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 15,
                page: page
            }
        });

        return response.data;
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        throw error;
    } finally {
        refs.loader.classList.add("hidden");
    }
}
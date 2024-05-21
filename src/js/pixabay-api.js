import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43965450-8f7f6d09b5429fd61500b9928';

export async function fetchPhotosByQuery(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error('Failed to fetch images');
  }

  return response.data;
}
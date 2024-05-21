import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43965450-8f7f6d09b5429fd61500b9928';

export async function fetchPhotosByQuery(query, page = 1, perPage = 15) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page.toString(),
    per_page: perPage.toString()
  });

  const url = `${BASE_URL}?${params.toString()}`;
  const response = await axios.get(url);

  return response.data;
}
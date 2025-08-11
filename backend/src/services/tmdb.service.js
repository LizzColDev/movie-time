import axios from 'axios';
import config from '../../config/index.js';

const tmdbApi = axios.create({
  baseURL: config.tmdbApiUrl,
  headers: {
    Authorization: `Bearer ${config.tmdbAccessToken}`,
  },
});

export async function getTrendingMovies(language = 'en-US') {
  const { data } = await tmdbApi.get('/trending/movie/day', {
    params: { language },
  });
  return data;
}

export async function getMoviesByCategory(
  categoryId,
  language = 'en-US',
  page = 1,
) {
  const { data } = await tmdbApi.get('/discover/movie', {
    params: { with_genres: categoryId, language, page },
  });
  return data;
}

export async function getMoviesBySearch(query, language = 'en-US', page = 1) {
  const { data } = await tmdbApi.get('/search/movie', {
    params: { query, language, page },
  });
  return data;
}

export async function getMovieDetails(movieId, language = 'en-US') {
  const { data } = await tmdbApi.get(`/movie/${movieId}`, {
    params: { language },
  });
  return data;
}

export async function getSimilarMovies(movieId, language = 'en-US') {
  const { data } = await tmdbApi.get(`/movie/${movieId}/similar`, {
    params: { language },
  });
  return data;
}

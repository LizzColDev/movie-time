import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  tmdbAccessToken: process.env.TMDB_ACCESS_TOKEN,
  tmdbApiUrl: process.env.TMDB_API_URL || 'https://api.themoviedb.org/3',
};

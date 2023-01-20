// Sections
const headerSection = document.querySelector('#header');
const trendingPreviewSection = document.querySelector('#trendingPreview');
const categoriesPreviewSection = document.querySelector('#categoriesPreview');
const genericSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');
const footer = document.querySelector('footer');
const likedMoviesSection = document.querySelector('#liked');

// Lists & Containers
const searchForm = document.querySelector('#searchForm');
const trendingMoviesPreviewList = document.querySelector(
  '.trendingPreview-movieList'
);
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const movieDetailCategoriesList = document.querySelector(
  '#movieDetail .categories-list'
);
const relatedMoviesContainer = document.querySelector(
  '.relatedMovies-scrollContainer'
);
const likedMoviesContainer = document.querySelector('.liked-movieList');
const selectContainLanguaje = document.querySelector('.languages-section');

// Elements
const headerTitle = document.querySelector('.header-title');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector(
  '.header-title--categoryView'
);
const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');

const trendingBtn = document.querySelector('.trendingPreview-btn');
const trendingPreviewTitle = document.querySelector('.trendingPreview-title');
const trendingPreviewBtn = document.querySelector('.trendingPreview-btn');

const categoriesPreviewTitle = document.querySelector(
  '.categoriesPreview-title'
);

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector(
  '.movieDetail-description'
);
const movieDetailScore = document.querySelector('.movieDetail-score');

const likedTitle = document.querySelector('.liked-title');

const relatedMoviesTitle = document.querySelector('.relatedMovies-title');

const inputSearch = document.querySelector('.input-Search');

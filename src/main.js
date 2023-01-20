// Data

let lang = localStorage.getItem('language') || navigator.language;
let langSelected = localStorage.getItem('languageSelected') || 'Español';
let API_KEY;

// createLanguageSections()
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'aplication/json; charset=utf-8',
  },
  params: {
    api_key: getApiKey(),
    language: lang,
  },
});

// localStorage
function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem('liked_movies'));
  let movies;

  if (item) {
    movies = item;
  } else {
    movies = {};
  }
  return movies;
}

function likeMovie(movie) {
  const likedMovies = likedMoviesList();
  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }
  localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
  getLikedMovies();
  getTrendingMoviesPreview();
}

// función nodes // utils

function getApiKey() {
  if (!API_KEY) {
    return (API_KEY = prompt('Digite su API_KEY:'));
  }
}
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const movieImg = entry.target;
      const url = movieImg.getAttribute('data-img');
      movieImg.setAttribute('src', url);
      observer.unobserve(movieImg);
    }
  });
});

function createMovies(
  movies,
  container,
  { lazyLoad = false, cleanPage = false }
) {
  if (cleanPage) {
    container.innerHTML = '';
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    // Event to check for errors in images
    movieImg.setAttribute(
      // If it has the observer parameter, we add the data-img attribute, if not, directly to the src
      lazyLoad ? 'data-img' : 'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path
    );
    // click event to access the details of the movie
    movieImg.addEventListener(
      'click',
      () => (location.hash = '#movie=' + movie.id)
    );
    movieImg.addEventListener('error', () => {
      movieImg.setAttribute(
        'src',
        'https://img.icons8.com/arcade/512/popcorn.png'
      );
      let movieTitle = document.createElement('span');
      movieTitle.textContent = movie.title;

      movieContainer.insertAdjacentElement('afterbegin', movieTitle);
      movieTitle.style.fontWeight = 'bold';
      movieContainer.style.display = 'flex';
      movieContainer.style.flexDirection = 'column';
      movieContainer.style.alignItems = 'center';
    });

    // like button
    const movieBtn = document.createElement('button');
    movieBtn.classList.add('movie-btn');
    likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
    movieBtn.addEventListener('click', () => {
      movieBtn.classList.toggle('movie-btn--liked');
      likeMovie(movie);
    });

    // intersection observer
    if (lazyLoad) {
      observer.observe(movieImg);
    }
    movieContainer.append(movieImg, movieBtn);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = '';

  categories.forEach((category) => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener(
      'click',
      () => (location.hash = `#category=${category.id}-${category.name}`)
    );
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

function createLanguages() {
  selectContainLanguaje.innerText = '';
  languages.forEach((language) => {
    let optionLanguage = document.createElement('option');
    optionLanguage.setAttribute('name', language.name);
    optionLanguage.innerText = language.name;
    optionLanguage.value = language.iso_639_1;

    selectContainLanguaje.appendChild(optionLanguage);
  });
}

function selectedLanguage(e) {
  lang = e.target.value;
  localStorage.setItem('language', lang);

  const selectedOptionValue = e.target.value;
  const selectedOption = selectContainLanguaje.querySelector(
    `option[value="${selectedOptionValue}"]`
  );
  const optionName = selectedOption.getAttribute('name');

  localStorage.setItem('languageSelected', optionName);
  homePage();
}

function getPreferredLanguage() {
  langSelected = localStorage.getItem('languageSelected');
  lang = localStorage.getItem('language') || lang;

  languages.sort((a, b) => {
    if (a.name === langSelected) {
      return -1;
    } else if (b.name === langSelected) {
      return 1;
    } else {
      return 0;
    }
  });
}

function createLanguageSections() {
  languagesSections.filter((item) => {
    if (langSelected === item.language) {
      trendingPreviewTitle.textContent = item.trendingTitle;
      trendingPreviewBtn.textContent = item.trendingSeeMore;
      categoriesPreviewTitle.textContent = item.categories;
      likedTitle.textContent = item.likedTitle;
      relatedMoviesTitle.textContent = item.relatedMovies;
      inputSearch.placeholder = item.inputPlaceholder;
      headerCategoryTitle.textContent = item.trendingTitle;
    }
  });
}

async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day', {
    params: {
      language: lang,
    },
  });
  const movies = data.results;
  createMovies(movies, trendingMoviesPreviewList, {
    lazyLoad: true,
    cleanPage: true,
  });
}

async function getCategoriesMoviesPreview() {
  const { data } = await api('genre/movie/list', {
    params: {
      language: lang,
    },
  });
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api('/discover/movie', {
    params: {
      with_genres: id,
      language: lang,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection, { lazyLoad: true, cleanPage: true });
}

function getPaginatedMoviesByCategory(id) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

    const pageIsNotMax = page < maxPage;
    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api('/discover/movie', {
        params: {
          with_genres: id,
          language: lang,
          page,
        },
      });
      const movies = data.results;
      createMovies(movies, genericSection, {
        lazyLoad: true,
        cleanPage: false,
      });
    }
  };
}

async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query: query,
      language: lang,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, genericSection, { lazyLoad: true, cleanPage: true });
}

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

    const pageIsNotMax = page < maxPage;
    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api('search/movie', {
        params: {
          query: query,
          language: lang,
          page,
        },
      });
      const movies = data.results;
      createMovies(movies, genericSection, {
        lazyLoad: true,
        cleanPage: false,
      });
    }
  };
}

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  // We get the maximum number of pages, to stop pagination when reaching the maximum
  maxPage = data.total_pages;

  createMovies(movies, genericSection, { lazyLoad: true, cleanPage: true });
}

async function getPaginatedTrendingMovies() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api('trending/movie/day', {
      params: {
        page,
      },
    });
    const movies = data.results;
    createMovies(movies, genericSection, { lazyLoad: true, cleanPage: false });
  }
}

async function getMovieById(movie_id) {
  const { data: movie } = await api(`movie/${movie_id}`, {
    params: {
      language: lang,
    },
  });

  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
    url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);

  const movieBtn = document.createElement('button');
  movieBtn.style.right = '30px';
  movieBtn.classList.add('movie-btn');
  likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
  movieBtn.addEventListener('click', () => {
    movieBtn.classList.toggle('movie-btn--liked');
    likeMovie(movie);
  });

  movieDetailDescription.appendChild(movieBtn);

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesId(movie_id);
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/similar`, {
    params: {
      language: lang,
    },
  });
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer, {
    lazyLoad: true,
    cleanPage: true,
  });
}

function getLikedMovies() {
  const likedMovies = likedMoviesList();
  // We convert the object's values into an array
  const moviesArray = Object.values(likedMovies);
  createMovies(moviesArray, likedMoviesContainer, {
    lazyLoad: true,
    cleanPage: true,
  });
}

// Data
// const urlLang = 'https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>&language=de'
//crear la configuración por defecto que trabajaremos con AXIOS, no solo se pueden agregar header sino también query parameters
let lang = localStorage.getItem('language') || navigator.language ;
let langSelected = localStorage.getItem('languageSelected') || 'Español'
let API_KEY;

console.log(API_KEY)
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'aplication/json; charset=utf-8'
    },
    params: {
        'api_key': getApiKey(),
        'language': lang,
    }
});


// FUNCIONES PARA LOCALSTORAGE, GRABAR PELÍCULAS FAVORITOS
function likedMoviesList(){
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if(item){
        movies = item

    } else{
        movies={}
    }
    return movies;
}

function likeMovie(movie){
    // movie.id
    const likedMovies = likedMoviesList();
    if(likedMovies[movie.id]){
        likedMovies[movie.id] = undefined;
    } else{
        likedMovies[movie.id] = movie
    }
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
    getTrendingMoviesPreview()
    getLikedMovies()
}

// función nodes // utils

function getApiKey(){
    if(!API_KEY){
        return API_KEY = prompt('Digite su API_KEY:')
    }
}
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if(entry.isIntersecting){
            const movieImg = entry.target
            const url = movieImg.getAttribute('data-img')
            movieImg.setAttribute('src', url);
            observer.unobserve(movieImg);
        }
    })
})

function createMovies(
    movies, 
    container, 
    {
        lazyLoad = false, 
        cleanPage= false
    }){
    if(cleanPage){
        container.innerHTML="";
    }

    movies.forEach(movie =>  {
        const movieContainer =document.createElement('div')
        movieContainer.classList.add('movie-container');



        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title);
        // evento para verificar errores en las imágenes
        movieImg.setAttribute(
            // si tiene como parámetro el observer, le agregamos atributo data-img, si no, directamente al src
            lazyLoad ? 'data-img' : 'src', 
            'https://image.tmdb.org/t/p/w300'+ movie.poster_path,
            );
            // evento de click para acceder a los detalles de la película
            movieImg.addEventListener('click', () => location.hash = '#movie=' + movie.id);
            movieImg.addEventListener('error', ()=>{
                movieImg.setAttribute('src', 'https://img.icons8.com/arcade/512/popcorn.png')
                let movieTitle = document.createElement('span')
                movieTitle.textContent = movie.title
                
                movieContainer.insertAdjacentElement("afterbegin", movieTitle)
                movieTitle.style.fontWeight = 'bold'
                movieContainer.style.display = 'flex'
                movieContainer.style.flexDirection = 'column'
                movieContainer.style.alignItems = 'center'
            });

            // botón like
            const movieBtn = document.createElement('button');
            movieBtn.classList.add('movie-btn');
            likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
            movieBtn.addEventListener('click', () =>{
                movieBtn.classList.toggle('movie-btn--liked');

                // función que agrega las películas a la sección de favoritas
                likeMovie(movie);
            } );


            // intersection observer
            if(lazyLoad){
                observer.observe(movieImg)
            }
            movieContainer.append(movieImg, movieBtn)
            container.appendChild(movieContainer)
    });
}

function createCategories(categories, container){
    container.innerHTML = "";

    categories.forEach(category =>  {
        const categoryContainer =document.createElement('div')
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')
        categoryTitle.setAttribute('id', 'id'+ category.id);
        categoryTitle.addEventListener('click', () => location.hash = `#category=${category.id}-${category.name}`)
        const categoryTitleText =document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
        
    });
}

function createLanguages(){
    selectContainLanguaje.innerText = ''
    languages.forEach(language=>{
        let optionLanguage = document.createElement('option');
        optionLanguage.setAttribute('name', language.name)
        optionLanguage.innerText = language.name;
        optionLanguage.value = language.iso_639_1;

        selectContainLanguaje.appendChild(optionLanguage)
    })
}

selectContainLanguaje.addEventListener('change', (e)=>{
            lang = e.target.value
            localStorage.setItem('language', lang)

            const selectedOptionValue = e.target.value;
            const selectedOption = selectContainLanguaje.querySelector(`option[value="${selectedOptionValue}"]`);
            const optionName = selectedOption.getAttribute('name');

            localStorage.setItem('languageSelected', optionName)

            getTrendingMoviesPreview ()
            getCategoriesMoviesPreview ()
            getLikedMovies()
})

function getPreferredLanguage() {
    langSelected = localStorage.getItem('languageSelected') 
    lang = localStorage.getItem('language') || lang;
}

// función para conseguir el preview de la lista de películas en tendencia
async function getTrendingMoviesPreview (){
    const {data} = await api('trending/movie/day', {
        params: {
            'language': lang,
        }
    })
    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList, {lazyLoad:true, cleanPage:true});
}

async function getCategoriesMoviesPreview (){
    const {data} = await api('genre/movie/list', {
        params: {
            'language': lang,
        }
    } )
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory (id){
    const {data} = await api('/discover/movie', {
        params: {
            with_genres: id,
            'language': lang,
        }
    })
    const movies = data.results;
    maxPage = data.total_pages;
    createMovies(movies, genericSection, {lazyLoad:true, cleanPage:true});
}

function getPaginatedMoviesByCategory(id){
    return async function (){
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        const scrollIsBottom = (scrollTop+clientHeight)>= (scrollHeight -15)
    
        const pageIsNotMax = page < maxPage;
        if(scrollIsBottom && pageIsNotMax){
            page++
            const {data} = await api('/discover/movie', {
                params: {
                    with_genres: id,
                    'language': lang,
                    page,
                }
            })
            const movies = data.results;
            createMovies(
                movies, 
                genericSection, 
                {lazyLoad:true, cleanPage:false},
            );
        }
    }
}
async function getMoviesBySearch (query){
    const {data} = await api('search/movie', {
        params: {
            query: query,
            'language': lang,
        }
    })
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, {lazyLoad:true, cleanPage:true});
}

function getPaginatedMoviesBySearch(query){
    return async function (){
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop+clientHeight)>= (scrollHeight -15)
    
        const pageIsNotMax = page < maxPage;
        if(scrollIsBottom && pageIsNotMax){
            page++
            const {data} = await api('search/movie', {
                params: {
                    query: query,
                    'language': lang,
                    page,
                }
            })
            const movies = data.results;
            createMovies(
                movies, 
                genericSection, 
                {lazyLoad:true, cleanPage:false},
            );
        }
    }
}

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day')
    const movies = data.results;
    
    // obtenemos la cantidad máxima de páginas, para en paginación parar al llegar al máximo
    maxPage = data.total_pages
    console.log(maxPage)

    // llamamos el nodo para crear los elementos
    createMovies(
        movies, 
        genericSection, 
        {lazyLoad:true, cleanPage:true}
    );
}

async function getPaginatedTrendingMovies(){
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    const scrollIsBottom = (scrollTop+clientHeight)>= (scrollHeight -15)

    const pageIsNotMax = page < maxPage;
    
    if(scrollIsBottom && pageIsNotMax){
        page++
        const {data} = await api('trending/movie/day', {
            params:{
                page,
            },
        })
        console.log(data)
        const movies = data.results;
        createMovies(
            movies, 
            genericSection, 
            {lazyLoad:true, cleanPage: false}
        );
    }
}

// async function getLanguages(lang){

//         const {data} = await api('/movie', {
//             params:{
//                 'language': lang,
//             },
//         })
//         console.log(data)
//         const movies = data.results;
//         console.log(movies)
// }

async function getMovieById(movie_id){

    const {data: movie} = await api(`movie/${movie_id}`, {
        params: {
            'language': lang,
        }
    })
    
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500'+ movie.poster_path
    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
    url(${movieImgUrl})`

    
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(movie_id)
}

async function getRelatedMoviesId(id){
    const {data} = await api(`movie/${id}/similar`,{
        params: {
            'language': lang,
        }
    });
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer, {lazyLoad:true, cleanPage:true})
}

function getLikedMovies(){
    const likedMovies = likedMoviesList()
    // convertimos los valores del objeto en array
    const moviesArray = Object.values(likedMovies)
    createMovies(moviesArray, likedMoviesContainer, {lazyLoad: true, cleanPage: true})
}
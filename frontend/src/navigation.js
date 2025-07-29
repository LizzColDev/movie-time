let maxPage;
let page = 1;
let infiniteScroll;


searchFormBtn.addEventListener('click', () => {
    console.log(searchFormInput.value)
    if(searchFormInput.value){
        location.hash = '#search='+ searchFormInput.value
    }
});
trendingBtn.addEventListener('click', () => location.hash = '#trends');
arrowBtn.addEventListener('click', () => {
    // Si el usuario es la primera vez que llega a una página, lo llevamos a la página principal
    if (window.history.length <= 2) {
    location.hash = '#home';
    } else {
    window.history.back();
    }
});
headerTitle.addEventListener('click', () => location.hash = '#home');

window.addEventListener('DOMContentLoaded', appNavigator, false);
window.addEventListener('hashchange', appNavigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function appNavigator(){
    console.log({location});

    if(infiniteScroll){
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }
    location.hash.startsWith('#trends')
        ? trendsPage()
        : location.hash.startsWith('#search=')
            ? searchPage()
            : location.hash.startsWith('#movie=')
                ? movieDetailPage()
                : location.hash.startsWith('#category=')
                    ? categoriesPage()
                    : homePage();

                    //para que cada vez que entre a algún hash, se vea desde el inicio de la página, no desde el fin
                    document.documentElement.scrollTop =0;
                    document.body.scrollTop = 0;

    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, {passive: false});
    }

    getPreferredLanguage();

}

if(langSelected){
    languages.sort((a,b) =>{
        if(a.name === langSelected){
            return -1;
        } else if (b.name === langSelected){
            return 1;
        } else{
            return 0;
        }
    })
}

function homePage(){
    console.log('Home!!')
    

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow-white');

    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    selectContainLanguaje.classList.remove('inactive')

    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getCategoriesMoviesPreview();
    getTrendingMoviesPreview();
    getLikedMovies();
    createLanguages();
}
function categoriesPage(){

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow-white');

    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    selectContainLanguaje.classList.add('inactive')

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //para obtener el id
    // separamos el location.hash("#category=28-Action")
    const [, categoryData] = location.hash.split("=")
    console.log(categoryData) // 28-Action
    
    // ahora separamos el categoryData, en el id y el nombre de la categoría

    const [categoryId, categoryName] = categoryData.split('-')
    
    // le asignamos el nombre de la categoría al nodo que lo requiere
    headerCategoryTitle.innerText = decodeURI(categoryName)
    
    // llamamos la función con el id
    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailPage(){

    headerSection.classList.add('header-container--long')

    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow-white');

    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    selectContainLanguaje.classList.add('inactive')

    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    footer.classList.add('inactive')

    let id = location.hash.split('=')[1];

    getMovieById(id);
}

function searchPage(){

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow-white');

    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    selectContainLanguaje.classList.add('inactive')

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    let query = location.hash.split('=')[1];
    
    getMoviesBySearch(decodeURI(query)) 
    infiniteScroll = getPaginatedMoviesBySearch(decodeURI(query));
}

function trendsPage(){

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow-white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    selectContainLanguaje.classList.add('inactive')

    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    headerCategoryTitle.innerText = 'Tendencias'

    getTrendingMovies()
    console.log('TRENDS')
    infiniteScroll = getPaginatedTrendingMovies;
}
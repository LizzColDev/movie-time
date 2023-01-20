let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    if(searchFormInput.value){
        location.hash = '#search='+ searchFormInput.value
    }
});
trendingBtn.addEventListener('click', () => location.hash = '#trends');
arrowBtn.addEventListener('click', () => {
    // If the user is visiting a page for the first time, we redirect them to the homepage.
    if (window.history.length <= 2) {
    location.hash = '#home';
    } else {
    window.history.back();
    }
});
headerTitle.addEventListener('click', () => location.hash = '#home');
selectContainLanguaje.addEventListener('change', (e)=>{
    selectedLanguage(e)
})
window.addEventListener('DOMContentLoaded', appNavigator, false);
window.addEventListener('hashchange', appNavigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function appNavigator(){

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

                    document.documentElement.scrollTop =0;
                    document.body.scrollTop = 0;

    if(infiniteScroll){
        window.addEventListener('scroll', infiniteScroll, {passive: false});
    }
}

function homePage(){
    
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

    footer.classList.remove('inactive')

    getCategoriesMoviesPreview();
    getTrendingMoviesPreview();
    getLikedMovies();
    getPreferredLanguage();
    createLanguages();
    createLanguageSections();

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

    //to get the id - Separating the location.hash("#category=28-Action")
    const [, categoryData] = location.hash.split("=")
    
    // now we split the categoryData, into the id and the name of the category

    const [categoryId, categoryName] = categoryData.split('-')
    
    // We assign the category name to the node that requires it.
    headerCategoryTitle.innerText = decodeURI(categoryName)
    
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
    getTrendingMovies()
    infiniteScroll = getPaginatedTrendingMovies;
    // headerCategoryTitle.innerText = 'Tendencias'


}
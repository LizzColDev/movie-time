### MovieTime

**Table of Contents**

- [Description](#description)
- [Files](#files)
- [How to use](#how-to-use)
- [Functionality](#functionality)
- [Limitations](#limitations)
- [Future improvements](#future-improvements)

### Description

- You will need an API key from The Movie DB to use the app. You can get one by signing up on their website: https://developers.themoviedb.org/3/getting-started/introduction
- Once you have the API key, you will be prompted to enter it when the app loads.

![My gif](https://github.com/LizzColDev/curso-api-rest/blob/github-pages/gif/MovieTime.gif)

This is a codebase for a movie application that displays trending movies, movie categories, and allows users to search for movies and view details about them. The application also allows users to mark movies as "favorites" and view a list of their favorite movies. The application is built using HTML, CSS, and JavaScript.

## Files

- **index.html:** The main HTML file that defines the structure of the application
- **styles/app.css:** The CSS file that defines the styling of the application.
- **src/main.js**: Contains the necessary logic for the operation of the application. It is responsible for navigating between the different sections of the page, as well as making calls to The Movie DB API to obtain information about the movies. It also contains the necessary logic for the "Like" functionality and search.
- **languages.js:** Contains an array of languages supported by the website.
- **src/lazy.js:** A JavaScript file that uses IntersectionObserver API to handle the lazy loading of images.
- **node.js: **Contains helper functions for creating and manipulating DOM elements. 

## How to use

- Clone the repository or download the files.
- Open the index.html file in your browser.
- You will need an API key from The Movie DB to use the app. You can get one by signing up on their website: https://developers.themoviedb.org/3/getting-started/introduction
- Once you have the API key, you will be prompted to enter it when the app loads.
- Use the search bar to search for movies or click on the trending or categories buttons to view the corresponding pages.
- Click on a movie image to view its details.
- Click on the like button to save a movie to your favorites.

## Functionality
- **appNavigator function:** This function is used to handle navigation between different pages in the application. It is triggered on **DOMContentLoaded** and **hashchange** events.
- **homePage**, **trendsPage**, **searchPage**, **movieDetailPage**, and **categoriesPage** **functions**: These functions are used to handle the display of different pages in the application. They are called by the appNavigator function.
- **getApiKey**, **likedMoviesList**, and **likeMovie** **functions**: These functions are used to handle the storage and retrieval of data from the browser's local storage.
- **createMovies** **function**: This function is used to create and display a list of movie elements in the application.
- **registerImage** **function**: This function is used to register images for lazy loading.

## Limitations
- The app only works with an internet connection and an API key from The Movie DB.
- The application is a prototype and may contain bugs or errors that have not yet been identified.

- The application is a prototype and may not have all the features and functionalities implemented.

- The application is a prototype and may not have all the features and functionalities that are needed for the final version.

- The application may have a limited scalability, it is not intended for high-traffic sites.

- The code of the application may not be optimized for the production environment.

- The application may not have the security features that are needed for the final version.

## Future Improvements

- Add pagination to the search and categories pages.
- Add a way to view more details about the movie, such as cast and crew.
- Optimize the app for mobile devices.
- Add a way to filter the search results by different criteria.
- Add a way to view the users favorite movies offline.

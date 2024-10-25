const API_KEY = '5670268c';
const genreButtons = document.querySelectorAll('.genre-btn');
const genreMoviesContainer = document.getElementById('genreMoviesContainer');
const genreMoviesSection = document.getElementById('genreMoviesSection');
async function fetchMoviesByGenre(genre) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${genre}&type=movie`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}


function displayMovies(movies, genre) {
    genreMoviesContainer.innerHTML = '';
    const genreTitle = document.querySelector('#genreMoviesSection h2');


    genreTitle.innerText = `${genre} Movies`;

    if (movies.length === 0) {
        genreMoviesContainer.innerHTML = '<p>No movies found for this genre.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
        `;
        genreMoviesContainer.appendChild(movieEl);
    });

    genreMoviesSection.style.display = 'block';
}


genreButtons.forEach(button => {
    button.addEventListener('click', async() => {
        const genre = button.getAttribute('data-genre');
        const movies = await fetchMoviesByGenre(genre);
        displayMovies(movies, genre);

        // إزالة الصنف active من جميع الأزرار
        genreButtons.forEach(btn => btn.classList.remove('active'));

        // إضافة الصنف active للزر المحدد
        button.classList.add('active');
    });
});



async function loadDefaultGenre() {
    const defaultGenre = 'Action';
    const movies = await fetchMoviesByGenre(defaultGenre);
    displayMovies(movies, defaultGenre);
}


document.addEventListener('DOMContentLoaded', loadDefaultGenre);
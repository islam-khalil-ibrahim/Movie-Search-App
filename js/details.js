const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');


fetch(`https://www.omdbapi.com/?apikey=5670268c&i=${movieId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("moviePoster").src = data.Poster;
        document.getElementById("movieTitle").innerText = data.Title;
        document.getElementById("moviePlot").innerText = data.Plot;
        document.getElementById("movieReleased").innerText = data.Released;
        document.getElementById("movieGenre").innerText = data.Genre;
        document.getElementById("movieDirector").innerText = data.Director;
        document.getElementById("movieRating").innerText = data.imdbRating;
    })
    .catch(error => {
        console.error("Error fetching movie details:", error);
    });
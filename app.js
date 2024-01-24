"use strict";
const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const moviePoster = document.querySelector(".movie-poster");
const movieDetail = document.querySelector(".movie-detail");
const inputBox = document.querySelector(".inputbox");
//function to fetch movie detail using OMBD API
async function getmovieInfo(movie) {
  try {
    const apiKey = "ac9809eb";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;
    const respond = await fetch(url);
    if (!respond.ok) {
      throw new Error("Unable to fetch data");
    }
    const data = await respond.json();
    showMovieData(data);
  } catch (error) {
    showerrorMessage("No movie found");
  }
}
function showerrorMessage(message) {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
  movieContainer.classList.add("hide");
}
//function to show movie data on screen
function showMovieData(data) {
  movieContainer.innerHTML = ``;
  movieContainer.classList.remove("hide");
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;
  const movieElemet = document.createElement("div");
  movieElemet.classList.add("movie-info");
  movieElemet.innerHTML = `<h2>${Title}</h2>
    <p><strong>Rating :&#11088;</strong>${imdbRating}</p>`;
  movieContainer.appendChild(movieElemet);
  const movieGenreElemet = document.createElement("div");
  movieGenreElemet.classList.add("movie-genre");
  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;
    movieGenreElemet.appendChild(p);
  });
  movieElemet.appendChild(movieGenreElemet);
  movieElemet.innerHTML += `
  <p><strong>Released Date :</strong>${Released}</p>
  <p><strong>Duration :</strong>${Runtime}</p>
  <p><strong>Cast :</strong>${Actors}</p>
  <p><strong>Plot :</strong>${Plot}</p>`;
  //creating a div for movie poster
  const moviePosterElemnt = document.createElement("div");
  moviePosterElemnt.classList.add("movie-poster");
  moviePosterElemnt.innerHTML = `<img src=${Poster}/>`;
  movieContainer.appendChild(moviePosterElemnt);
  movieContainer.appendChild(movieElemet);
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showerrorMessage("Fetching Movie info....");
    getmovieInfo(movieName);
  } else {
    showerrorMessage("Enter movie name to get movie info");
  }
});

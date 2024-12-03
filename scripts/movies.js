const movieForm = document.getElementById("movie-form");
const movieResults = document.getElementById("movie-results");

// Fetch movies from TMDB API
const fetchMovies = async (query) => {
  const apiKey = "34a8e8fd8ade31a0ede9ad30a5697ef7";
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
  
  try {
    movieResults.innerHTML = "<p>Loading...</p>";
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
      movieResults.innerHTML = "<p>No movies found. Try a different query.</p>";
      return;
    }

    // Render movies
    movieResults.innerHTML = data.results.map(movie => `
      <div class="movie">
        <h3>${movie.title}</h3>
        <p><strong>Release Date:</strong> ${movie.release_date || "N/A"}</p>
        <p><strong>Overview:</strong> ${movie.overview || "No overview available."}</p>
      </div>
    `).join("");
  } catch (error) {
    movieResults.innerHTML = "<p>Error fetching movies. Please try again later.</p>";
    console.error(error);
  }
};

// Handle form submission
movieForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("movie-query").value.trim();
  if (query) {
    fetchMovies(query);
  }
});

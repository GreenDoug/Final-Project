const jokeDisplay = document.getElementById("joke-display");
const fetchJokeButton = document.getElementById("fetch-joke");

// Fetch a random joke from the API
const fetchJoke = async () => {
  try {
    jokeDisplay.innerHTML = "<p>Loading...</p>";
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const joke = await response.json();

    // Display the joke
    jokeDisplay.innerHTML = `
      <p><strong>${joke.setup}</strong></p>
      <p>${joke.punchline}</p>
    `;
  } catch (error) {
    jokeDisplay.innerHTML = "<p>Failed to fetch a joke. Please try again later.</p>";
    console.error("Error fetching joke:", error);
  }
};

// Add event listener to fetch joke on button click
fetchJokeButton.addEventListener("click", fetchJoke);

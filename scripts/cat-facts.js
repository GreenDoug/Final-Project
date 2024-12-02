const catFactDisplay = document.getElementById("cat-fact-display");
const fetchCatFactButton = document.getElementById("fetch-cat-fact");

const fetchCatFact = async () => {
    try {
        catFactDisplay.innerHTML = "<p>Loading...</p>";
        const response = await fetch("https://catfact.ninja/fact");
        const fact = await response.json();

        catFactDisplay.innerHTML = `<p>${fact.fact}</p>`;
    } catch (error) {
        catFactDisplay.innerHTML = "<p>Failed to fetch a cat fact. Please try again later.</p>";
        console.error("Error fetching cat fact:", error);
    }
};

fetchCatFactButton.addEventListener("click", fetchCatFact);

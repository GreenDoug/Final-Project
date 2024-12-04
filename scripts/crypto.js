const cryptoForm = document.getElementById("crypto-form");
const cryptoResults = document.getElementById("crypto-results");

const fetchCryptoData = async (symbol) => {
  const apiKey = "c382741b6c43469d8f562034274e56a1";
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;

  try {
    // Show loading message
    cryptoResults.innerHTML = "<p>Loading data, please wait...</p>";

    // Make API request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    });

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    // Parse JSON response
    const data = await response.json();

    // Check if the requested symbol exists in the API response
    if (!data.data || !data.data[symbol]) {
      cryptoResults.innerHTML = `
        <p><strong>Invalid Symbol:</strong> "${symbol}". Please check and try again.</p>
      `;
      return;
    }

    // Extract and display data
    const cryptoData = data.data[symbol];
    const price = cryptoData.quote.USD.price.toFixed(2);
    const marketCap = cryptoData.quote.USD.market_cap?.toLocaleString() || "N/A";
    const percentChange24h = cryptoData.quote.USD.percent_change_24h?.toFixed(2) || "N/A";

    // Render cryptocurrency details
    cryptoResults.innerHTML = `
      <div class="crypto">
        <h3>${symbol.toUpperCase()} - Cryptocurrency Data</h3>
        <p><strong>Price:</strong> $${price}</p>
        <p><strong>Market Cap:</strong> $${marketCap}</p>
        <p><strong>24-hour Change:</strong> ${percentChange24h}%</p>
      </div>
    `;
  } catch (error) {
    // Handle errors gracefully and provide meaningful feedback
    cryptoResults.innerHTML = `
      <p><strong>Error:</strong> Unable to fetch data. Please check your internet connection or try again later.</p>
    `;
    console.error("Error occurred:", error.message || error);
  }
};

// Handle form submission
cryptoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validate user input
  const symbol = document.getElementById("crypto-symbol").value.trim().toUpperCase();
  if (!symbol) {
    cryptoResults.innerHTML = `
      <p><strong>Error:</strong> Please enter a valid cryptocurrency symbol.</p>
    `;
    return;
  }

  // Fetch data for the entered symbol
  fetchCryptoData(symbol);
});

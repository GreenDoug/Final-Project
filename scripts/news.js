const newsContainer = document.getElementById("news-articles");

const fetchNews = async () => {
    try {
      const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=b3c5c4c27a0943c5a5592034e9eaf913");
      const data = await response.json();

      if (data.articles.length === 0) {
        newsContainer.innerHTML = "<p>No news articles available.</p>";
        return;
      }

      const newsHTML = data.articles
        .map(article => `
          <div class="news-article">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read More</a>
          </div>
        `)
        .join("");

      newsContainer.innerHTML = newsHTML;
    } catch (error) {
      newsContainer.innerHTML = "<p>Failed to fetch news articles. Please try again later.</p>";
      console.error("Error fetching news:", error);
    }
};

fetchNews();

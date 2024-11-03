const apiKey = "8c13e5999e3f40ae8762aa4c6dd84495";
const apiUrl = "https://newsapi.org/v2/everything?q=";
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const container = document.querySelector(".main-section");
const showMore = document.querySelector(".show-more");
const card = document.querySelector(".card");

async function getNews() {
  let query = searchBox.value;
  const response = await fetch(
    apiUrl + query + `&from=2024-03-03&sortBy=publishedAt&apiKey=${apiKey}`
  );
  const result = await response.json();
  console.log(result);
  setNewsData(result.articles);
}
let setNewsData = (articles) => {
  container.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    let card = document.createElement("div");
    let imgSection = document.createElement("div");
    let image = document.createElement("img");
    let title = document.createElement("h3");
    let desc = document.createElement("p");
    let date = document.createElement("p");
    card.classList.add("card");
    imgSection.classList.add("img-section");
    title.classList.add("title");
    desc.classList.add("desc");
    date.classList.add("date");
    image.src = article.urlToImage;
    title.innerHTML = article.title;
    desc.innerHTML = article.description;
    date.innerHTML = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    imgSection.appendChild(image);
    card.appendChild(imgSection);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(desc);

    container.appendChild(card);
    card.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  });
};

searchBtn.addEventListener("click", () => {
  getNews();
});
const accessKey = "ZciEtDm1mjCUevezOCWstAdBEDiJ3hxlclEhF6qMWl8";

const formEl = document.querySelector('[data-js="form-elements"]');
const searchInputEl = document.querySelector('[ data-js="search-input"]');
const searchResultsEl = document.querySelector('[data-js="search-results"]');
const showMoreButton = document.querySelector('[data-js="show-more-button"]');

let inputData = "";
let page = 1;

async function searchImages() {
  let inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }
  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    //
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    //appending
    imageWrapper.append(image, imageLink);
    searchResultsEl.append(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
showMoreButton.addEventListener("click", () => {
  searchImages();
});

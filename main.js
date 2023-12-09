//this is the access key from unsplash,so we can use their API
const accessKey = "ZciEtDm1mjCUevezOCWstAdBEDiJ3hxlclEhF6qMWl8";

//using this code we target specific html elements,use camelCase to name the variables
const formEl = document.querySelector('[data-js="form-elements"]');
const searchInputEl = document.querySelector('[ data-js="search-input"]');
const searchResultsEl = document.querySelector('[data-js="search-results"]');
const showMoreButton = document.querySelector('[data-js="show-more-button"]');

//we call this empty variable inside our function,so when we get the value from our input which we stored in searchInputEl in will show up in the empty string called inputData
let inputData = "";
let page = 1; //we are going to increase this when we click on the Show More button

async function searchImages() {
  //we get the data from the input on our webpage
  let inputData = searchInputEl.value;
  // page represents the page number, query= input data represents the data we search in the input ie. dog,cat etc, and client id is just our accessKey we got by logging in to unsplash to request an api
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; //makes the code dynamic

  //await is going to wait until the result comes from the API,when we use await we also have to use async for the function
  const response = await fetch(url);
  //then we need to parse it and convert the data to a json file,also have to use the await to get the results,else we get a promise
  const data = await response.json();

  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }
  const results = data.results;

  //we need to loop thru each of the results element ,it will list all the elements(objects) in the array we got from the API singular
  //so what we did here is we created a nev div inside the map function with the class of search-results(so it inherits the css properties)
  //
  results.map((result) => {
    //the element we want to create is a div,eventually with the same data-js our divs have so it can replace it in our JS file and we can delete it from our html
    const imageWrapper = document.createElement("div");
    //we use the search-result class so it takes the properties that the divs have in css,it will take their style
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

  //when we get the results and show it,we want to increase the number of page
  page++;
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}
//------------------------------------------------------------------------------------------------------------------------//
//we add a  addeventListener to the form,so when a form is submited we trigger a function
//this event argument happens when the form is submited
formEl.addEventListener("submit", (event) => {
  //prevents the default behaviour of a form ,which is refreshing the page
  event.preventDefault();
  page = 1; // when we submit the form we want the page to be 1
  //this is going to call the function searchImages
  searchImages();
});
//--------------------------------------------------------------------------------------------------------------------------//
showMoreButton.addEventListener("click", () => {
  //we called the function with the API data inside this button function,so when we click on this button show more,it just reads out more data and displays it on the page
  searchImages();
});

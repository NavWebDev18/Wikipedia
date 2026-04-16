let resultContainer = document.getElementById("resultContainer");
let searchInput = document.getElementById("userInput");
let spinner = document.getElementById("spinner");

function createAndAppendResult(result) {
    spinner.classList.add("d-none");
    let {
        title,
        link,
        description
    } = result;

    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultContainer.appendChild(resultItem);

    let titleEl = document.createElement('a');
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.classList.add("title-item");
    resultItem.appendChild(titleEl);

    let brEl = document.createElement("br");
    resultItem.appendChild(brEl);

    let urlEl = document.createElement('a');
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.classList.add("url");
    urlEl.textContent = link;
    resultItem.appendChild(urlEl);

    let brE = document.createElement("br");
    resultItem.appendChild(brE);

    let descEl = document.createElement('p');
    descEl.textContent = description;
    descEl.classList.add("desc");
    resultItem.appendChild(descEl);



}

function displaySearchResults(jsonData) {
    let {
        search_results
    } = jsonData;
    for (let result of search_results) {
        createAndAppendResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        if(event.target.value === ""){
            alert("Enter valid Input value to get results");
            return;
        }
        spinner.classList.remove("d-none");
        resultContainer.textContent = "";
        let searchValue = searchInput.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                displaySearchResults(jsonData);
            });
    }
}

searchInput.addEventListener("keydown", searchWikipedia);

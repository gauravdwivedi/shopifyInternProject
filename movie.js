let NominationList = [];

const rescontainer = document.getElementById('result-container');




async function searchApi(movie) {

    try {


        const res = await fetch(`http://www.omdbapi.com/?apikey=cd273db5&t=${movie}`);

        const data = await res.json();
        if (data.Response !== "False") {
            init(data);
        }
    }
    catch (err) {
        clearInput();
        console.log('Error occured', err);
    }
}

function clearInput() {
    let searchInput = document.getElementById('search-input');
    searchInput.innerText = "";
}


function init(movie) {

    if (typeof (movie) === undefined) {
        return;
    }

    console.log(movie);

    const searchkey = document.getElementById('search-key');
    if (movie.Title) {
        searchkey.innerText = "Results for " + "'" + movie.Title + "'";
    } else {
        searchkey.innerText = "Results for " + "'" + "Search is Empty" + "'";
        clearInput();
    }

    let ele = document.createElement("LI");

    let movieEle = document.createElement("div");
    movieEle.classList.add("container__searchresults__left__list__poster");


    let image = document.createElement("img");
    image.setAttribute("src", movie.Poster);
    movieEle.appendChild(image);

    let txtEle = document.createElement("div");

    let movieTitle = document.createElement("span");
    movieTitle.innerText = movie.Title;
    txtEle.appendChild(movieTitle);

    let movieYear = document.createElement("span");
    movieYear.innerText = movie.Year;
    txtEle.appendChild(movieYear);

    let nomBtn = document.createElement("button");
    nomBtn.innerHTML = "Nominate";
    txtEle.appendChild(nomBtn);

    movieEle.appendChild(txtEle);

    ele.appendChild(movieEle);
    console.log(ele);

    rescontainer.prepend(ele);



}
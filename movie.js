let NominationList = [];
const rescontainer = document.getElementById('result-container');
const searchkey = document.getElementById('search-key');
const NominationConainer = document.getElementById('nomination-container');

async function searchApi(movie) {

    try {

        const res = await getData(movie);
        const data = await res.json();
        if (data.Response !== "False") {

            searchkey.innerText = "Results for " + "'" + movie + "'";
            init(data);
        } else {
            searchkey.innerText = "Results for " + "'" + "Search is Empty" + "'";
            clearList();
        }
    }
    catch (err) {
        console.log('Error occured', err);
    }
}

//fetching movies from api based on use input
async function getData(movie) {
    try {
        return await fetch(`https://www.omdbapi.com/?apikey=cd273db5&t=${movie}`);
    } catch (err) {
        console.log(err);
    }
}

//to clear the  browser localstorage
function clearInput() {
    let searchInput = document.getElementById('search-input');
    searchInput.value = "";
}

//initialize the DOM elements to display search results
function init(movie) {

    //if no valid data present
    if (typeof (movie) === undefined) {
        return;
    }

    //check if movie is already being nominated
    const found = NominationList.find(element => element.Title === movie.Title);


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
    movieYear.innerHTML = "(" + movie.Year + ")";
    txtEle.appendChild(movieYear);

    let nomBtn = document.createElement("button");
    nomBtn.innerHTML = "Nominate";
    nomBtn.classList.add("nomination-btn");
    //if movie is already being nominated disable button
    if (found !== undefined) {
        nomBtn.disabled = true;
    }
    txtEle.appendChild(nomBtn);

    movieEle.appendChild(txtEle);

    ele.appendChild(movieEle);

    rescontainer.prepend(ele);

    nomBtn.addEventListener('click', function (e) {
        NominationList.push(movie);
        console.log(NominationList);
        localStorage.setItem('NominationList', JSON.stringify(NominationList));
        nomBtn.disabled = true;
        initNominationList(movie);
    })
}


function clearList() {
    console.log("ClearList Called");
    rescontainer.innerHTML = "";
}

function initNominationList(movie) {

    let ele = document.createElement("LI");


    let movieTitle = document.createElement("span");
    movieTitle.innerText = movie.Title;
    ele.appendChild(movieTitle);

    let movieYear = document.createElement("span");
    movieYear.innerHTML = "(" + movie.Year + ")";
    ele.appendChild(movieYear);

    let nomBtn = document.createElement("button");
    nomBtn.innerHTML = "Remove";
    nomBtn.classList.add("nomination-btn");
    ele.appendChild(nomBtn);
    NominationConainer.appendChild(ele);


    nomBtn.addEventListener('click', (e) => {
        console.log(movie);
        const index = NominationList.indexOf(movie);
        console.log('Movie Index', index);
        if (index > -1) {
            const res = NominationList.splice(index, 1);
            NominationConainer.removeChild(ele);
            localStorage.setItem('NominationList', JSON.stringify(NominationList));
            console.log(res);
            console.log(NominationList);
        }


    })

}


window.onload = () => {
    //parsing saved list into arrayList

    let saved = JSON.parse(localStorage.getItem('NominationList'));
    if (saved !== null) {
        NominationList = saved;
        // console.log(NominationList);
        NominationList.map((movie) => {
            initNominationList(movie);
        })
    }
}


//clear storage to check if this is working
clearLS = () => {
    localStorage.clear();
}
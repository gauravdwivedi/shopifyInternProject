let NominationList = [];

const rescontainer = document.getElementById('result-container');

const searchkey = document.getElementById('search-key');

const NominationConainer = document.getElementById('nomination-container');

async function searchApi(movie) {

    try {

        const res = await getData(movie);
        const data = await res.json();
        if (data.Response !== "False") {

            searchkey.innerText = "Results for " + "'" + data.Title + "'";
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
async function getData(movie) {
    try {
        return await fetch(`http://www.omdbapi.com/?apikey=cd273db5&t=${movie}`);
    } catch (err) {
        console.log(err);
    }
}

function clearInput() {
    let searchInput = document.getElementById('search-input');
    searchInput.value = "";
}

function init(movie) {

    if (typeof (movie) === undefined) {
        return;
    }

    console.log(movie);

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
    txtEle.appendChild(nomBtn);

    movieEle.appendChild(txtEle);

    ele.appendChild(movieEle);

    rescontainer.prepend(ele);

    nomBtn.addEventListener('click', function (e) {
        NominationList.push(movie);
        console.log(NominationList);
        localStorage.setItem('NominationList', JSON.stringify(NominationList));
        initNominationList(movie);
    })
}


function clearList() {
    console.log("ClearList Called");
    rescontainer.innerHTML = "";
}

function initNominationList(movie) {
    console.log(movie);
    let ele = document.createElement("LI");


    let movieTitle = document.createElement("span");
    movieTitle.innerText = movie.Title;
    ele.appendChild(movieTitle);

    let movieYear = document.createElement("span");
    movieYear.innerHTML = "(" + movie.Year + ")";
    ele.appendChild(movieYear);

    let nomBtn = document.createElement("button");
    nomBtn.innerHTML = "Nominate";
    nomBtn.classList.add("nomination-btn");
    ele.appendChild(nomBtn);
    NominationConainer.appendChild(ele);

}


window.onload = () => {
    //parsing saved list into arrayList

    console.log("Inside Load");

    let saved = JSON.parse(localStorage.getItem('NominationList'));
    if (saved !== null) {
        NominationList = saved;
        console.log(NominationList);
        NominationList.map((movie) => {
            initNominationList(movie);
        })
    }
}

clearLS = () => {
    localStorage.clear();
    console.log('Local Storage CLeared');
}
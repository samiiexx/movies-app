// Copyright 2021 sfchi
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0a2963ed6996dcc7a738d2587a18611c&page=1' //&page=1 shows the result of the first page which is the first 30 results
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/discover/movie?api_key=0a2963ed6996dcc7a738d2587a18611c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get Initial Movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `
           
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h1>${title}</h1>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h2>Overview</h2>
                ${overview}
            </div>
         
        `

        main.appendChild(movieElement)
    })
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    } 
    else if (vote >= 5){
        return 'orange'
    }
    else {
        return 'red'
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.nodeValue

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    }
    else {
        window.location.reload()
    }
})

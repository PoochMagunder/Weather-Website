let searchFormEl = document.querySelector("#search-form");

function citySearchSubmit(event) {
    event.preventDefault();

    let searchInputVal = document.querySelector('#search-input');

    if(!searchInputVal) {
        console.error('Not a valid City')
        return;
    }
   
    let queryString = 'api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&appid=7c8f4d5bd85db5ac5b9bff774eddbba5';

    location.assign(queryString);
}

searchFormEl.addEventListener('submit', citySearchSubmit);
let searchFormEl = document.querySelector("#search-form");
let apiKey = '7c8f4d5bd85db5ac5b9bff774eddbba5'
let humidity
let windspeed
let temperature
let icon
let searchInputVal = document.querySelector('#search-input').value;

console.log(searchInputVal)
function citySearchSubmit(event) {
    event.preventDefault();
    searchInputVal = document.querySelector('#search-input').value;
    
    // let searchInputVal = document.querySelector('#search-input').value;
    // console.log(searchInputVal)

    if(!searchInputVal) {
        console.error('Not a valid City')
        return;
    }
     
    getGeo(searchInputVal)

    
    
    //location.assign(queryString);
}

searchFormEl.addEventListener('submit', citySearchSubmit);

function getGeo(city){
    let queryString = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=7c8f4d5bd85db5ac5b9bff774eddbba5';
    fetch(queryString)
    .then(res => res.json())
    .then(data => {
        lat = data[0].lat
        long = data[0].lon
        getFiveDay(lat,long)
    })
}
function getFiveDay(lat,long){
let fiveDayString = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
fetch(fiveDayString)
.then(res => res.json())
.then(data =>{
    let resultContainer = document.querySelector('.text-light');
        resultContainer.classList.add('card', 'text-dark', 'bg-light', 'mb-3', 'p-3');
        
    let resultCity = document.createElement('h2')
    resultCity.classList.add('text-decoration:line')
    resultCity.innerHTML = searchInputVal
    resultContainer.append(resultCity);
    for(let i=0; i<=12; i+=3) {
        temperature = data.list[i].main.temp
        humidity = data.list[i].main.humidity
        windspeed = data.list[i].wind.speed;
        icon = data.list[i].weather[0].icon


        // get the ID of the container div
        // create an h2 with the city name (we might have to create a global)
        // set the innerHtml to our city name
        // create a p or div with the forecast info
        // write to that div
        // then we want to append to the container div
     

        let resultForecast = document.createElement('p');
        resultForecast.innerHTML = temperature + humidity + windspeed + icon;
        console.log(resultForecast);

        resultContainer.append(resultForecast);
        

    }
    console.log(data.list)
    
})
}

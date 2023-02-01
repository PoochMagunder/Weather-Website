var resultText = document.querySelector('#result-text');
var resultContent = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParameters() {
var searchParamsArr = document.location.search.split('?');

var city = searchParamsArr[0].split('=').pop();
console.log(city)

searchApi(city);
}

function searchApi(city) {
    var locQueryUrl = 'http://api.openweathermap.org/geo/1.0/direct?';

    if (city) {
        locQueryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=7c8f4d5bd85db5ac5b9bff774eddbba5';

        fetch(locQueryUrl)
            .then(function (response){
                if(!response.ok){
                    throw response.json();
                }

                return response.json();
            })
            .then(function (locRes){
                resultText.textContent = locRes.search.city;

                console.log(locRes);

                if (!locRes.results.length) {
                    console.log('No results found');
                    resultContent.innerHTML = '<h3>No results found, search again</h3>';
                } else {
                    resultContent.textContent = '';
                    for (var i = 0; i < locRes.results.length; i++) {
                        printResults(locRes.results[i]);
                    }
                }
            })
            .catch(function(error) {
                console.log(error);
            });

    }


}

function printResults(resultObj) {
    console.log(resultObj);

    let resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-dark', 'text-light', 'mb-3', 'p-3');

    let resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    let titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;

    let bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML = '<strong>Date:</strong> ' + resultObj.date + '<br/>';

    if (resultObj.subject) {
        bodyContentEl.innerHTML +=
          '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Subjects:</strong> No subject for this entry.';
      }
    
      if (resultObj.description) {
        bodyContentEl.innerHTML +=
          '<strong>Description:</strong> ' + resultObj.description[0];
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Description:</strong>  No description for this entry.';
      }
    
      var linkButtonEl = document.createElement('a');
      linkButtonEl.textContent = 'Read More';
      linkButtonEl.setAttribute('href', resultObj.url);
      linkButtonEl.classList.add('btn', 'btn-dark');
    
      resultBody.append(titleEl, bodyContentEl, linkButtonEl);
    
      resultContent.append(resultCard);
    
    

}

function citySearchSubmit(event) {
    event.preventDefault();

    let searchInputVal = document.querySelector('#search-input').value;

    if(!searchInputVal) {
        console.error('Not a valid City')
        return;
    }
   
    searchApi(searchInputVal);
}

searchFormEl.addEventListener('submit', citySearchSubmit);
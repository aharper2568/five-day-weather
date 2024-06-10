const searchInput = $('#search-input');
const apiKey = 'bd013015199429493cae44f19223451c';
const searchHistoryContainer = $('#search-history');
const forecastContainerEl = $('#forecast-container');
const currentWeatherContainer = $('#current-weather');
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


//Ready search history on load
$(document).ready(function () {
  renderSearchHistory();
  if (searchHistory.length > 0) {
    searchAPI(searchHistory[searchHistory.length - 1]);
  }
});

// fetch weather data
function searchAPI(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json()) //forecast data
    .then(data => populateForeCastContainer(data.list));

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json()) //current weather data
    .then(data => displayCurrentWeather(data));
}


function displayCurrentWeather(data) {
  const { name, main, wind, weather } = data; //breaks down data 
  const date = new Date().toLocaleDateString(); //get localized date format
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
//update currentWeatherContainer's html directly, uses fetched current weather data
  currentWeatherContainer.html(`
  <h3>${name} (${date})</h3>
  <img src="${weatherIcon}" alt="${weather[0].description}">
  <p>Temperature: ${main.temp} °F</p>
  <p>Humidity: ${main.humidity} %</p>
  <p>Wind Speed: ${wind.speed} m/s</p>
`)
}



// Populate forecast container with 5-day forecast data
function populateForeCastContainer(forecastData) {
  forecastContainerEl.empty(); //Remove any previous data
  // Iterate through the forecast data, picking every 8th entry (3-hour intervals, 8 entries per day)
  for (let index = 0; index < forecastData.length; index += 8) {
    const dayData = forecastData[index];
    const date = new Date(dayData.dt_txt).toLocaleDateString(); //Converts date string to local
    const weatherIcon = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

    const forecastCard = $(`
      <div class="forecast-card col-lg-2 col-md-4 col-sm-6">
        <h5>${date}</h5>
        <img src="${weatherIcon}" alt="${dayData.weather[0].description}">
        <p>Temp: ${dayData.main.temp} °F</p>
        <p>Wind: ${dayData.wind.speed} m/s</p>
        <p>Humidity: ${dayData.main.humidity} %</p>
      </div>
    `);

    forecastContainerEl.append(forecastCard);
  }
}


function renderSearchHistory() {
  searchHistoryContainer.empty();
  searchHistory.forEach(city => addtoSearchHistory(city));
}

function addtoSearchHistory(city) {
  const historyItem = $(`<button class="list-group-item list-group-item-action">${city}</button>`)
  historyItem.on('click', function() {
    searchAPI(city);
  });
  searchHistoryContainer.append(historyItem);
}

//BEING ABLE TO RECOGNIZE THE DATATYPE OF SOMETHING BECAUSE THE SYNTAX THAT YOU WRITE (IF YOU'RE USUALLY STUCK NOT KNOWING WHAT TO WRITE NEXT) IS BASED ON THE DATATYPE
// NUMBER - 5 or 5.5
// STRING - "" OR '' OR ``
// BOOLEAN - false or true
// NULL/UNDEFINED - no syntax
// ARRAY - [element,element,element]
// OBJECT - {key:value, key:value}



//form
//id=city-input
//submit button for this form

//submitbutton on click, handleFormSubmit

function handleFormSubmit(event) {
  event.preventDefault();
  let cityName = searchInput.val()
  //we get our inputs
  //check if its invalid and you cant keep going
  if (cityName) {
    searchAPI(cityName);
    if (!searchHistory.includes(cityName)) {
      searchHistory.push(cityName);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      addtoSearchHistory(cityName);
    }
    searchInput.val('');
  } else {
    alert('Please enter a city name.')
  }

  //get the city name from the input
}



$('#search-bar').on('submit', handleFormSubmit)


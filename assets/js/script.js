const searchInput = $('#search-input');
const apiKey = 'bd013015199429493cae44f19223451c';
const searchHistoryContainer = $('#search-history');
const forecastContainerEl = $('#forecast-container');
const currentWeatherContainer = $('#current-weather');




function searchAPI(city){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => populateForeCastContainer(data.list));

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())

}



//I WANT TO CREATE 5 CARDS AND PUT THEM IN THE FORECAST CONTAINER
function populateForeCastContainer(forecastData){
  console.log("=============POPULATE FORECAST CONTAINER FUNCTION==============")
  for (let index = 0; forecastData.length < 50; index+=8) {
  console.log("loop index: ", index)    
  }
  //where am I append them to? - id
  console.log(forecastData) // convert this into 5 elements, or iterate through every 8th index
forecastContainerEl.text(forecastData.main)
console.log("ForecastConaiterEl: ", forecastContainerEl)

  // create Elements
  
  // append the elements that I create
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

function handleFormSubmit(event){
  event.preventDefault();
  let cityName = searchInput.val()
  //we get our inputs
  //check if its invalid and you cant keep going
  if (cityName) {
    searchAPI(cityName)
  }
  
  //get the city name from the input
}



$('#search-bar').on('submit', handleFormSubmit)

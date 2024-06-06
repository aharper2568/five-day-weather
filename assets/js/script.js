const searchInput = $('#search-input');
const apiKey = '';
const searchHistoryContainer = $('#search-history');
const forecastContainerEl = $('#forecast-container');



function searchAPI(city){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bd013015199429493cae44f19223451c`, {
 mode: "cors",
 credentials: 'same-origin'
})
  .then(function (response) {
    console.log("=========RESPONSE =====")
    console.log(response);
    console.log("====END RESPONSE ===")
    return response.json();
  }).then(function(data){
    console.log("===DATA FROM API===")
    console.log(data)
    populateForeCastContainer(data.list)
  });
}

  for (let index = 0; index < 50; index+=8) {
console.log("loop index: ", index)    
  }


//I WANT TO CREATE 5 CARDS AND PUT THEM IN THE FORECAST CONTAINER
function populateForeCastContainer(forecastData){
  console.log("=============POPULATE FORECAST CONTAINER FUNCTION==============")
  //where am I append them to? - id
  console.log(forecastData) // convert this into 5 elements, or iterate through every 8th index

console.log("ForecastConaiterEl: ", forecastContainerEl)

  // create Elements
  
  // append the elements that I create
}

populateForeCastContainer()


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
  //we get our inputs
  //check if its invalid and you cant keep going
  
  
  //get the city name from the input
  var cityName = searchInput.val()
  searchAPI(cityName)
}



$('#search-bar').on('submit', handleFormSubmit)

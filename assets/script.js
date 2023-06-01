// my APIKey is "b4ed94adc674507878b0aeb7f93e988b";
$(document).ready(function(){
  //event listener on search button
$("#searchbtn").on("click",function(){
  //get value in input search value
  var searchCity = $("#search-value").val();
  $("search-value").val(" ");
  weatherDashboard(searchCity);
  weatherForecast(searchCity);
});
//The keypress event is fired when a key that produces a character value is pressed down.
$("#searchbtn").keypress(function(event){
  var keycode = (event.keycode ? event.keycode : event.which);
  if(keycode === 13)
  {
    weatherDashboard(searchCity);
    weatherForecast(searchCity);
  }
})


//pull out search-history from local storage
var previousWeatherSearch =JSON.parse(localStorage.getItem("previousWeatherSearch"))|| [];
if(previousWeatherSearch.length>0){
  weatherDashboard(previousWeatherSearch[previousWeatherSearch.length - 1]);

}
//display search history
  for(var i = 0; i<previousWeatherSearch.length; i++){
    createRow(previousWeatherSearch[i]);
  }

  function createRow(text){
    var listItem = $("<li>").addClass("list-of-previous-search").text(text);
    
    $(".previousWeatherSearch").append(listItem);
  

  }
  $(".previousWeatherSearch").on("click", "li", function () {
    weatherDashboard($(this).text());
    weatherForecast($(this).text());
  });
  

//weatherDashboard function
function weatherDashboard(searchCity){
  //fetch weather api
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=b4ed94adc674507878b0aeb7f93e988b")
  .then(function(response){
    return response.json();
  })
 
  .then(function(data){
    if(previousWeatherSearch.indexOf(searchCity) === -1){
      previousWeatherSearch.push(searchCity);
      localStorage.setItem("previousWeatherSearch",JSON.stringify(previousWeatherSearch));
      createRow(searchCity);
    }
    $("#today-weather").empty();

    //create element and append it to dispaly today weather
    var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
    var imgtag = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    var divCard = $("<div>").addClass("card");
    var divcardBody = $("<div>").addClass("card-body");
    var displayWind = $("<p>").addClass("card-text").text("Wind: " + data.wind.speed + " MPH");
    var displayHumid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
    var displayTemp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " K");
    console.log(data);

//append data
    title.append(imgtag);
    divcardBody.append(title, displayTemp, displayHumid, displayWind);
    divCard.append(divcardBody);
    $("#today-weather").append(divCard);
    console.log(data);
  });
}

// function weatherForecast(searchTerm) 
function weatherForecast(searchCity) {
 
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=b4ed94adc674507878b0aeb7f93e988b&units=imperial")
  .then(function(response){
    return response.json();
  })

.then(function (data) {
  console.log(data);
  $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

  //loop to create a new card for 5 days weather forecast
  for (var i = 0; i < data.list.length; i++) {

    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

      var titleFivedays = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
      var imgFivedays = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
      var colFivedays = $("<div>").addClass("col-md-2.5");
      var cardFivedays = $("<div>").addClass("card bg-primary text-white");
      var cardBodyFivedays = $("<div>").addClass("card-body p-2");
      var windFivedays = $("<p>").addClass("card-text").text("Wind: " + data.list[i].wind.speed + " MPH");
      var humidFivedays = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
      var tempFivedays = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");
  

      //combine together and display on page
      colFivedays.append(cardFivedays.append(cardBodyFivedays.append(titleFivedays, imgFivedays, tempFivedays, humidFivedays,windFivedays)));
      //append card to column, body to card, and other elements to body
      $("#forecast .row").append(colFivedays);
    }
  }
});
}

})

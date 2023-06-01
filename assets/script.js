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
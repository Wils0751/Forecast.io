//MyWidget Script
/**************************
Add a link for a CSS file that styles .mywidget
Add a script tag that points to CDN version of jQuery 1.*
Add a script tag that loads your script file from http://m.edumedia.ca/
**************************/
var scriptsLoaded = 0;

document.addEventListener("DOMContentLoaded", function(){
  
  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "Css/main.css");	
  //loads the CSS file and applies it to the page
  css.addEventListener("load", loadCount);
  document.querySelector("head").appendChild(css);

  var jq = document.createElement("script");
  jq.addEventListener("load", loadCount);
  jq.setAttribute("src","https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  document.querySelector("head").appendChild(jq);

 
});

function buildWidget(cls){
  //now do the ajax call then build your page
	$.ajax ({
	url:'https://api.forecast.io/forecast/59e641e20d6edc46cc4c29764f3e6775/45.348391,-75.757045?units=ca',
	method:'GET',
	dataType:'jsonp'
	
}).done(function(weather){
		currentWeather(weather.currently)
		hourlyWeather(weather.hourly)
		console.log(weather)
	}).fail(function(error){
		console.log(error)
	});
	
};
function currentWeather(current) {
    //Show current weather
    var today = new Date();
    var currently = $(".weather-forecast");
	$(".weather-forecast").append("<h2>");
	$(".weather-forecast h2").append(
	"<h2>"+"Current Conditions for today on, " + today.getDate() + "/" + (parseInt(today.getMonth() + 1))+"</h2>",
	"<h2>"+"It's " + current.summary +" and the temperature is " + current.temperature + " °C"+ " at Algonquin College"+"</h2>"
	);
	$("<i>").addClass("wi").addClass("wi-forecast-io-" + current.icon).addClass("current").appendTo(currently);
  }

function hourlyWeather(hourly) {
    //Show Hourly weather
	var today = new Date();
	//console.log(today);
    var table = $("<table>");
	$(".weather-forecast").append(table);
     for (var i = 0; i < hourly.data.length; i++) {
		$("table").append("<tr>")
        var hourlyData = hourly.data[i];
		var time= new Date(hourlyData.time * 1000);
			if (time.getDate()===today.getDate()){
		//console.log(hourlyData);
			$('tr:last').append(
            "<td>"+ time.getHours() + ":00"+"</td>",
            "<td>"+hourlyData.humidity.toString().split(".")[1] + "%</td>",
            "<td>"+hourlyData.cloudCover.toString().split(".")[1] + "%</td>",
            "<td>"+hourlyData.temperature+" (°C)</td>",
            "<td>"+hourlyData.windSpeed+"(km/h)</td>",
            "<td>"+hourlyData.summary+"</td>"
			);
			$("<td>").html($("<i>").addClass("wi").addClass("wi-forecast-io-" + hourlyData.icon)).appendTo('tr:last');
			}
		}
	}

function loadCount(){
  scriptsLoaded++;
    if(scriptsLoaded === 2){
      //call the function in My widget script to load the JSON and build the widget
      buildWidget(".weather-forecast");
      console.log("both scripts loaded");
    }
}

/* Citations 
http://www.w3schools.com/jquery/html_appendto.asp 
*/
var currentCity = "New York";
var currentDateTime = new Date();

let h2 = document.getElementById("date-time");

document.getElementById("current-city").innerText = currentCity;

// search and api handling
let form = document.getElementById("search-form");
form.addEventListener("click", citySearch);

function citySearch(e) {
    e.preventDefault();
    let cityInput = document.getElementById("search-city");
    currentCity = cityInput.value;
    searchCity(cityInput.value);
}

function displayWeatherCondition(response) {
    console.log(response);
    document.getElementById("temperature").innerHTML = "Base temperature: " + response.data.main.temp + "° F";
    document.getElementById("min-max-temperature").innerHTML = "Min/max temperature: " + response.data.main.temp_min + "° F / " + response.data.main.temp_max + "° F";
    document.getElementById("humidity").innerHTML = "Humidity: " + response.data.main.humidity + "%";
    document.getElementById("current-city").innerText = currentCity;
}

function searchCity(city) {
    let apiKey = "edc9269d8e6b8340b9a83f2c42421179";
    let units = "imperial";
    let endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let apiUrl = `${endPoint}${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then((response) => displayWeatherCondition(response));
}

// script to display days accordingly to time and iterating with for loop
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var temperatures = [87, 86, 85, 74, 43, 76, 53];

var test = document.getElementById("bottom-half-js");
for(var i = 0; i < days.length; i++) {
    let iteratingDate = currentDateTime.getDate()+i;
    let iteratingMonth = currentDateTime.getMonth()+1;
    let iteratingYear = currentDateTime.getFullYear();
    let maxDaysInMonth = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), 0).getDate();
    if(iteratingDate > maxDaysInMonth) { // if days exceed current month's days, move to next month
        iteratingMonth++;
        if(iteratingMonth > 12) { // if months exceed 12 months in a year, go up to next year january
            iteratingYear++;
            iteratingMonth = 1;
        }
        iteratingDate = iteratingDate - maxDaysInMonth;
    }
    test.innerHTML += `<div class="bottom-half"><p><strong>${days[i]}</strong><br>${iteratingMonth}/${iteratingDate}/${iteratingYear} - ${temperatures[i]}° F</p></div>`;
}

let day = days[currentDateTime.getDay()];

let hours = currentDateTime.getHours();
let minutes = ("0" + currentDateTime.getMinutes()).slice(-2);

// convert military hours to regular hours
let partOfDay = "";
if(hours > 12) {
    hours = hours - 12;
    partOfDay = "PM";
} else {
    partOfDay = "AM";
}
h2.innerHTML = `${day} ${hours}:${minutes} ${partOfDay}`;
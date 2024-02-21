window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    var scrolled = window.scrollY > 0;
    navbar.classList.toggle('scrolled', scrolled);
});

// -----------------------hamburger menu--------------------------

document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.getElementById('js-navbar-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.getElementById('js-nav-links');

    navbarToggle.addEventListener('click', function () {
        navbar.classList.toggle('show');
        navLinks.classList.toggle('show');
    });
});








// ------------------------weather section------------------------
//Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

//---------------Next Days Variables:---------------
let nextDay = document.getElementsByClassName("nextDay"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description"),

    // currentCity = "Cairo",
    apiResponse,
    responseData,
    monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'],
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];




// get data from Api
async function getWeatherData(currentCity = 'cairo') {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    responseData = await apiResponse.json()
    console.log(responseData)
    displayTodayWeather();
    displayNextDayWeather()
}
getWeatherData();



function displayTodayWeather() {

    let date = new Date();
    console.log(date)
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`)
    description.innerHTML = responseData.current.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML = responseData.current.wind_dir;

}


// function displayNextDayWeather() {
//     for (let i = 0; i < nextDay.length; i++) {
//         nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
//         nextDayIcon[i].setAttribute('src', `https:${responseData.forecast.forecastday[i + 1].day.condition.icon}`)
//         maxDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.maxtemp_c;
//         minDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.mintemp_c;
//         nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i + 1].day.condition.text;
//     }
//     }

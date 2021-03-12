function getFormattedDate() {
  let now = new Date();

  let date = now.getDate();
  let today = now.getDay();
  let hour = now.getHours();
  let month = now.getMonth();
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "Jult",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let formattedDate = `${days[today]}, ${months[month]} ${date} ${hour}:${min}`;
  return formattedDate;
}

let day = document.querySelector("#today-date");
day.innerHTML = getFormattedDate();

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");

  let changeCity = document.querySelector("#city");
  if (searchInput.value) {
    changeCity.innerHTML = searchInput.value;
    searchCity(searchInput.value);
  } else {
    changeCity.innerHTML = null;
    alert("Please type a city");
  }
}

function searchCity(city) {
  let apiKey = "4b90d6a93fd778a0f497d305f97fdb36";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//temperature convert

function convertC(event) {
  event.preventDefault();
  let tempC = document.querySelector("#main-temp");
  tempC.innerHTML = 15;
}

let celsius = document.querySelector("#c-link");
celsius.addEventListener("click", convertC);

function convertF(event) {
  event.preventDefault();
  let tempF = document.querySelector("#main-temp");
  tempF.innerHTML = Math.round(15 * 1.8) + 32;
}

let fahrenheit = document.querySelector("#f-link");
fahrenheit.addEventListener("click", convertF);

//Get city's weather API

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let actualHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let actualWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let mainTemp = document.querySelector("#main-temp");
  let feels = Math.round(response.data.main.feels_like);
  let actualFeels = document.querySelector("#feels");

  mainTemp.innerHTML = `${temperature}°C`;
  actualHumidity.innerHTML = `${humidity}%`;
  actualWind.innerHTML = `${wind} m/s`;
  actualFeels.innerHTML = `${feels}°`;
}
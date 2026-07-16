const apiKey = "81d5ef55e2d8ec3cb3d60f914ca24aa8";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
        alert("City not found!");
        return;
    }

    const data = await response.json();

    cityName.innerText = data.name;
    temperature.innerText = `${Math.round(data.main.temp)}°C`;
    condition.innerText = data.weather[0].main;
    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed} km/h`;

    weatherIcon.src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city !== ""){
        getWeather(city);
    }

});

locationBtn.addEventListener("click", () => {

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(async(position)=>{

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);

            const data = await response.json();

            cityName.innerText = data.name;
            temperature.innerText = `${Math.round(data.main.temp)}°C`;
            condition.innerText = data.weather[0].main;
            humidity.innerText = `${data.main.humidity}%`;
            wind.innerText = `${data.wind.speed} km/h`;

            weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        });

    } else {

        alert("Geolocation is not supported.");

    }

});
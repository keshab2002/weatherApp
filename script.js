// // input:
// const form = document.querySelector('form');
// const inpcity = document.querySelector('#inpCity');

// // Output:
// const wrongCity = document.querySelector('#wrongCity');
// const temp = document.querySelector('#temp');
// const feelsLike = document.querySelector('#feels-like');
// const city = document.querySelector('#city');
// const longLat = document.querySelector('#longLat');
// const wimg = document.querySelector('#wimg');
// const tempMax = document.querySelector('#temp-max');
// const tempMin = document.querySelector('#temp-min');
// const rain = document.querySelector('#rain');
// const visibility = document.querySelector('#visibility');
// const ghust = document.querySelector('#ghust');
// const windspeed = document.querySelector('#windspeed');
// const humidity = document.querySelector('#humidity');
// const nextDayWeatehr = document.querySelectorAll('.nextDayWeatehr');

// const currentWeather = document.querySelector('.currentWeather');
// const nextFiveDaysWeatehr = document.querySelector('.nextFiveDaysWeatehr');

// function weatherImageSet(target, condition) {
//     switch (condition) {
//         case 'Clear':
//             target.src = 'images/clear.png';
//             break;
//         case 'Clouds':  // fixed typo from 'Clounds'
//             target.src = 'images/clouds.png';
//             break;
//         case 'Drizzle':
//             target.src = 'images/drizzle.png';
//             break;
//         case 'Rain':
//             target.src = 'images/rain.png';
//             break;
//         case 'Snow':
//             target.src = 'images/snow.png';
//             break;
//         case 'Mist':
//             target.src = 'images/mist.png';
//             break;
//         default:
//             target.src = 'images/clear.png'; // fallback
//             break;
//     }
// };


// // api
// const apiKey = '60e7e96c1071f6c6a24abeb729381aa5';
// const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}&q=`;

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     fetch(requestUrl + inpcity.value).then(async (response) => {
//         if (response.status === 404) {
//             wrongCity.style.display = 'block';
//             currentWeather.style.visibility = 'hidden';
//             nextFiveDaysWeatehr.style.visibility = 'hidden';
//         } else {
//             const data = await response.json();
//             wrongCity.style.display = 'none';
//             currentWeather.style.visibility = 'visible';
//             nextFiveDaysWeatehr.style.visibility = 'visible';

//             temp.textContent = `${Math.round(data.list[0].main.temp)}°C`;
//             feelsLike.textContent = `Feels Like: ${Math.round(data.list[0].main.feels_like)}°C`;
//             city.textContent = `${data.city.name}`;
//             longLat.textContent = `(${data.city.coord.lat}, ${data.city.coord.lon})`;
//             tempMax.textContent = `Max: ${Math.round(data.list[0].main.temp_max)}°C`;
//             tempMin.textContent = `Min: ${Math.round(data.list[0].main.temp_min)}°C`;
//             rain.textContent = `Rain: ${data.list[0].rain?.['3h'] ?? 0} ml`;
//             visibility.textContent = `Visibility: ${data.list[0].visibility ?? 'N/A'} m`;
//             ghust.textContent = `Gust: ${data.list[0].wind.gust ?? 'N/A'} km/h`;
//             windspeed.innerHTML = `<span>Wind: </span>${data.list[0].wind.speed}<span>km/h</span>`;
//             humidity.innerHTML = `<span>Humidity: </span>${data.list[0].main.humidity}%`;
//             weatherImageSet(wimg, data.list[0].weather[0].main);
//             let i = 1;
//             let j = 0;
//             nextDayWeatehr.forEach((ele)=>{
//                 const tempDay = document.querySelector('#tempDay'+i);
//                 const feelsLikeDay = document.querySelector('#feels-likeDay'+i);
//                 const weatherImgDay = document.querySelector(`#weatherImgDay${i}>img`);
//                 const rainDay = document.querySelector('#rainDay'+i);
//                 i++;
//                 tempDay.innerHTML = `${Math.round(data.list[j].main.temp)}°C`;
//                 feelsLikeDay.innerHTML = `Feels Like: ${Math.round(data.list[j].main.feels_like)}°C`;
//                 weatherImageSet(weatherImgDay, data.list[j].weather[0].main);
//                 rainDay.innerHTML = `Rain: ${data.list[j].rain?.['3h'] ?? 0} ml`;
//                 j+=8
//             })
            
//             /*
//             <div class="day1">
//                 <p>Day 1</p>
//                 <p id="tempDay1">22°C</p>
//                 <p id="feels-likeDay1">Feels Like: 22°C</p>
//                 <div id="weatherImgDay1"><img src="images/clouds.png" alt=""></div>
//                 <p id="rainDay1">rain</p>
//             */
//         }
//     }).catch((err) => {
//         console.log(`ERROR: ${err}`);
//     })
// });




// DOM Elements
const form = document.querySelector('form');
const inpcity = document.querySelector('#inpCity');
const wrongCity = document.querySelector('#wrongCity');
const currentWeather = document.querySelector('.currentWeather');
const nextFiveDaysWeatehr = document.querySelector('.nextFiveDaysWeatehr');

// Weather API Configuration
const apiKey = '60e7e96c1071f6c6a24abeb729381aa5';
const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}&q=`;

// Helper Functions
function showError(message) {
    wrongCity.textContent = message;
    wrongCity.style.display = 'block';
    currentWeather.style.visibility = 'hidden';
    nextFiveDaysWeatehr.style.visibility = 'hidden';
}

function hideError() {
    wrongCity.style.display = 'none';
}

function showWeatherData() {
    currentWeather.style.visibility = 'visible';
    nextFiveDaysWeatehr.style.visibility = 'visible';
}

function weatherImageSet(target, condition) {
    const weatherImages = {
        'Clear': 'images/clear.png',
        'Clouds': 'images/clouds.png',
        'Drizzle': 'images/drizzle.png',
        'Rain': 'images/rain.png',
        'Snow': 'images/snow.png',
        'Mist': 'images/mist.png',
        'Haze': 'images/mist.png',
        'Fog': 'images/mist.png',
        'Thunderstorm': 'images/rain.png'
    };
    
    target.src = weatherImages[condition] || 'images/clear.png';
}

function updateCurrentWeather(data) {
    const current = data.list[0];
    const cityData = data.city;
    
    document.querySelector('#temp').textContent = `${Math.round(current.main.temp)}°C`;
    document.querySelector('#feels-like').textContent = `Feels Like: ${Math.round(current.main.feels_like)}°C`;
    document.querySelector('#city').textContent = cityData.name;
    document.querySelector('#longLat').textContent = `(${cityData.coord.lat.toFixed(2)}, ${cityData.coord.lon.toFixed(2)})`;
    document.querySelector('#temp-max').textContent = `Max: ${Math.round(current.main.temp_max)}°C`;
    document.querySelector('#temp-min').textContent = `Min: ${Math.round(current.main.temp_min)}°C`;
    document.querySelector('#rain').textContent = `Rain: ${current.rain?.['3h']?.toFixed(2) || 0} mm`;
    document.querySelector('#visibility').textContent = `Visibility: ${(current.visibility / 1000).toFixed(1) || 'N/A'} km`;
    document.querySelector('#ghust').textContent = `Gust: ${current.wind.gust?.toFixed(1) || 'N/A'} km/h`;
    document.querySelector('#windspeed').innerHTML = `<span>Wind: </span>${current.wind.speed.toFixed(1)} km/h`;
    document.querySelector('#humidity').innerHTML = `<span>Humidity: </span>${current.main.humidity}%`;
    
    weatherImageSet(document.querySelector('#wimg'), current.weather[0].main);
}

function updateForecast(data) {
    const forecastElements = document.querySelectorAll('.nextDayWeatehr');
    
    // We'll show forecast for noon each day (assuming 8 readings per day)
    const forecastSteps = [7, 15, 23, 31, 39].map(i => Math.min(i, data.list.length - 1));
    
    forecastElements.forEach((element, index) => {
        const dayIndex = forecastSteps[index];
        if (dayIndex >= data.list.length) {
            element.style.display = 'none';
            return;
        }
        
        const forecast = data.list[dayIndex];
        const dayNumber = index + 1;
        
        element.querySelector('p:first-child').textContent = `Day ${dayNumber}`;
        element.querySelector(`#tempDay${dayNumber}`).textContent = `${Math.round(forecast.main.temp)}°C`;
        element.querySelector(`#feels-likeDay${dayNumber}`).textContent = `Feels Like: ${Math.round(forecast.main.feels_like)}°C`;
        element.querySelector(`#rainDay${dayNumber}`).textContent = `Rain: ${forecast.rain?.['3h']?.toFixed(2) || 0} mm`;
        
        weatherImageSet(
            element.querySelector(`#weatherImgDay${dayNumber} img`),
            forecast.weather[0].main
        );
    });
}

// Event Handlers
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const cityName = inpcity.value.trim();
    if (!cityName) {
        showError('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(requestUrl + encodeURIComponent(cityName));
        
        if (!response.ok) {
            if (response.status === 404) {
                showError('City not found. Please try another name.');
            } else {
                showError('Weather service unavailable. Please try later.');
            }
            return;
        }

        const data = await response.json();
        hideError();
        showWeatherData();
        updateCurrentWeather(data);
        updateForecast(data);
        
        // Store last successful city
        localStorage.setItem('lastCity', cityName);
    } catch (error) {
        console.error('Fetch error:', error);
        showError('Network error. Please check your connection.');
    }
}

// Initialize App
function init() {
    form.addEventListener('submit', handleFormSubmit);
    
    // Load last searched city if available
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        inpcity.value = lastCity;
        form.dispatchEvent(new Event('submit'));
    }
}

init();
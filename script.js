const apiKey = '82f8f71419ed630139cf431d6c5e6895';  // Replace with your actual API key

// Elements
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city');
const weatherResult = document.getElementById('weather-result');

// Automatically focus on the search input when the page loads
window.onload = function() {
    cityInput.focus();
};

// Event listener for the search button
searchButton.addEventListener('click', searchWeather);

// Event listener for the Enter key on the input field
cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

// Function to handle weather search
function searchWeather() {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        weatherResult.innerHTML = `<p>Please enter a city name.</p>`;
    }
}

// Function to fetch weather data
async function getWeather(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Function to display current weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    const description = weather[0].description;
    const temperature = main.temp;
    const feelsLike = main.feels_like;
    const humidity = main.humidity;

    weatherResult.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>Weather: ${description}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Feels Like: ${feelsLike}°C</p>
        <p>Humidity: ${humidity}%</p>
    `;
}

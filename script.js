const apiKey = 'bd5e378503939ddaee76f12ad7a97608';
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDetails = document.getElementById('weather-details');
const loading = document.getElementById('loading');

function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    loading.style.display = 'block';
    fetchWeather(city);
}

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    weatherDetails.innerHTML = '';
    loading.style.display = 'none';

    const { main, weather, name } = data;
    const temperature = main.temp;
    const conditions = weather[0].description;

    const weatherHTML = `
        <p><strong>City:</strong> ${name}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Conditions:</strong> ${conditions}</p>
    `;

    weatherDetails.innerHTML = weatherHTML;
}

function displayError(message) {
    weatherDetails.innerHTML = '';
    loading.style.display = 'none';

    const errorHTML = `<p class="error">${message}</p>`;
    weatherDetails.innerHTML = errorHTML;
}

//Event Listeners
searchButton.addEventListener('click', handleSearch);
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

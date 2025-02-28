function getWeather() {
    const apiKey = '9c6d52698dd8a06cb785bb2df353a7d0';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].main;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
        weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        changeBackground(description);

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function changeBackground(weatherCondition) {
    let imageUrl = '';

    if (weatherCondition.includes('Clear')) {
        imageUrl = 'https://www.shutterstock.com/image-photo/blue-sky-clouds-background-material-260nw-1336029653.jpg';
    } else if (weatherCondition.includes('Clouds')) {
        imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZehqbGfKTCf-LVlqwFQ5u7Ac7k1Nlpgt9HsUOamyaN3wObVEWADRS60_lDsX9bOxSzo&usqp=CAU';
    } else if (weatherCondition.includes('Rain')) {
        imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFS_DvSB2VOvSyY-W-Rl-ViPc45yFpLhYCaQ&s';
    } else if (weatherCondition.includes('Snow')) {
        imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcu-2_kR0STfgPuvE2kh7Qf5wp694g-rG1bHwanYxS5eb0AHf1RaDnPf6d0VnwSH7LNdo&usqp=CAU';
    } else {
        imageUrl = 'https://source.unsplash.com/1600x900/?weather,nature';
    }

    document.body.style.background = `url('${imageUrl}') no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
}

function showImage() {
    document.getElementById('weather-icon').style.display = 'block';
}


function updateDate() {
    const now = new Date();
    const dateDiv = document.getElementById('date');

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    dateDiv.innerHTML = now.toLocaleDateString('en-US', options);
}

updateDate(); // Call once to display the date

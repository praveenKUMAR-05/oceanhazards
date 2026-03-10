const axios = require('axios');

// Fetch weather data and calculate severity score (0-100)
const getWeatherSeverity = async (lat, lon) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        if (!apiKey) {
            return 30; // default low if no api key
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

        const windSpeed = response.data.wind.speed || 0; // meters per second
        const rain = response.data.rain ? response.data.rain['1h'] || 0 : 0;

        let severity = 30; // default low

        // Step 4 smartathon logic: Calculate weatherSeverity (low, moderate, high numeric equivalent)
        if (windSpeed > 20 || rain > 10) {
            severity = 90; // high
        } else if (windSpeed > 10 || rain > 2) {
            severity = 60; // moderate
        }

        return severity;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        // Default severity in case of API failure
        return 30;
    }
};

module.exports = { getWeatherSeverity };

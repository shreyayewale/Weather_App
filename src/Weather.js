import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure to include this CSS file

export default function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a4aab73948afece8464bebe376f4225&units=metric`);
            setWeather(response.data);
        } catch (error) {
            console.log('Error fetching weather data', error);
        }
    };

    const handleClick = () => {
        fetchWeather();
    };

    return (
        <div className="weather-container">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter City Name"
                    value={city}
                    onChange={handleCityChange}
                />
                <button onClick={handleClick}>Get Weather</button>
            </div>
            {weather && (
                <div className="weather-info">
                    <h3>{weather.name}</h3>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Condition: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

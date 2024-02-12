import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake, } from '@fortawesome/free-solid-svg-icons';
import { faTint,faTintSlash,faWater} from '@fortawesome/free-solid-svg-icons';

import './Weather.css'



const weatherIcons = {
  'Clear': faSun,
  'Clouds': faCloud,
  'Partly Cloudy': faCloudSun,
  'Rain': faCloudRain,
  'Snow': faSnowflake,
  
};

const temperatureIcons = {
  'Clear': faSun,
  'Clouds': faCloud,
  'Partly Cloudy': faCloudSun,
  'Rain': faCloudRain,
  'Snow': faSnowflake,
  
};

const getTemperatureIcon = (temperature) => {
  if (temperature > 30) {
    return temperatureIcons['Clear']; 
  } else if (temperature > 20) {
    return temperatureIcons['Partly Cloudy']; 
  } else if (temperature > 10) {
    return temperatureIcons['Clouds']; 
  } else if (temperature > 0) {
    return temperatureIcons['Rain']; 
  } else {
    return temperatureIcons['Snow']; 
  }
};

const humidityIcons = {
  'Low': faTint,      
  'Moderate': faTintSlash,   
  'High': faWater,       
  
};

const getHumidityIcon = (humidity) => {
  if (humidity < 30) {
    return humidityIcons['Low'];       
  } else if (humidity < 70) {
    return humidityIcons['Moderate'];  
  } else {
    return humidityIcons['High'];      
  }
};



const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3ab566bea8938e8ee734b8acb7345e69`)
      .then(response => {
        setWeatherData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        setError('Error fetching weather data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetchData();
  };

  return (
    <div className='weather-container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading ? (
        <p>Loading weather data...</p>
      ) : error ? (
        <p className='error-message'>{error}</p>
      ) : (
        <div className='weather-info'>
          <h2>{weatherData.name}</h2>
          <p>
            <FontAwesomeIcon icon={weatherIcons[weatherData.weather[0].main]} />
            {weatherData.weather[0].description}
          </p>
          
          <p>
          <FontAwesomeIcon icon={getTemperatureIcon(weatherData.main.temp)} />
               {weatherData.main.temp}°C
    
          </p>

           <p>
          <FontAwesomeIcon icon={getHumidityIcon(weatherData.main.humidity)} />
           Humidity: {weatherData.main.humidity}%
          </p> 
           <p>Description: {weatherData.weather[0].description}</p> 
           <p>Feels like: {weatherData.main.feels_like}°C</p> 
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Pressure: {weatherData.main.pressure}</p>
          <p>Wind Speed: {weatherData.wind.speed}m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;






 


        
         







import axios from 'axios';

const api_key = import.meta.env.VITE_WEATHER_API_KEY;
const getWeather = country =>
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=imperial&appid=${api_key}`
    )
    .then(response => response.data)
    .catch(error => console.log(error));

export { getWeather };

import { useEffect, useState } from 'react';
import { getAll } from './services/countries';
import { getWeather } from './services/weather';

import './App.css';

const Country = ({ country, weatherData }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img className='country-flag' src={country.flags.png} />
      {weatherData && (
        <div>
          <h2>Weather in {country.name.common}</h2>
          <p>temperature {weatherData.main.temp} Fahrenheit</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
          <p>wind {weatherData.wind.speed} miles/hour</p>
        </div>
      )}
    </div>
  );
};

const CountryToggle = ({ country, showCountryStatus }) => {
  const [showCountry, setShowCountry] = useState(showCountryStatus);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!showCountry) {
      return;
    }

    getWeather(country).then(weatherData => setWeatherData(weatherData));
  }, [showCountry]);

  return (
    <div>
      <h2>
        {country.name.common}
        <button onClick={() => setShowCountry(!showCountry)}>
          {showCountry ? 'hide' : 'show'}
        </button>
      </h2>
      {showCountry && <Country country={country} weatherData={weatherData} />}
    </div>
  );
};

const Countries = ({ countries, searchName }) => {
  // no search string
  if (searchName === '') {
    return null;
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchName.toLowerCase())
  );

  if (filteredCountries.length === 0) {
    return null;
  }

  // too many matching countries
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  // display list of countries if > 1
  if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <>
        {filteredCountries.map(country => (
          <CountryToggle
            key={country.area}
            country={country}
            showCountryStatus={false}
          />
        ))}
      </>
    );
  }

  // display country details
  return (
    <CountryToggle country={filteredCountries[0]} showCountryStatus={true} />
  );
};

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAll().then(countriesResponse => setCountries(countriesResponse));
  }, []);

  const handleSearch = event => {
    setSearchName(event.target.value);
  };

  return (
    <>
      <label>
        find countries
        <input value={searchName} onChange={handleSearch} />
      </label>
      <Countries countries={countries} searchName={searchName} />
    </>
  );
};

export default App;

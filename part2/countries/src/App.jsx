import { useEffect, useState } from 'react';
import { getAll } from './services/countries';

import './App.css';

const Countries = ({ countries, searchName }) => {
  // no search string
  if (searchName === '') {
    return null;
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchName.toLowerCase())
  );

  // too many matching countries
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  // display list of countries if > 1
  if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map(c => (
          <li key={c.area}>{c.name.common}</li>
        ))}
      </ul>
    );
  }

  // display country details
  const country = filteredCountries[0];
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
    </div>
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

import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchFilter, setsearchFilter] = useState('');

  const hook = () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
  };

  useEffect(hook, []);

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };

    axios.post('http://localhost:3001/persons', newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleSearchFilter = (event) => {
    setsearchFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchFilter={searchFilter}
        handleSearchFilter={handleSearchFilter}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNameInputChange={handleNameInputChange}
        newNumber={newNumber}
        handleNumberInputChange={handleNumberInputChange}
        handleSubmitClick={handleSubmitClick}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchFilter={searchFilter} />
    </div>
  );
};

export default App;

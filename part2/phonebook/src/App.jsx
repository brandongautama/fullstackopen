import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import { getAll, create, deleteId } from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchFilter, setsearchFilter] = useState('');

  const hook = () => {
    console.log('effect');
    getAll().then((persons) => setPersons(persons));
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

    create(newPerson).then((newPersonFromDB) => {
      setPersons(persons.concat(newPersonFromDB));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleSearchFilter = (event) => {
    setsearchFilter(event.target.value);
  };

  const handleDelete = (personToDelete) => {
    if (!confirm(`Delete ${personToDelete.name}?`)) {
      return;
    }
    deleteId(personToDelete.id);
    setPersons(persons.filter((person) => person.id !== personToDelete.id));
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
      <Persons
        persons={persons}
        searchFilter={searchFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

const Persons = ({ persons, searchFilter, handleDelete }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().startsWith(searchFilter.toLowerCase())
      )
      .map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)}>delete</button>
        </p>
      ))}
  </div>
);

export default Persons;

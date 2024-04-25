const Persons = ({ persons, searchFilter }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().startsWith(searchFilter.toLowerCase())
      )
      .map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
  </div>
);

export default Persons;

import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const numbersToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };

  const addNumber = (e) => {
    e.preventDefault();

    const doesNameExits = persons.some((person) => person.name === newName);
    if (!doesNameExits) {
      const newObject = {
        name: newName,
        number: newNumber,
      };
      persons.push(newObject);
      setPersons(persons);
      setNewName('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} />
    </div>
  );
};

export default App;


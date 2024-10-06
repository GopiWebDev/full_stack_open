const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('dist'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

morgan.token('body', (req) => JSON.stringify(req.body));

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

// app.get('/info', (request, response) => {
//   const length = persons.length;
//   const time = new Date();
//   console.log(length);

//   return response.send(
//     `
//     <p>Phonebook has info for ${length} person</p>
//     <p>${time.toString()}</p>
//    `
//   );
// });

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  let maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
  return String(maxId + 1);
};

const nameExists = (name) => {
  return persons.find((per) => per.name === name);
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT);

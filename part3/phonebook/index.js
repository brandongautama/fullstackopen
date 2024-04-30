const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');
const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', req => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (!person) {
    console.log(`Person ${id} not found`);
    response.status(404).end();
    return;
  }
  response.json(person);
});

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  //   if (
  //     persons
  //       .map(person => person.name.toLowerCase())
  //       .includes(body.name.toLowerCase())
  //   ) {
  //     return response.status(400).json({
  //       error: 'name must be unique',
  //     });
  //   }

  //   const person = {
  //     name: body.name,
  //     number: body.number,
  //     id: generateId(),
  //   };

  //   persons = persons.concat(person);

  //   response.json(person);
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (!person) {
    console.log(`Person ${id} not found`);
    response.status(404).end();
    return;
  }
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

app.get('/info', (request, response) => {
  const phonebookInfo = `<div>Phoneboook has info for ${persons.length} people</div><br>`;
  const infoResponse = `<div>${new Date()}</div>`;
  response.send(phonebookInfo + infoResponse);
});

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// File for running in command line, not exported
// node mongo.js fullstackopen Anna 040-1234556
// node mongo.js fullstackopen
const mongoose = require('mongoose');

const password = process.argv[2];
// username: fullstackopen, password: fullstackopen
const url = `mongodb+srv://fullstackopen:${password}@cluster0.d0ctkrw.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length == 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length == 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

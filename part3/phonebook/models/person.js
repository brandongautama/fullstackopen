const mongoose = require('mongoose');

// username: fullstackopen, password: fullstackopen
const url =
  'mongodb+srv://fullstackopen:fullstackopen@cluster0.d0ctkrw.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0';

mongoose.set('strictQuery', false);
mongoose
  .connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message);
  });

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
module.exports = Person;

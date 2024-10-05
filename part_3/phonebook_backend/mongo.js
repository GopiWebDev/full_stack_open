const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebook:${password}@cluster0.svjxm.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// });

// person.save().then((result) => {
//   console.log(`added ${person.name} number ${person.number} to phonebook`);
//   mongoose.connection.close();
// });

Person.find({}).then((result) => {
  console.log('phonebook:');
  result.forEach((res) => {
    console.log(`${res.name} ${res.number}`);
  });
  mongoose.connection.close();
});

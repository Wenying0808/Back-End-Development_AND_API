require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log('connected')})

let Person;

const Schema = mongoose.Schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var WenyingChang = new Person({
    name: 'Wenying Chang', age: 30, favoriteFoods: ['eggs', 'fish', 'berries']
  });
  WenyingChang.save(function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Jing", age: 55, favoriteFoods: ["Veggies", "soup"]},
  {name: "Stanley", age: 28, favoriteFoods: ["meat", "dessert", "hotpot"]},
  {name: "Anthony", age: 26, favoriteFoods: ["bbq", "bubble tea"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, data){
    if (err) return console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function (err, person){
    if (err) return console.log(err);
    // add food
    person.favoriteFoods.push(foodToAdd);
    // save the update
    person.save((err, updatedPerson)=>{
      if (err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet }, {new: true}, (err, updatedDoc)=>{
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  var findQuery = Person.find({ favoriteFoods: foodToSearch})
    .sort({ name: 1}) // ascending
    .limit(2) // 2 docs
    .select({ age: 0 }) // hide age
    .exec((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

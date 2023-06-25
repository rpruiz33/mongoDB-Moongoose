const mongoose= require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

let programmer = new Person({
  namer :"robertoProgramdor",
  age :29,
  favouriteFoods: ["pizza", "fideos"]
})

// let Person;

const createAndSavePerson = (done) => {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {


  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function (err,personFound) {
    if (err) return console.log(err);
  done(null,personFound);
});
};
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, function (err, foodFound) {
  if (err) return console.log(err);
    done(null , foodFound);
});
};
const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, function (err,personFound) {
    if (err) return console.log;
  done(null ,personFound);
});
};
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};
const removeById = (personId, done) => {
 
  Person.findByIdAndRemove(personId,(err, remover)=> {
      if(err) return console.log(err);
      done(null, remover);
    
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name:nameToRemove}, (err,response)=> {;
if(err) return console.log(err);
 done(null ,response);
});
}
let queryChain = (done) => {
  let foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:'asc'}).limit(2)
  .select('-age')
  .exec(function(error,searchResult){

   done(null , searchResult);
});
}
// /** **Well Done !!**
// /* You completed these challenges, let's go celebrate !
//  */

// //----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

 exports.PersonModel = Person;
//exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
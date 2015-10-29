'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

function Blob() {
  this.peopleEaten = 0;
  this.peoplePerHour = 1;
  

  this.eatAPerson = function() {
    this.peopleEaten++;
    this.peoplePerHour++;
  };

  this.hoursToOoze = function(population, peoplePerHour) {
    minutesBetweenMeals = 0;
    totalMinutes = 0;
    blob.peopleEaten = 0;
    blob.peoplePerHour = peoplePerHour;
    while(population > 0) {
      minutesBetweenMeals++;
      timeToMeal = 60 / blob.peoplePerHour;
      if(minutesBetweenMeals == timeToMeal || minutesBetweenMeals > timeToMeal) {
        blob.eatAPerson();
        population--;
        totalMinutes += minutesBetweenMeals;
        minutesBetweenMeals = 0;
      }
    }
    return totalMinutes/60;
  };
}

var blob = new Blob();

var minutesBetweenMeals = 0;
var totalMinutes = 0;
var dowingtonPopulation = 1000;

while(dowingtonPopulation > 0) {
  minutesBetweenMeals++;
  var timeToMeal = 60 / blob.peoplePerHour;
  if(minutesBetweenMeals == timeToMeal || minutesBetweenMeals > timeToMeal) {
    blob.eatAPerson();
    dowingtonPopulation--;
    totalMinutes += minutesBetweenMeals;
    minutesBetweenMeals = 0;
  }
}


var hoursSpentInDowington = totalMinutes / 60; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)



// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.


assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

assert(blob.hoursToOoze(0, 3) === 0, 'no people with 3 per hour - still no time needed');
assert(blob.hoursToOoze(1, 1) === 1, 'one person at one person per hour - one hour needed');
assert(blob.hoursToOoze(1500000, 1) > 5, '1.5 million people should take more than 5 hours');


//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.

function SentientBeing (homeworld, language) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homeworld = homeworld;
  this.language = language;
}

// sb is a SentientBeing object
function sayHello (sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
  console.log(hello[this.language]);
  return hello[sb.language];
    //TODO: put this on the SentientBeing prototype
}

SentientBeing.prototype.sayHello = sayHello;

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

function Klingon() {
  SentientBeing.call(this, "Qo'noS", "klingon");
}
Klingon.prototype = Object.create(SentientBeing.prototype);

function Human() {
  SentientBeing.call(this, "Earth", "federation standard");
}
Human.prototype = Object.create(SentientBeing.prototype);

function Romulan() {
  SentientBeing.call(this, "Romulus", "romulan");
}
Romulan.prototype = Object.create(SentientBeing.prototype);

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'hello', 
  'the human should hear hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru', 
  'the romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH', 
  'the klingon should hear nuqneH');
assert((new Romulan()).sayHello(new Human()) === 'hello', 
  'the human should hear hello');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    if(a[a.length-1].toLowerCase() < b[b.length-1].toLowerCase()) {
      return -1;
    } else if (a[a.length-1].toLowerCase() == b[b.length-1].toLowerCase()) {
      return 0;
    } else return 1;
  }
  stringArray.sort(byLastLetter);
}
 
function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(element) {
    sum += element;
  });
  return sum;
}

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    if(sumArray(a) < sumArray(b)) {
      return -1;
    } else if(sumArray(a) == sumArray(b)) {
      return 0;
    } else {
      return 1;
    }
  });
}

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************

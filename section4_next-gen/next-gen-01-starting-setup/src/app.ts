// Code goes here!
const userName = 'camimurg';
// let age = 25;

// age = 26;

// function add(a: number, b: number) {
//   let result;
//   result = a + b;
//   return result
// }

// arrow function syntax
// const add = function() => {}

// const add = (parameters..) => {};

// default value must be the last one in the list of the params
// const add = (a: number, b: number = 1) => {
//   return a + b;
// };

// we can omit {} and return kewyword if it returns just a statement
const add2 = (a: number, b: number = 1) => a + b;

console.log(add2(2));

// const printOutput = (output: string | number) => {
//   console.log(output)
// }

const printOutput: (a: string | number) => void = output => console.log(output)

printOutput(add2(3, 7))

const button = document.querySelector('button');

if(button) {
  button.addEventListener('click', event => console.log(event));
}

const hobbies = ['sports', 'cooking'];
// tell JS to pull out all the elements of that array and basically 
 // add them as a list of values so not as an array but 
 // a list of individual values in the place where you used that operator

const activeHobbies = ['hiking', ...hobbies];

 // activeHobbies.push(...hobbies);

console.log(hobbies);
console.log(activeHobbies)

const person = {
  firstName: 'max',
  age: 30
};

const copiedPerson = { ...person };

console.log(person);
console.log(copiedPerson);

// reduce method available with Arrays, reduce works because
// it performs an operation on every element in an array
// return a result and then add this result together f
const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addNumbers = add(4, 5, 8, 8, 9)
console.log(addNumbers)


// const hobby1 = hobbies[0];
// const hobby2 = hobbies[1];

// ARRAY & OBJECT DESTRUCTURING 
const [hobby1, ...remainingHobbies] = hobbies;
console.log('hobby 1:');
console.log(hobby1);
console.log('remaining hobbies:');
console.log(remainingHobbies);
console.log(hobbies);

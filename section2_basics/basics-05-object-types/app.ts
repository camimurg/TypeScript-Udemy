// const person: {
//   name: string;
//   age: number;
// } = {
const person: {
  name: string;
  age: number;
  hobbies: string[];
  numbers: number[];
  randomArray: any[];
  role: [number, string]; // TUPPLE
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['sports', 'cooking'], // string[];
  numbers: [1, 2, 3], // number[];
  randomArray: ['miao', 2, true], // (string | number | boolean)[] or any[];
  role: [2, 'author']
};

person.role.push('admin'); // it doesn't get an error...
person.role = [0, 'admin', 'user']; // you get an error
console.log(person.role)
// person.role[1] = 10;

let favoriteActivities: any[];
favoriteActivities = ['sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
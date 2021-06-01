interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age: number;

  constructor(n: string, age: number) {
    this.name = n;
    this.age = age
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

let user1: Greetable;

user1 = new Person('Max', 30);

user1.greet('Hi there - I am');
console.log(user1);

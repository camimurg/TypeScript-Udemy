interface Person {
  name: string;
  age: number;

  greet(phrase:string): void  // it's not necessary to have parameters
}

let user1: Person;

user1 = {
  name: "Cami",
  age: 30,

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
};

user1.greet('Hi there. I am')

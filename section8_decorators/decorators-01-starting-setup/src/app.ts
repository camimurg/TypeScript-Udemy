// first way to build a decorators

// function Logger(constructor: Function) {
//   console.log('Loggin...');
//   console.log(constructor);
// }


// Decorator factories
function Logger(logString: string) {
  return function(constructor: Function) {
  console.log(logString);
  console.log(constructor);
  }
}

function  WithTemplate(template: string, hookId: string) {
  return function(constructor: any) {
    const hookElem = document.getElementById(hookId)
    const pers2 = new constructor();
    if (hookElem) {
      hookElem.innerHTML = template;
      hookElem.querySelector('h1')!.textContent = pers2.name;
    }
  }
}

// @Logger('Loggin - person')
@WithTemplate('<h1>My person object</h1>', 'app') //decorator execute where the class is define and not where is executed
class Person {
  name = 'max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

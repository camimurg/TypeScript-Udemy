// Code goes here! you can use also interface
type  Admin = {
  name: string;
  privileges: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Mario',
  privileges: ['create-server'],
  startDate: new Date()
}

console.log(e1.privileges);

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

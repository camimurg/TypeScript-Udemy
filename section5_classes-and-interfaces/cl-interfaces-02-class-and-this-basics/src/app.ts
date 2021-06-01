class Department {
  name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo(){
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('Accounting');

accounting.addEmployee('suzi');
accounting.addEmployee('cami');

accounting.employees[2] = 'sophie'; // cannot use anymore, because of the private keyword before the prop name

console.log(accounting.employees)
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();

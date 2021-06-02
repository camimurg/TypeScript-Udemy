// Project Type
enum ProjectStatus {
  Active, Finished
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public state: ProjectStatus
    ) {}
}

// Project State Management
type Listener = (items: Project[]) => void; // we don't care about any value that listener function may return

class ProjectState {
  private listeners: Listener[] = []; // array of functions references
  private projects: Project[] = []; // it will store an array of projects
  private static instance: ProjectState;

  private constructor() {}

  // Static methods are often utility functions, such as functions to create or clone objects, 
  // whereas static properties are useful for caches, fixed-configuration, 
  // or any other data you don't need to be replicated across instances.
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject)
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // new array
    }
  }
}

// global constant that can be use anywhere in the file so talking to this class it's super simple
const projectState = ProjectState.getInstance();

// validation
interface Validatable {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (validatableInput.minLength != null &&
      typeof validatableInput.value === 'string') {
    isValid = 
      isValid && validatableInput.value.length > validatableInput.minLength; 
  }
  if (validatableInput.maxLength != null &&
      typeof validatableInput.value === 'string') {
    isValid = 
      isValid && validatableInput.value.length < validatableInput.maxLength; 
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number'){
    isValid = isValid && validatableInput.value > validatableInput.min
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number'){
    isValid = isValid && validatableInput.value > validatableInput.max
  }
  
  return isValid;
}

// autobind decorator
function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    // getter
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

// ProjectList class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    //import the content
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl?.appendChild(listItem);
    }

  }

  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; //OR HTMLElement: <div id='app'><div/>
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // ! tell typescript that we are sure that we will find that id element in the dom.
    //if not you can make an if statement
    // FIRST APPROACH:
    // this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
    // SECOND APPROACH, better, but is the same thing as above
    // you are saying TS that also get element by id return a type of HTMLTemplateElement
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 1
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      minLength: 1
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
      ) {
        alert('Invalid input, please try again');
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault(); //to prevent the default for submission, which who'd trigger a http request to be send 
    console.log(this.titleInputElement.value)
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, descr, people] = userInput;

      //creating a new project
      projectState.addProject(title, descr, people);
      console.log(title, descr, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');

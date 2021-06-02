// Code goes here!
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

    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0 
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

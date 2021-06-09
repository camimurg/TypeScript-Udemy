import Cmp from './base-component';
import * as Validation from '../util/validation';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

// ProjectInput Class
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    
    this.configure();
    this.renderContent()
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }
  
  renderContent() {}

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 1
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      minLength: 1
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
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

}

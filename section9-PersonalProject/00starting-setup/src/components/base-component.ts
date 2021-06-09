// Component Base Class abstract class to make sure people never directly instantiate it, but it will always be used for inheritance
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T; 
  element: U;
  
  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string,

    ) {
      this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;

      const importedNode = document.importNode(this.templateElement.content, true);
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }

      this.attach(insertAtStart)
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
      );
  }

  // abstract methods so that the complete implementation is missing but we are forcing any class 
  // inheriting from this component to have this method available 
  // you cannot have a private abstract method..
  abstract configure(): void;
  abstract renderContent(): void;
}

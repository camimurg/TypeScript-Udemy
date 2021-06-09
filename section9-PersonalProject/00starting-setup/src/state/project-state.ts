
import { Project, ProjectStatus } from '../models/project';

// Project State Management
type Listener<T> = (items: T[]) => void; // we don't care about any value that listener function may return

class State<T> {
  protected listeners: Listener<T>[] = []; // array of functions references

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project>{
  
  private projects: Project[] = []; // it will store an array of projects
  private static instance: ProjectState;

  private constructor() {
    super();
  }

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

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // new array
    }
  }
}

// global constant that can be use anywhere in the file so talking to this class it's super simple
export const projectState = ProjectState.getInstance();

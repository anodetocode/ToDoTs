import Task from './task';

abstract class TodoState {
  public tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  abstract addTask(task: Task): void;
  abstract removeTask(task: Task): void;
  abstract completeTask(task: Task): void;
  abstract undoTask(task: Task): void;
}

export default class TodoList extends TodoState {
  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTask(task: Task) {
    let index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  completeTask(task: Task) {}

  undoTask(task: Task) {}
}
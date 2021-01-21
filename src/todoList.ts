export interface Task {
  taskName: string,
  isDone: boolean
}

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
  static createTask(taskName: string) {
    return { taskName, isDone: false };
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTask(task: Task) {
    let index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  completeTask(task: Task) {
    task.isDone = true;
  }

  undoTask(task: Task) {
    task.isDone = false;
  }

  changeTask(task: Task, newTask: string) {
    task.taskName = newTask;
  }
}
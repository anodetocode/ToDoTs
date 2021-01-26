export interface Task {
  taskName: string,
  isDone: boolean
}

abstract class TodoState {
  public tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  abstract addTask(taskName: string): Task;
  abstract removeTask(task: Task): void;
  abstract completeTask(task: Task): void;
  abstract undoTask(task: Task): void;
}

export default class TodoList extends TodoState {
  addTask(taskName: string) {
    const task = { taskName, isDone: false };
    this.tasks.push(task);
    return task;
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
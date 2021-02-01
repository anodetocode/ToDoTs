import PubSub from './pubsub';
import View from './view';

export interface Task {
  taskName: string,
  isDone: boolean
}

interface IState {
  tasks: Task[],
  todoText: string;
}

// Add View
export default class TodoList {
  private eventBus: PubSub = new PubSub();
  private view: View = new View();
  private state: IState = {
    tasks: [],
    todoText: ''
  }

  constructor() {
    // Setup dom events
    this.view.textField?.addEventListener('input', this.onInput.bind(this));
    this.view.addbutton?.addEventListener('click', this.onAddTask.bind(this));

    // Register eventbus events
    // can chain register
    this.eventBus.register('change');

    // Listen to eventbus events
    this.eventBus.on('change', this.render.bind(this));
  }

  private onInput(event: Event) {
    // @ts-ignore
    this.state.todoText = event.currentTarget.value;

    // Does this make sense? Do we wanna pass the state, which they can already access
    // Maybe { type: "", whatever: [] }
    this.eventBus.emit('change', this.state);
  }

  private onAddTask(event: Event) {
    if(!this.state.todoText) return;
    this.state.tasks.push({ taskName: this.state.todoText, isDone: false });
    this.resetForm();
    this.eventBus.emit('change', this.state);
  }

  private resetForm() {
    this.state.todoText = '';
    //@ts-ignore
    this.view.textField.value = '';
  }

  // Make this generic, for example pass it a type, and based on the type render X.
  // Make sure to type eventData
  private render(eventData: any) {
    this.view.log.innerHTML = JSON.stringify(eventData, null, 2);
  }

  // example
  // onInputChanged(eventData) {}





  // addTask(taskName: string) {
  //   const task = { taskName, isDone: false };
  //   this.state.tasks.push(task);
  //   return task;
  // }

  // removeTask(task: Task) {
  //   let index = this.state.tasks.indexOf(task);
  //   if (index > -1) {
  //     this.state.tasks.splice(index, 1);
  //   }
  // }

  // completeTask(task: Task) {
  //   task.isDone = true;
  // }

  // undoTask(task: Task) {
  //   task.isDone = false;
  // }

  // changeTask(task: Task, newTask: string) {
  //   task.taskName = newTask;
  // }
}
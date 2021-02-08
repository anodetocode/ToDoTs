import PubSub from './pubsub';
import View from './view';

export interface Task {
  taskName: string,
  isDone: boolean
}

enum TaskFilter {
  all,
  done,
  todo
}

interface IState {
  tasks: Task[],
  todoText: string,
  taskFilter: TaskFilter
}

// Add View
export default class TodoList {
  private eventBus: PubSub = new PubSub();
  private view: View = new View();
  private state: IState = {
    tasks: [],
    todoText: '',
    taskFilter: TaskFilter.all
  }

  constructor() {
    // Setup dom events
    this.view.textField?.addEventListener('input', this.onInput.bind(this));
    this.view.addbutton?.addEventListener('click', this.onAddTask.bind(this));
    this.view.allFilterButton?.addEventListener('click', this.onFilterAll.bind(this));
    this.view.toDoFilterButton?.addEventListener('click', this.onFilterToDo.bind(this));
    this.view.doneFilterButton?.addEventListener('click', this.onFilterDone.bind(this));

    // Listen to eventbus events
    this.eventBus.on('change', this.render.bind(this));

    // Clear from previous builds
    this.clearForm();
    this.render();
  }

  private update() {
    this.eventBus.emit('change');
  }

  private onFilterAll() {
    this.state.taskFilter = TaskFilter.all;
    this.eventBus.emit('change');
  }

  private onFilterToDo() {
    this.state.taskFilter = TaskFilter.todo
    this.eventBus.emit('change');
  }

  private onFilterDone() {
    this.state.taskFilter = TaskFilter.done
    this.eventBus.emit('change');
  }

  private onInput(event: Event) {
    // @ts-ignore
    this.state.todoText = event.currentTarget.value;

    // Does this make sense? Do we wanna pass the state, which they can already access
    // Maybe { type: "", whatever: [] }
    // this.eventBus.emit('change', this.state);
    this.update();
  }

  private onAddTask() {
    if(!this.state.todoText) return;
    this.state.tasks.push({ taskName: this.state.todoText, isDone: false });
    this.clearForm();
    this.update();
  }

  private clearForm() {
    this.state.todoText = '';
    //@ts-ignore
    this.view.textField.value = '';
  }

  // Make this generic, for example pass it a type, and based on the type render X.
  // Make sure to type eventData
  // private render(eventData: any) {}


  private render() {
    let div = document.createElement('div');
    let reducer = (parent: any, child: any) => { parent.appendChild(child); return parent };
    let taskElements = this.filteredTasks().map(task => this.newTaskElement(task));
    let tasksElement = taskElements.reduce(reducer, div);

    //@ts-ignore
    this.view.taskList?.innerHTML = '';
    this.view.taskList?.appendChild(tasksElement);

    //@ts-ignore
    this.view.taskNumberElement?.innerHTML = `Num of tasks: ${this.filteredTasks().length}`;

    // this.view.log.innerHTML = JSON.stringify(this.state, null, 2);
  }

  public newTaskElement(task: Task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const doneButton = document.createElement('button');
    doneButton.innerHTML = 'Done';
    doneButton.addEventListener('click', () => {
      task.isDone = !task.isDone;
      this.update();
    });
    taskElement.appendChild(doneButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', () => {
      const index = this.state.tasks.indexOf(task);
      index > -1 && this.state.tasks.splice(index, 1);
      this.update();
    });
    taskElement.appendChild(deleteButton);

    const taskNameElement = document.createElement('p');
    taskNameElement.innerHTML = task.taskName;
    taskNameElement.setAttribute('done', task.isDone.toString());
    taskElement.appendChild(taskNameElement);

    return taskElement;
  }

  // some how turn this into a computed property?
  private filteredTasks(): Task[] {
    switch (this.state.taskFilter) {
      case TaskFilter.todo:
        return this.state.tasks.filter(task => !task.isDone);
      case TaskFilter.done:
        return this.state.tasks.filter(task => task.isDone);
      default:
        return this.state.tasks;
    }
  }

  // example
  // private onInputChanged(eventData: any) {}




// -------------------------------------------------------
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
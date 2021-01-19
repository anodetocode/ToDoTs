import TodoList, { Task } from './todoList';

describe('TodoList', () => {
  it('can create a task', () => {
    let name = 'test task';
    let myTask = TodoList.createTask(name);
    expect(myTask).toHaveProperty('taskName', name);
    expect(myTask).toHaveProperty('isDone', false);
  });

  it('can add a task', () => {
    let todoList = new TodoList;
    let task: Task = TodoList.createTask('task');
    todoList.addTask(task);
    expect(todoList.tasks.includes(task)).toBeTruthy();
  });

  it('can delete a task', () => {
    let todoList = new TodoList;
    let task: Task = TodoList.createTask('task');

    todoList.addTask(task);
    todoList.tasks.includes(task) || fail('todoList does not contain a task');

    todoList.removeTask(task);
    expect(todoList.tasks.includes(task)).toBeFalsy();
  });

  it('can mark a task as done', () => {
    let todoList = new TodoList;
    let task: Task = { taskName: 'not done task', isDone: false};

    todoList.addTask(task);
    todoList.tasks.includes(task) || fail('todoList does not contain a task');

    todoList.completeTask(task);
    expect(task.isDone).toBeTruthy();
  });

  it('can undo a task', () => {
    let todoList = new TodoList;
    let task: Task = { taskName: 'done task', isDone: true};

    todoList.addTask(task);
    todoList.tasks.includes(task) || fail('todoList does not contain a task');

    todoList.undoTask(task);
    expect(task.isDone).toBeFalsy();
  });
});
import TodoList, { Task } from './todoList';

describe('TodoList', () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList;
  });

  it('can create a task', () => {
    let name = 'test task';
    let myTask = TodoList.createTask(name);
    expect(myTask).toHaveProperty('taskName', name);
    expect(myTask).toHaveProperty('isDone', false);
  });

  it('can add a task', () => {
    let task: Task = TodoList.createTask('task');
    todoList.addTask(task);
    expect(todoList.tasks.includes(task)).toBeTruthy();
  });

  it('can delete a task', () => {
    let task: Task = TodoList.createTask('task');

    todoList.addTask(task);
    todoList.tasks.includes(task) || fail('todoList does not contain a task');

    todoList.removeTask(task);
    expect(todoList.tasks.includes(task)).toBeFalsy();
  });

  it('can mark a task as done', () => {
    let task: Task = { taskName: 'not done task', isDone: false };

    todoList.addTask(task);
    todoList.tasks.includes(task) || fail('todoList does not contain a task');

    todoList.completeTask(task);
    expect(task.isDone).toBeTruthy();
  });

  it('can undo a task', () => {
    let task: Task = { taskName: 'done task', isDone: true };

    todoList.undoTask(task);
    expect(task.isDone).toBeFalsy();
  });

  it('can change task name', () => {
    let task: Task = TodoList.createTask('original');
    let isDone = task.isDone;
    let newName = 'edited';

    todoList.changeTask(task, newName);
    expect(task.taskName).toEqual(newName);
    expect(task.isDone).toEqual(isDone);
  });
});
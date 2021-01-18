import TodoList from './todoList';
import Task from './task';
jest.mock('./task');

describe('TodoList', () => {
  it('can add a task', () => {
    let todoList = new TodoList;
    let task = new Task;
    todoList.addTask(task);
    expect(todoList.tasks.includes(task)).toBeTruthy();
  });

  it('can delete a task', () => {
    let todoList = new TodoList;
    let task = new Task;

    todoList.addTask(task);
    todoList.tasks.includes(task) || fail('todoList does not contain a task')

    todoList.removeTask(task);
    expect(todoList.tasks.includes(task)).toBeFalsy();
  });
});
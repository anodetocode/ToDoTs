import TodoList, { Task } from './todoList';

describe('TodoList', () => {
  let todoList: TodoList;

  beforeEach(() => {
    todoList = new TodoList;
  });

  it('can add a task', () => {
    const task: Task = todoList.addTask('add');
    expect(todoList.tasks.includes(task)).toBeTruthy();
  });

  it('can deconste a task', () => {
    const task: Task = todoList.addTask('remove');
    todoList.tasks.includes(task) || fail('todoList does not contain a task');
    todoList.removeTask(task);
    expect(todoList.tasks.includes(task)).toBeFalsy();
  });

  it('can mark a task as done', () => {
    const task: Task = todoList.addTask('not done task');
    todoList.tasks.includes(task) || fail('todoList does not contain a task');

    todoList.completeTask(task);
    expect(task.isDone).toBeTruthy();
  });

  it('can undo a task', () => {
    const task: Task = todoList.addTask('done task');
    todoList.completeTask(task);
    expect(task.isDone).toBeTruthy();
    todoList.undoTask(task);
    expect(task.isDone).toBeFalsy();
  });

  it('can change task name', () => {
    const task: Task = todoList.addTask('original');
    const isDone = task.isDone;
    const newName = 'edited';

    todoList.changeTask(task, newName);
    expect(task.taskName).toEqual(newName);
    expect(task.isDone).toEqual(isDone);
  });
});
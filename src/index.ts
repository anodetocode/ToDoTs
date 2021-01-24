import TodoList, { Task } from './todoList';

const todoList = new TodoList();


const listElement = document.getElementById("#todoList");
if (!listElement) {
  throw new Error('No "#todoList" element');
}

todoList.tasks.forEach(task => {
  listElement.innerHTML += taskElement(task);
});

const taskElement = (task: Task) => {
  return `<div>
  <p>${task.taskName}</p><button>${task.isDone}</button>
</div>`
}
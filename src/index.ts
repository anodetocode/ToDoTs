import TodoList, { Task } from './todoList';

const todoList = new TodoList();


const listElement = document.getElementById("#todoList");
const addbutton = document.getElementById("#addButton");
const textField = document.getElementById("#teskTextField");



if (!listElement) {
  throw new Error('No "#todoList" element');
}

if (!addbutton) {
  throw new Error('No button element');
}

console.log("no fucking event listener");
addbutton.addEventListener('click', () => {
  console.log("ADDING NEW TASK");
  const taskName = textField?.textContent;
  taskName && todoList.addTask(taskName);
  updateList();
});

const taskElement = (task: Task) => {
  return `<div>
  <p>${task.taskName}</p><button>${task.isDone}</button>
</div>`
}

const updateList = () => {
  todoList.tasks.forEach(task => {
    listElement.innerHTML += taskElement(task);
  });
}

updateList();
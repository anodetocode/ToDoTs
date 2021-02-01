import TodoList, { Task } from './todoList';

new TodoList();

// // Register test render event
// pubsub.register('changed');

// // setup on listener for that event
// pubsub.on('changed', render);

// // Controlled Component/Input
// textField?.addEventListener('input', (e: Event) => {
//   // @ts-ignore
//   state.taskName = e.target.value;

//   pubsub.emit('changed', state);
// });


// function render(eventData: any): void {
//   log.innerHTML = JSON.stringify(eventData, null, 2);
// }


// if (!listElement) {
//   throw new Error('No "#todoList" element');
// }

// if (!addbutton) {
//   throw new Error('No button element');
// }

// addbutton.addEventListener('click', () => {
//   console.log("ADDING NEW TASK");
//   const taskName = textField?.textContent;
//   taskName && todoList.addTask(taskName);
//   updateList();
// });

// const taskElement = (task: Task) => {
//   return `<div>
//   <p>${task.taskName}</p><button>${task.isDone}</button>
// </div>`
// }

// const updateList = () => {
//   todoList.tasks.forEach(task => {
//     listElement.innerHTML += taskElement(task);
//   });
// }

// updateList();
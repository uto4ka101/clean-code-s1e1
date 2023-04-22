const addButton = document.querySelector('.add-task-button');
const incompleteTaskHolder = document.querySelector('.incomplete-tasks');
const completedTasksHolder = document.querySelector('.completed-tasks');

let taskInput = document.querySelector('#new-task-input');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'task-item';

  label.innerText = taskString;
  label.className = 'task-label';

  checkBox.type = 'checkbox';
  checkBox.className = 'task-checkbox';
  editInput.type = 'text';
  editInput.className = 'input task-text-input';

  editButton.innerText = 'Edit';
  editButton.className = 'button edit';

  deleteButton.className = 'button delete';
  deleteButtonImg.className = 'delete-img';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function () {
  console.log('Add Task...');
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

const editTask = function () {
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.task-text-input');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('edit-mode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

const taskCompleted = function () {
  console.log('Complete Task...');

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
  console.log('Incomplete Task...');

  const listItem = this.parentNode;

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function () {
  console.log('AJAX Request');
}

addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');

  const checkBox = taskListItem.querySelector('.task-checkbox');
  const editButton = taskListItem.querySelector('.edit');
  const deleteButton = taskListItem.querySelector('.delete');

  editButton.onclick= editTask;
  deleteButton.onclick= deleteTask;
  checkBox.onclick= checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

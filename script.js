// Get the elements
const todoInput = document.getElementById('todo-input');
const addTaskButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');
const todoItemTemplate = document.getElementById('todo-item-template');

// Initialize the todo list array
let todoListArray = [];

// Add event listener to the add task button
addTaskButton.addEventListener('click', addTask);

// Add event listener to the todo list
todoList.addEventListener('click', handleTodoListClick);

// Function to add a new task
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText) {
    const todoItem = {
      text: taskText,
      completed: false
    };
    todoListArray.push(todoItem);
    renderTodoList();
    todoInput.value = '';
  }
}

// Function to render the todo list
function renderTodoList() {
  todoList.innerHTML = '';
  todoListArray.forEach((todoItem, index) => {
    const todoItemHTML = todoItemTemplate.content.cloneNode(true);
    const todoItemElement = todoItemHTML.querySelector('li');
    todoItemElement.querySelector('span').textContent = todoItem.text;
    todoItemElement.querySelector('input[type="checkbox"]').checked = todoItem.completed;
    todoItemElement.dataset.index = index;
    todoList.appendChild(todoItemHTML);
  });
}

// Function to handle clicks on the todo list
function handleTodoListClick(event) {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    const index = event.target.parentNode.parentNode.dataset.index;
    todoListArray[index].completed = event.target.checked;
    renderTodoList();
  } else if (event.target.classList.contains('edit')) {
    const index = event.target.parentNode.parentNode.dataset.index;
    const taskText = prompt('Edit task:', todoListArray[index].text);
    if (taskText) {
      todoListArray[index].text = taskText;
      renderTodoList();
    }
  } else if (event.target.classList.contains('delete')) {
    const index = event.target.parentNode.parentNode.dataset.index;
    todoListArray.splice(index, 1);
    renderTodoList();
  }
}

// Initialize the todo list
renderTodoList();
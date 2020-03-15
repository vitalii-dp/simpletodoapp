'use strict';

const itemsList = document.querySelector("#items");

// Add a new task

const addTaskButton = document.querySelector('#add-task');
const inputField = document.querySelector('#task-input');

function addTask() {
  const item = document.createElement('todo-item');
  const text = inputField.value.trim();
  item.textContent = text;
  if (text) {
    itemsList.appendChild(item);
    inputField.value = '';
    saveTodos();
  }
}

addTaskButton.addEventListener('click', addTask);

inputField.addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    addTask();
  }
})

// Check all items button

const checkAllButton = document.querySelector('#check-all');
checkAllButton.title = 'Check/uncheck all tasks';
checkAllButton.addEventListener('click', checkAllItems);

function checkAllItems() {
  const todos = Array.from(itemsList.childNodes);
  if (todos.every(item => item.hasAttribute('completed'))) {
    todos.forEach(item => item.removeAttribute('completed'));
  } else {
    todos.forEach(item => item.setAttribute('completed', ''));
  }
}

// Save todos

export function saveTodos() {
  const todoList = [];
  const todos = Array.from(itemsList.childNodes);
  todos.forEach((item, index) => {
    const obj = {
      id: Date.now().toString(16) + index,
      text: item.textContent,
      completed: item.inputCheckbox.checked,
    };
    todoList.push(obj);
  })
  localStorage.setItem('tasks', JSON.stringify(todoList));
  countTodos();
}

// Load todos

// document.addEventListener('load', loadTodos('tasks'))

// function loadTodos(storedItem) {
//   if (localStorage) {
//     itemsList.innerHTML = '';
//     const jsonTodos = localStorage.getItem(storedItem);
//     const parsedTodos = JSON.parse(jsonTodos);
//     parsedTodos.forEach(item => {
//       const todoItem = document.createElement('todo-item');
//       todoItem.textContent = item.text;
//       todoItem.inputCheckbox.checked = item.completed;
//       if (item.completed) {
//         todoItem.setAttribute('completed', true);
//       }
//       itemsList.appendChild(todoItem);
//     })
//     countTodos();
//   }
// }

if (localStorage) {
  window.onload = function () {
    itemsList.innerHTML = '';
    const jsonTodos = localStorage.getItem('tasks');
    const todos = JSON.parse(jsonTodos);
    todos.forEach(item => {
      const todoItem = document.createElement('todo-item');
      todoItem.textContent = item.text;
      todoItem.inputCheckbox.checked = item.completed;
      if (item.completed) {
        todoItem.setAttribute('completed', true);
      }
      itemsList.appendChild(todoItem);
    })
    countTodos();
  }
}

// Count todos

const todosCounterSpan = document.querySelector('#todos-counter');

export function countTodos() {
  const todos = Array.from(itemsList.childNodes);
  const todosLength = todos.length;
  todosLength === 1 ? todosCounterSpan.innerHTML = '1 item left' : todosCounterSpan.innerHTML = `${todosLength} items left`;
}

// Hide completed

const showActiveButton = document.querySelector('#show-active');
showActiveButton.addEventListener('click', hideCompletedItems);

function hideCompletedItems() {
  const todos = Array.from(document.getElementsByTagName('todo-item'));
  todos.forEach(item => {
    if (item.hasAttribute('completed')) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
  })
}

// Show all

const showAllButton = document.querySelector('#show-all');
showAllButton.addEventListener('click', showAllItems);

function showAllItems() {
  const todos = Array.from(itemsList.childNodes);
  todos.forEach(item => item.classList.remove('hidden'));
}

// Show completed

const showCompletedButton = document.querySelector('#show-completed');
showCompletedButton.addEventListener('click', showCompletedItems);

function showCompletedItems() {
  const todos = Array.from(itemsList.childNodes);
  todos.forEach(item => {
    if (!item.hasAttribute('completed')) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
  })
}

// Delete completed

const deleteCompletedButton = document.querySelector('#delete-completed');
deleteCompletedButton.addEventListener('click', deleteCompletedTasks);

function deleteCompletedTasks() {
  const todos = Array.from(itemsList.childNodes);
  todos.forEach(item => {
    if (item.hasAttribute('completed')) {
      item.remove();
      saveTodos();
    }
  });
}

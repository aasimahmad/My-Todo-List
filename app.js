//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", checkInput);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function checkInput(event) {
  //Prevent form from submitting
  event.preventDefault();
  if (todoInput.value != "") {
    addTodo();
  } else {
    error.textContent = "Please enter a task.";
    setTimeout(() => {
      error.textContent = "";
    }, 1300);
  }
}

function createTodo() {
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv);

  return newTodo;
}

function addTodo() {
  //CreateTodo Function Call
  createTodo();
  //Add Todos to LocalStorage
  saveLocalTodos(todoInput.value);
  //clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    //Remove from localStorage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  //Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//LocalStorage implementation

function checkLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function saveLocalTodos(todo) {
  let todos = checkLocalTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = checkLocalTodos();
  todos.forEach((todo) => {
    let newTodo = createTodo();
    newTodo.innerText = todo;
  });
}

function removeLocalTodos(todo) {
  let todos = checkLocalTodos();
  const todoElement = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoElement), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}

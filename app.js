const fieldInput = document.querySelector(".todo-input");
const fieldButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter");

fieldButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterList);
document.addEventListener('DOMContentLoaded', getList);

function addTask(event) {
	event.preventDefault();
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	const newToDo = document.createElement("li");
	newToDo.innerText = fieldInput.value;
	newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);
    
    saveLocal(fieldInput.value);

	// Add Task to List
	const addButton = document.createElement("button");
	addButton.innerHTML = '<i class="fas fa-check"></i>';
	addButton.classList.add("add-btn");
	todoDiv.appendChild(addButton);

	// Remove Task from List
	const deleteButton = document.createElement("button");
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add("delete-btn");
	todoDiv.appendChild(deleteButton);

	// Append Task to list
	todoList.appendChild(todoDiv);

	// Clear Input Field
	fieldInput.value = "";
}

function deleteCheck(event) {
	const item = event.target;

	// Delete Task
	if (item.classList[0] === "delete-btn") {
		const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocal(todo);
		todo.addEventListener("transitionend", function() {
			todo.remove();
		});
	}

	// Complete Task
	if (item.classList[0] === "add-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("added");
	}
}

function filterList(event) {
	const todos = todoList.childNodes;
	todos.forEach(function(todo) {
		switch (event.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("added")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "incompleted":
				if (!todo.classList.contains("added")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocal(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getList() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newToDo = document.createElement("li");
        newToDo.innerText = todo;
        newToDo.classList.add("todo-item");
        todoDiv.appendChild(newToDo);
        
        // Add Task to List
        const addButton = document.createElement("button");
        addButton.innerHTML = '<i class="fas fa-check"></i>';
        addButton.classList.add("add-btn");
        todoDiv.appendChild(addButton);

        // Remove Task from List
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        // Append Task to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
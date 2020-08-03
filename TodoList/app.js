// Selector
const todoInput = document.querySelector('.todo-input');
todoInput.classList.add('upperCase');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
let todoListHeading = document.querySelector('.todo-list-heading');
const filterOption = document.querySelector('.filter-todo');






//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filtering);

// Function
function addToDo(event) {
    event.preventDefault();
    // Normal Validation
    // Create Todo DIV

    if (todoInput.value === "") {
        alert("What are you doing Here")
    } else {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Todo list heading
        todoListHeading.classList.add('visible');
        // Create Li
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo-li');
        todoLi.innerText = todoInput.value;
        todoDiv.appendChild(todoLi);
        //Add localstorage
        saveLocalTodo(todoInput.value);
        //Create completed button
        const completedBtn = document.createElement('button');
        completedBtn.classList.add('completed-btn');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedBtn);
        //Create Trash button
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-btn');
        trashBtn.innerHTML = '<i class="fas fa-trash-restore-alt"></i>';
        todoDiv.appendChild(trashBtn);
        //Append All in Todo list
        todoList.appendChild(todoDiv);
        //Clear Todo input value
        todoInput.value = "";
    }
}

function deleteCheck(e) {
    e.preventDefault();
    const item = e.target;
    if (item.classList[1] === 'fa-trash-restore-alt') {
        const todoD = item.parentElement.parentElement;
        todoD.classList.add('fall');
        removeTodoLocalStorage(todoD);
        todoD.addEventListener('transitionend', function() {
            todoD.remove();
        })
    }
    if (item.classList[1] === 'fa-check') {
        const todoC = item.parentElement.parentElement;
        todoC.classList.toggle('text-underline');
        console.log(todoC);

    }
}

// Filter Data Sheet Function here
function filtering(e) {
    const todos = todoList.childNodes;

    todos.forEach(function(todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('text-underline')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (todo.classList.contains('text-underline')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
        };
    });
}

function saveLocalTodo(todo) {
    //Check do i have already in there 

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))

};

//Get todos at localstorege

function getTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Todo list heading
        todoListHeading.classList.add('visible');
        // Create Li
        const todoLi = document.createElement('li');
        todoLi.classList.add('todo-li');
        todoLi.innerText = todo;
        todoDiv.appendChild(todoLi);
        //Create completed button
        const completedBtn = document.createElement('button');
        completedBtn.classList.add('completed-btn');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedBtn);
        //Create Trash button
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-btn');
        trashBtn.innerHTML = '<i class="fas fa-trash-restore-alt"></i>';
        todoDiv.appendChild(trashBtn);
        //Append All in Todo list
        todoList.appendChild(todoDiv);
    })

};

function removeTodoLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    let deleteItem = todo.children[0].innerText;
    todos.splice(todos.indexOf(deleteItem), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

};
// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListener();

// Load all event listeners
function loadEventListener() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove Task Event
    taskList.addEventListener('click', removeTask);
    // Clear Task Events
    clearBtn.addEventListener('click', clearTasks);
    // Filter task Event
    filter.addEventListener('keyup', filterTasks);

}
// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to the li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}
// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Store Task in LocalStorage
    storeTaskInLocalStorage(taskInput.value);
    // Clear Input
    taskInput.value = '';

    e.preventDefault();
}
// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clearTasks
function clearTasks() {
    // taskList.innerHTML = '';
    //Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}
// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}
// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
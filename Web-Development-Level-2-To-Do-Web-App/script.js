// =========================
// Select Elements
// =========================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");
const errorMessage = document.getElementById("errorMessage");

const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedButton =
    document.getElementById("clearCompleted");


// =========================
// Tasks Data
// =========================

let tasks = [];

let currentFilter = "all";


// =========================
// Load Tasks from LocalStorage
// =========================

const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}


// =========================
// Add Task
// =========================

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();


    // Check empty input
    if (taskText === "") {

        errorMessage.textContent =
            "Please enter a task.";

        taskInput.focus();

        return;
    }


    // Create new task
    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array
    tasks.push(newTask);


    // Clear input
    taskInput.value = "";

    errorMessage.textContent = "";


    // Render tasks
    renderTasks();

});


// =========================
// Render Tasks
// =========================

function renderTasks() {

    // Clear current list
    taskList.innerHTML = "";


    // Filter tasks
    let filteredTasks = tasks;


    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function (task) {

            return !task.completed;

        });

    }


    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function (task) {

            return task.completed;

        });

    }


    // Show Empty State
    if (filteredTasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }


    // Create Task Elements
    filteredTasks.forEach(function (task) {

        const taskItem = document.createElement("div");

        taskItem.className = "task-item";


        // Add completed class
        if (task.completed) {

            taskItem.classList.add("completed");

        }


        // =========================
        // Checkbox
        // =========================

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        // =========================
        // Task Text
        // =========================

        const taskText = document.createElement("p");

        taskText.className = "task-text";

        taskText.textContent = task.text;


        // =========================
        // Delete Button
        // =========================

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "🗑️";

        deleteButton.setAttribute(
            "aria-label",
            "Delete task"
        );


        // =========================
        // Complete Task
        // =========================

        checkbox.addEventListener(
            "change",
            function () {

                task.completed = checkbox.checked;

                renderTasks();

            }
        );


        // =========================
        // Delete Task
        // =========================

        deleteButton.addEventListener(
            "click",
            function () {

                tasks = tasks.filter(function (item) {

                    return item.id !== task.id;

                });

                renderTasks();

            }
        );


        // =========================
        // Add Elements
        // =========================

        taskItem.appendChild(checkbox);

        taskItem.appendChild(taskText);

        taskItem.appendChild(deleteButton);


        // Add task to list
        taskList.appendChild(taskItem);

    });


    // Update counter
    updateTaskCount();


    // Save tasks
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// =========================
// Update Task Counter
// =========================

function updateTaskCount() {

    const activeTasks = tasks.filter(function (task) {

        return !task.completed;

    });


    taskCount.textContent = activeTasks.length;

}


// =========================
// Filters
// =========================

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {


        // Remove active class
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active class
        button.classList.add("active");


        // Get selected filter
        currentFilter = button.dataset.filter;


        // Render filtered tasks
        renderTasks();

    });

});


// =========================
// Clear Completed Tasks
// =========================

clearCompletedButton.addEventListener(
    "click",
    function () {

        tasks = tasks.filter(function (task) {

            return !task.completed;

        });

        renderTasks();

    }
);


// =========================
// Initial Render
// =========================

renderTasks();
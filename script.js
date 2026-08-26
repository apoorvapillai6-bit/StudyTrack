// ================================
// StudyTrack - JavaScript
// ================================

const taskCount = document.getElementById("task-count");
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");


// ================================
// Save tasks to localStorage
// ================================

function saveTasks() {

    const tasks = [];

    const taskElements = taskList.getElementsByTagName("li");

    for (let task of taskElements) {

        tasks.push({
            text: task.textContent,
            completed: task.classList.contains("completed")
        });

    }

    localStorage.setItem("studytrackTasks", JSON.stringify(tasks));
}


// ================================
// Load tasks from localStorage
// ================================

function loadTasks() {

    const savedTasks = localStorage.getItem("studytrackTasks");

    if (!savedTasks) {
        return;
    }

    // Remove the tasks already written in HTML
    taskList.innerHTML = "";

    const tasks = JSON.parse(savedTasks);
    
    for (let taskData of tasks) {

        const newTask = document.createElement("li");

        newTask.textContent = taskData.text;

        if (taskData.completed) {
            newTask.classList.add("completed");
        }

        newTask.addEventListener("click", function () {

            completeTask(newTask);

        });

        taskList.appendChild(newTask);
    }
}


// ================================
// Update task count
// ================================

function updateTaskCount() {

    const tasks = taskList.getElementsByTagName("li");

    taskCount.textContent = tasks.length;
}


// ================================
// Complete a task
// ================================

function completeTask(task) {

    task.classList.toggle("completed");

    saveTasks();
}


// ================================
// Add a new task
// ================================

function addTask() {

    const taskText = newTaskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = document.createElement("li");

    newTask.textContent = taskText;

    // Allow the new task to be completed
    newTask.addEventListener("click", function () {

        completeTask(newTask);

    });

    taskList.appendChild(newTask);

    newTaskInput.value = "";

    updateTaskCount();

    saveTasks();
}


// ================================
// Add click events to existing tasks
// ================================

const existingTasks = taskList.getElementsByTagName("li");

for (let task of existingTasks) {

    task.addEventListener("click", function () {

        completeTask(task);

    });

}


// ================================
// Add Task button
// ================================

addTaskButton.addEventListener("click", addTask);


// ================================
// Load saved tasks
// ================================

loadTasks();


// ================================
// Initial task count
// ================================

updateTaskCount();
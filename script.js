// ================================
// StudyTrack - JavaScript
// ================================

const taskCount = document.getElementById("task-count");
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");


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
// Initial task count
// ================================

updateTaskCount();
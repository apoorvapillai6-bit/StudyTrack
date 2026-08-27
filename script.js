// ================================
// StudyTrack - JavaScript
// ================================

const taskCount = document.getElementById("task-count");
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const studyHours = document.getElementById("study-hours");
const studyTimeInput = document.getElementById("study-time");
const addStudyTimeButton = document.getElementById("add-study-time");
const expenses = document.getElementById("expenses");
const expenseAmountInput = document.getElementById("expense-amount");
const addExpenseButton = document.getElementById("add-expense");
const goal = document.getElementById("goal");
const goalProgressInput = document.getElementById("goal-progress");
const updateGoalButton = document.getElementById("update-goal");

// ================================
// Save tasks to localStorage
// ================================

function saveTasks() {

    const tasks = [];

    const taskElements = taskList.getElementsByTagName("li");

    for (let task of taskElements) {

        tasks.push({
            text: task.querySelector("span").textContent,
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

        // Create task text
        const taskText = document.createElement("span");
        taskText.textContent = taskData.text;

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";

        // Delete the task
        deleteButton.addEventListener("click", function (event) {

            event.stopPropagation();

            newTask.remove();

            updateTaskCount();

            saveTasks();
        });

        newTask.appendChild(taskText);
        newTask.appendChild(deleteButton);

        // Complete the task
        newTask.addEventListener("click", function () {

            completeTask(newTask);

        });

        if (taskData.completed) {
            newTask.classList.add("completed");
        }

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

    // Create task text
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";

    // Delete the task
    deleteButton.addEventListener("click", function (event) {

        event.stopPropagation();

        newTask.remove();

        updateTaskCount();

        saveTasks();
    });

    newTask.appendChild(taskTextElement);
    newTask.appendChild(deleteButton);

    // Complete the task
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
// ================================
// Study Hours Tracker
// ================================

function addStudyTime() {

    const hours = parseFloat(studyTimeInput.value);

    if (isNaN(hours) || hours <= 0) {
        return;
    }

    const currentHours = parseFloat(
        studyHours.textContent.replace(" hrs", "")
    );

    const totalHours = currentHours + hours;

    studyHours.textContent = totalHours + " hrs";

localStorage.setItem("studytrackStudyHours", totalHours);

studyTimeInput.value = "";
}
function loadStudyHours() {

    const savedHours = localStorage.getItem("studytrackStudyHours");

    if (savedHours) {
        studyHours.textContent = savedHours + " hrs";
    }
}

loadStudyHours();

addStudyTimeButton.addEventListener("click", addStudyTime);
// ================================
// Expense Tracker
// ================================

function addExpense() {

    const amount = parseFloat(expenseAmountInput.value);

    if (isNaN(amount) || amount <= 0) {
        return;
    }

    const currentExpenses = parseFloat(
        expenses.textContent.replace("₹", "")
    );

    const totalExpenses = currentExpenses + amount;

    expenses.textContent = "₹" + totalExpenses;

    // Save expenses
    localStorage.setItem("studytrackExpenses", totalExpenses);

    expenseAmountInput.value = "";
}
function loadExpenses() {

    const savedExpenses = localStorage.getItem("studytrackExpenses");

    if (savedExpenses) {
        expenses.textContent = "₹" + savedExpenses;
    }
}

loadExpenses();
addExpenseButton.addEventListener("click", addExpense);
// ================================
// Goal Progress Tracker
// ================================

function updateGoal() {

    const progress = parseFloat(goalProgressInput.value);

    if (isNaN(progress) || progress < 0 || progress > 100) {
        return;
    }

    goal.textContent = progress + "%";

    // Save goal progress
    localStorage.setItem("studytrackGoal", progress);

    goalProgressInput.value = "";
}


function loadGoal() {

    const savedGoal = localStorage.getItem("studytrackGoal");

    if (savedGoal !== null) {
        goal.textContent = savedGoal + "%";
    }
}


loadGoal();

updateGoalButton.addEventListener("click", updateGoal);
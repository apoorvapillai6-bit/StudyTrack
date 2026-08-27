// ================================
// StudyTrack - JavaScript
// ================================


// ================================
// Dashboard Elements
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
// Statistics Elements
// ================================

const statStudyHours = document.getElementById("stat-study-hours");
const statTasks = document.getElementById("stat-tasks");
const statExpenses = document.getElementById("stat-expenses");
const statGoal = document.getElementById("stat-goal");


// ================================
// Update Statistics
// ================================

function updateStatistics() {

    statStudyHours.textContent = studyHours.textContent;

    statTasks.textContent = taskCount.textContent;

    statExpenses.textContent = expenses.textContent;

    statGoal.textContent = goal.textContent;
}


// ================================
// Update Task Count
// ================================

function updateTaskCount() {

    const tasks = taskList.getElementsByTagName("li");

    taskCount.textContent = tasks.length;
}


// ================================
// Save Tasks
// ================================

function saveTasks() {

    const tasks = [];

    const taskElements = taskList.getElementsByTagName("li");

    for (let task of taskElements) {

        const taskText = task.querySelector("span");

        tasks.push({

            text: taskText
                ? taskText.textContent
                : task.textContent,

            completed:
                task.classList.contains("completed")

        });
    }

    localStorage.setItem(
        "studytrackTasks",
        JSON.stringify(tasks)
    );
}


// ================================
// Create Task
// ================================

function createTask(taskText, completed = false) {

    const newTask = document.createElement("li");


    // Task Text

    const taskTextElement =
        document.createElement("span");

    taskTextElement.textContent =
        taskText;


    // Delete Button

    const deleteButton =
        document.createElement("button");

    deleteButton.textContent = "🗑️";


    // Delete Task

    deleteButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            newTask.remove();

            updateTaskCount();

            saveTasks();

            updateStatistics();
        }
    );


    // Complete Task

    newTask.addEventListener(
        "click",
        function () {

            completeTask(newTask);
        }
    );


    // Completed State

    if (completed) {

        newTask.classList.add(
            "completed"
        );
    }


    newTask.appendChild(
        taskTextElement
    );

    newTask.appendChild(
        deleteButton
    );


    return newTask;
}


// ================================
// Load Tasks
// ================================

function loadTasks() {

    const savedTasks =
        localStorage.getItem(
            "studytrackTasks"
        );


    if (!savedTasks) {

        return;
    }


    // Remove HTML tasks

    taskList.innerHTML = "";


    const tasks =
        JSON.parse(savedTasks);


    for (let taskData of tasks) {

        const newTask =
            createTask(

                taskData.text,

                taskData.completed

            );


        taskList.appendChild(
            newTask
        );
    }
}


// ================================
// Complete Task
// ================================

function completeTask(task) {

    task.classList.toggle(
        "completed"
    );


    saveTasks();

    updateStatistics();
}


// ================================
// Add Task
// ================================

function addTask() {

    const taskText =
        newTaskInput.value.trim();


    if (taskText === "") {

        return;
    }


    const newTask =
        createTask(taskText);


    taskList.appendChild(
        newTask
    );


    newTaskInput.value = "";


    updateTaskCount();

    saveTasks();

    updateStatistics();
}


// ================================
// Study Hours Tracker
// ================================

function addStudyTime() {

    const hours =
        parseFloat(
            studyTimeInput.value
        );


    if (

        isNaN(hours) ||

        hours <= 0

    ) {

        return;
    }


    const currentHours =
        parseFloat(

            studyHours.textContent
                .replace(" hrs", "")

        );


    const totalHours =
        currentHours + hours;


    studyHours.textContent =
        totalHours + " hrs";


    localStorage.setItem(

        "studytrackStudyHours",

        totalHours

    );


    studyTimeInput.value = "";


    updateStatistics();
}


function loadStudyHours() {

    const savedHours =
        localStorage.getItem(
            "studytrackStudyHours"
        );


    if (savedHours !== null) {

        studyHours.textContent =
            savedHours + " hrs";
    }
}


// ================================
// Expense Tracker
// ================================

function addExpense() {

    const amount =
        parseFloat(
            expenseAmountInput.value
        );


    if (

        isNaN(amount) ||

        amount <= 0

    ) {

        return;
    }


    const currentExpenses =
        parseFloat(

            expenses.textContent
                .replace("₹", "")

        );


    const totalExpenses =
        currentExpenses + amount;


    expenses.textContent =
        "₹" + totalExpenses;


    localStorage.setItem(

        "studytrackExpenses",

        totalExpenses

    );


    expenseAmountInput.value = "";


    updateStatistics();
}


function loadExpenses() {

    const savedExpenses =
        localStorage.getItem(
            "studytrackExpenses"
        );


    if (savedExpenses !== null) {

        expenses.textContent =
            "₹" + savedExpenses;
    }
}


// ================================
// Goal Progress Tracker
// ================================

function updateGoal() {

    const progress =
        parseFloat(
            goalProgressInput.value
        );


    if (

        isNaN(progress) ||

        progress < 0 ||

        progress > 100

    ) {

        return;
    }


    goal.textContent =
        progress + "%";


    localStorage.setItem(

        "studytrackGoal",

        progress

    );


    goalProgressInput.value = "";


    updateStatistics();
}


function loadGoal() {

    const savedGoal =
        localStorage.getItem(
            "studytrackGoal"
        );


    if (savedGoal !== null) {

        goal.textContent =
            savedGoal + "%";
    }
}


// ================================
// Event Listeners
// ================================

addTaskButton.addEventListener(
    "click",
    addTask
);


addStudyTimeButton.addEventListener(
    "click",
    addStudyTime
);


addExpenseButton.addEventListener(
    "click",
    addExpense
);


updateGoalButton.addEventListener(
    "click",
    updateGoal
);


// ================================
// Load Saved Data
// ================================

loadTasks();

loadStudyHours();

loadExpenses();

loadGoal();


// ================================
// Initial Dashboard Update
// ================================

updateTaskCount();

updateStatistics();
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");

    // div to hold the task text and icons
    let taskContent = document.createElement("div");
    taskContent.className = "task-content";

    // Task text
    let taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = inputBox.value;
    taskContent.appendChild(taskText);

    // Edit icon
    let editIcon = document.createElement("span");
    editIcon.className = "edit-icon";
    editIcon.innerHTML = "✎"; // Pencil emoji for edit
    editIcon.onclick = function () {
      editTask(taskText);
    };
    taskContent.appendChild(editIcon);

    // Delete icon
    let deleteIcon = document.createElement("span");
    deleteIcon.className = "delete-icon";
    deleteIcon.innerHTML = "×"; // Cross for delete
    deleteIcon.onclick = function () {
      li.remove();
      saveData();
    };
    taskContent.appendChild(deleteIcon);

    li.appendChild(taskContent);
    listContainer.appendChild(li);
  }

  inputBox.value = "";
  saveData();
}

function editTask(taskText) {
  let updatedText = prompt("Edit your task:", taskText.textContent);
  if (updatedText !== null && updatedText.trim() !== "") {
    taskText.textContent = updatedText;
    saveData();
  }
}

function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("tasks") || "";

  // Reassign delete and edit functionalities to loaded tasks
  let tasks = listContainer.querySelectorAll("li");
  tasks.forEach((task) => {
    let deleteIcon = task.querySelector(".delete-icon");
    deleteIcon.onclick = function () {
      task.remove();
      saveData();
    };

    let editIcon = task.querySelector(".edit-icon");
    let taskText = task.querySelector(".task-text");
    editIcon.onclick = function () {
      editTask(taskText);
    };
  });
}

showTasks();

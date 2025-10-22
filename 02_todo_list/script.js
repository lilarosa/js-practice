// 🗒️ To-Do List
// 🇩🇪 Aufgabenliste  ·  🇨🇳 待办清单  ·  🇬🇧 Manage your tasks easily

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

// 🇬🇧 Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// 🇬🇧 Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  const task = { text: taskText, completed: false };
  tasks.push(task);
  taskInput.value = "";
  saveAndRender();
});

// 🇬🇧 Click to toggle completion
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const index = e.target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
  } else if (e.target.classList.contains("delete")) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    saveAndRender();
  }
});

// 🇬🇧 Clear all tasks
clearBtn.addEventListener("click", () => {
  tasks = [];
  saveAndRender();
});

// 🇬🇧 Save to localStorage and update list
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// 🇬🇧 Render tasks in <ul>
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.index = index;
    if (task.completed) li.classList.add("completed");

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.classList.add("delete");
    delBtn.dataset.index = index;

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
  clearBtn.classList.toggle("hidden", tasks.length === 0);
}

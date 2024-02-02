function appendTask() {
  console.log("appendTask");
  input = document.getElementById("InputField");

  if (input.value === "") {
    alert("Please enter a task");
    return;
  }

  tasks = localStorage.getItem("tasks");
  if (tasks === null) {
    tasks = {};
  } else {
    tasks = JSON.parse(tasks);
  }

  task = {
    task: input.value,
    isCompleted: false,
  };

  tasks[createID()] = task;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTask(task);

  input.value = "";
}

const createID = () => {
  return Math.random().toString(36).substr(2, 9);
};

function loadTasks() {
  console.log("loadTasks");
  tasks = localStorage.getItem("tasks");
  if (tasks === null) {
    return;
  }
  tasks = JSON.parse(tasks);

  for (task in tasks) {
    addTask(tasks[task], task);
  }
}

function addTask(task, id) {
  const ul = document.getElementById("taskList");
  const li = document.createElement("li");
  const span = document.createElement("span");

  if (task.isCompleted) {
    span.style.textDecoration = "line-through";
  }
  const btn = document.createElement("button");
  btn.innerHTML = task.isCompleted ? "Uncomplete" : "Complete";
  btn.style.marginLeft = "auto";
  btn.onclick = function () {
    task.isCompleted = !task.isCompleted;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (task.isCompleted) {
      span.style.textDecoration = "line-through";
      btn.innerHTML = "Uncomplete";
    } else {
      span.style.textDecoration = "none";
      btn.innerHTML = "Complete";
      // btn.style.textDecoration = "none";
    }

    // btn.remove();
  };
  span.appendChild(document.createTextNode(task.task));
  li.appendChild(span);
  li.appendChild(btn);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "X";
  deleteBtn.style.marginLeft = "left";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = function () {
    deleteTask(id);
    li.remove();
  };
  li.append(deleteBtn);
  ul.appendChild(li);
}

const deleteTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  delete tasks[id];
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

loadTasks();

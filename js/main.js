const input = document.getElementById("inputTask");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector("#taskList");

const renderTask = (text, completed = false) => {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.textContent = text;
  if (completed) span.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "\u00d7";
  deleteBtn.classList.add("deleteBtn");

  li.append(checkbox, span, deleteBtn);
  taskList.append(li);

  checkbox.addEventListener("change", () => {
    span.classList.toggle("completed");
    saveTask();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTask();
  });
};

const addTask = () => {
  if (input.value.trim() === "") return;
  renderTask(input.value);
  input.value = "";
  saveTask();
};

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTask();
});

const saveTask = () => {
  const tasks = [...taskList.children].map((li) => ({
    text: li.querySelector("span").textContent,
    completed: li.querySelector("input").checked,
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const saved = JSON.parse(localStorage.getItem("tasks")) || [];
saved.forEach((task) => renderTask(task.text, task.completed));

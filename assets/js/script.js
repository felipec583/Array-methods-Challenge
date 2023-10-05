const taskInput = document.querySelector("#task");
const totalTasksCount = document.querySelector(".total-tasks");
const completedTasksCount = document.querySelector(".task-done");
const taskInfoContainer = document.querySelector(".rows");
const addTaskButton = document.querySelector(".add-btn");
let counter = 4;
const taskCounter = createElement("span", "task-counter");
totalTasksCount.append(taskCounter);
const completedTaskCounter = createElement("span", "completed-task-counter");
completedTasksCount.append(completedTaskCounter);

function createElement(ele, eleClass = "") {
  const elem = document.createElement(`${ele}`);
  elem.classList.add(`${eleClass}`);
  return elem;
}

const tasks = [
  { id: 1, task: "buy groceries", completed: false, isInEditionMode: false },
  {
    id: 2,
    task: "run morning errands",
    completed: false,
    isInEditionMode: false,
  },
  { id: 3, task: "walk my dog", completed: false, isInEditionMode: false },
];
const countTasks = () => {
  taskCounter.innerHTML = ` ${tasks.length}`;
};
const renderTaskRow = () => {
  let htmlCont = "";
  tasks.forEach((task) => {
    const checkInput = task.completed
      ? `<input type="checkbox" checked class="task-check"/>`
      : `<input type="checkbox" class="task-check"/>`;
    const checkedText =
      task.completed && !task.isInEditionMode
        ? `<p class="task completed">${task.task}</p> 
      <button class="edit">Edit</button>`
        : `<p class="task">${task.task}</p><button class="edit">Edit</button>`;
    const editionMode = task.isInEditionMode
      ? `<input class="new-input" type="text">
        <button class="edit">Save</button>
        <button class="cancel-btn">Cancel</button>`
      : `${checkedText} ${checkInput}`;
    htmlCont += `<div id="${task.id}" class="task-row">
      <span>${task.id}</span> 
      ${editionMode}
      <span class="del-btn">&#x274C;</span>
    </div>`;
  });
  countTasks();
  taskInfoContainer.innerHTML = htmlCont;
};
renderTaskRow();

function generateId() {
  if (tasks.length === 0) {
    counter = 1;
  }
  const id = counter;
  ++counter;
  return id;
}

addTaskButton.addEventListener("click", (e) => {
  const taskInputValue = taskInput.value;
  /*  let newId = Math.floor(Math.random() * Date.now());
  newId = +newId.toString().substring(0, 3); */

  const newTask = { id: generateId(), task: taskInputValue, completed: false };
  if (taskInputValue !== "") {
    tasks.push(newTask);
    taskInput.value = "";
    console.log(tasks);
    console.log(counter);

    renderTaskRow();
  }
});

const changeTaskStatusAndTaskText = (arr, id, e) => {
  const ind = arr.find((elem) => elem.id === id);
  const text = e.target.previousElementSibling.previousElementSibling;
  if (ind && e.target.checked) {
    ind.completed = true;
    text.classList.add("completed");
  } else {
    ind.completed = false;
    text.classList.remove("completed");
  }
};

const countCompletedTasks = () => {
  let count = 0;
  tasks.forEach((task) => {
    if (task.completed) ++count;
  });
  completedTaskCounter.innerHTML = `${count}`;
};

const deleteItems = (arr, id) => {
  const ind = arr.findIndex((element) => element.id === id);
  arr.splice(ind, 1);
  renderTaskRow();
};

document.addEventListener("click", (e) => {
  const getId = +e.target.parentElement.getAttribute("id");

  if (e.target.classList.contains("del-btn")) {
    deleteItems(tasks, getId);
    countCompletedTasks();
  }
  if (e.target.classList.contains("task-check")) {
    changeTaskStatusAndTaskText(tasks, getId, e);
    countCompletedTasks();
  }
  if (e.target.classList.contains("edit")) {
    changeToEditionMode(tasks, getId, e);
    e.target.textContent = "Save";
    const cancelButton = createElement("button", "cancel-btn");
    cancelButton.textContent = "Cancel";
    const editButton = document.querySelectorAll(".edit");
    const inputText = createElement("input", "new-input");
    inputText.setAttribute("type", "text");
    const taskText = document.querySelectorAll(".task");

    editButton.forEach((button) => {
      if (
        e.target === button &&
        e.target.textContent === "Save" &&
        !button.nextElementSibling.classList.contains("cancel-btn")
      ) {
        button.insertAdjacentElement("afterend", cancelButton);
      }
    });

    console.log(taskText);
    taskText.forEach((text) => {
      if (text.textContent === e.target.previousElementSibling.textContent) {
        text.replaceWith(inputText);
      }
    });
  }
  if (e.target.textContent === "Save") {
    const newInputValue = e.target.previousElementSibling.value;
    if (newInputValue !== "") {
      changeText(tasks, getId, newInputValue);
      renderTaskRow();
    }
  }
  if (e.target.textContent === "Cancel") {
    changeToEditionMode(tasks, getId, e);
    renderTaskRow();
  }
});

function changeText(arr, id, value) {
  const findInd = arr.find((el) => el.id === id);
  console.log(findInd);
  findInd.task = value;
}

function changeToEditionMode(arr, id, e) {
  const findInd = arr.find((el) => el.id === id);
  findInd.isInEditionMode = true;
  if (e.target.textContent === "Save" || e.target.textContent === "Cancel") {
    findInd.isInEditionMode = false;
  }
}

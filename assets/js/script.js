const taskInput = document.querySelector("#task");
const totalTasksCount = document.querySelector(".total-tasks");
const completedTasksCount = document.querySelector(".task-done");
const taskInfoContainer = document.querySelector(".rows");
const addTaskButton = document.querySelector(".add-btn");
let counter = 4;
const taskCounter = document.createElement("span");
totalTasksCount.append(taskCounter);
taskCounter.classList.add("task-counter");

const completedTaskCounter = document.createElement("span");
completedTasksCount.append(completedTaskCounter);
completedTaskCounter.classList.add("completed-task-counter");

const tasks = [
  { id: 1, task: "buy groceries", completed: false },
  { id: 2, task: "run morning errands", completed: false },
  { id: 3, task: "walk my dog", completed: false },
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
    const checkedText = task.completed
      ? `<p class="task completed">${task.task}</p>`
      : `<p class="task">${task.task}</p>`;
    htmlCont += `<div id="${task.id}" class="task-row">
      <span>${task.id}</span> 
      ${checkedText}
      ${checkInput}
      <span class="del-btn">&#x274C;</span>
    </div>`;
  });
  countTasks();
  taskInfoContainer.innerHTML = htmlCont;
};
renderTaskRow();

function generateId() {
  const id = counter;
  counter++;
  return id;
}

addTaskButton.addEventListener("click", (e) => {
  const taskInputValue = taskInput.value;
  const newTask = { id: generateId(), task: taskInputValue, completed: false };
  if (taskInputValue !== "") {
    tasks.push(newTask);
    taskInput.value = "";
    renderTaskRow();
  }
});

const changeTaskStatusAndTaskText = (arr, id, e) => {
  const ind = arr.find((elem) => elem.id === id);
  const text = e.target.previousElementSibling;
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
  console.log(count);
};

const deleteItems = (arr, id) => {
  const ind = arr.findIndex((element) => element.id === id);
  arr.splice(ind, 1);
  renderTaskRow();
};

document.addEventListener("click", (e) => {
  /*   const checkBoxes = document.querySelectorAll(".task-check"); */
  const getId = +e.target.parentElement.getAttribute("id");
  if (e.target.classList.contains("del-btn")) {
    deleteItems(tasks, getId);
    countCompletedTasks();
  }
  if (e.target.classList.contains("task-check")) {
    changeTaskStatusAndTaskText(tasks, getId, e);
    countCompletedTasks();
    console.log(tasks);
  }
});

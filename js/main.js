// select element
const taskInput = document.getElementById("task-input")
const addBtn = document.getElementById("add-btn")
const taskList = document.getElementById("task-list")

// function to load tasks from local storage
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []
  tasks.forEach(t => addTaskToDom(t))
}

// function to save tasks to local storage
const saveTasks = () => {
  const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent)
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// function to add a task to the DOM
const addTaskToDom = (taskText) => {
  const spanText = document.createElement('span')
  spanText.textContent = taskText

  // create list item
  const li = document.createElement('li')
  li.appendChild(spanText)

  // create delete button
  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = "X"
  deleteBtn.classList.add("delete-btn")

  // add delete function
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li)
    saveTasks()
  })

  li.appendChild(deleteBtn)
  taskList.appendChild(li)
}

// functin to handle adding task
const addTask = () => {
  const taskText = taskInput.value.trim()
  if (taskText === "") {
    alert("Please Enter Text")
    return
  }

  addTaskToDom(taskText)

  saveTasks()

  // clear input field
  taskInput.value = ""
}

// add event listener to add button
addBtn.addEventListener("click", addTask)

// add event listener enter key
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask()
  }
})

// load tasks on page
document.addEventListener("DOMContentLoaded", loadTasks)
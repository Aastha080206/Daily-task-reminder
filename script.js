const form = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const alarmSound = document.getElementById('alarmSound');
const customAlert = document.getElementById('customAlert');
const alertText = document.getElementById('alertText');
let tasks = [];

// Add new task
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskName = document.getElementById('taskName').value.trim();
  const taskTime = document.getElementById('taskTime').value;

  if (taskName && taskTime) {
    const task = { name: taskName, time: taskTime };
    tasks.push(task);
    renderTasks();
    form.reset();
  }
});

// Display a single task with emoji icons
function displayTask(task, index) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${task.time}</strong> - ${task.name}
    <button class="editBtn" data-index="${index}" title="Edit">📝</button>
    <button class="deleteBtn" data-index="${index}" title="Delete">❌</button>
  `;
  taskList.appendChild(li);
}

// Render all tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => displayTask(task, index));
}

// Custom alert box
function showCustomAlert(message) {
  alertText.textContent = "⏰ Reminder: " + message;
  customAlert.style.display = "flex";
  alarmSound.currentTime = 0;
  alarmSound.play();
}

// Close alert and stop alarm
function closeAlert() {
  customAlert.style.display = "none";
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

// Check the time every second
setInterval(() => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

  tasks.forEach(task => {
    if (task.time === currentTime) {
      showCustomAlert(task.name);
      tasks = tasks.filter(t => t !== task);
      renderTasks();
    }
  });
}, 1000);

// Edit/Delete handlers
taskList.addEventListener('click', function (e) {
  const index = e.target.dataset.index;
  if (e.target.classList.contains('deleteBtn')) {
    tasks.splice(index, 1);
    renderTasks();
  }
  if (e.target.classList.contains('editBtn')) {
    const task = tasks[index];
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskTime').value = task.time;
    tasks.splice(index, 1); // remove from list
    renderTasks();
  }
});

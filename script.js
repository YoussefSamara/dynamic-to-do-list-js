// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', function() {
  // Select the DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
      const taskText = taskInput.value.trim();  // Get and trim task input

      // Check if task is not empty
      if (taskText === '') {
          alert('Please enter a task.');
          return;
      }

      // Create a new list item (li) element
      const li = document.createElement('li');
      li.textContent = taskText;

      // Create a remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      
      // Use classList.add to assign the 'remove-btn' class
      removeButton.classList.add('remove-btn');
      
      // Event listener to remove the task when button is clicked
      removeButton.addEventListener('click', function() {
          li.remove();  // Remove the task
      });

      // Append the remove button to the list item
      li.appendChild(removeButton);

      // Append the list item to the task list
      taskList.appendChild(li);

      // Clear the input field
      taskInput.value = '';
  }

  // Event listener for the 'Add Task' button
  addButton.addEventListener('click', addTask);

  // Event listener for the 'Enter' key to add task
  taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          addTask();
      }
  });
});

// Function to load tasks from Local Storage and display them
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
}

// Add Task function
function addTask(taskText, save = true) {
  if (taskText.trim() === '') {
      alert('Please enter a task');
      return;
  }

  // Create task list item
  const li = document.createElement('li');
  li.textContent = taskText;

  // Create remove button for the task
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('remove-btn');
  removeBtn.onclick = function () {
      li.remove(); // Remove task from DOM
      removeTaskFromStorage(taskText); // Remove task from Local Storage
  };

  // Append the remove button to the task list item
  li.appendChild(removeBtn);
  
  // Append the task list item to the task list
  document.getElementById('task-list').appendChild(li);

  // Save task to Local Storage if necessary
  if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Clear the input field
  document.getElementById('task-input').value = '';
}

// Function to remove a task from Local Storage
function removeTaskFromStorage(taskText) {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updatedTasks = storedTasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Event listener for adding a task when the 'Add Task' button is clicked
document.getElementById('add-task-btn').addEventListener('click', () => {
  const taskText = document.getElementById('task-input').value;
  addTask(taskText);
});

// Event listener for adding a task when pressing 'Enter'
document.getElementById('task-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      const taskText = document.getElementById('task-input').value;
      addTask(taskText);
  }
});

// Load tasks from Local Storage when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

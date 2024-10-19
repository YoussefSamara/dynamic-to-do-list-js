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

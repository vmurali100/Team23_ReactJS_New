// Task Management Object
const taskManager = {
    tasks: {
      pending: [],
      inProgress: [],
      completed: []
    },
  
    addTask(title) {
      this.tasks.pending.push({ id: Date.now(), title });
      renderTasks();
    },
  
    moveTask(taskId, fromCategory, toCategory) {
      const taskIndex = this.tasks[fromCategory].findIndex(task => task.id === taskId);
      if (taskIndex > -1) {
        const [task] = this.tasks[fromCategory].splice(taskIndex, 1);
  
        // Prevent modifications to completed tasks
        if (toCategory === 'completed') {
          Object.freeze(task);
        }
  
        this.tasks[toCategory].push(task);
        renderTasks();
      }
    }
  };
  
  // Add New Task
  document.getElementById("addTask").addEventListener("click", () => {
    const taskTitle = document.getElementById("taskTitle").value;
  
    if (taskTitle.trim()) {
      taskManager.addTask(taskTitle);
      document.getElementById("taskTitle").value = ""; // Clear input
    } else {
      alert("Task title cannot be empty!");
    }
  });
  
  // Render Tasks
  function renderTasks() {
    // Clear current tasks
    document.getElementById("pendingTasks").innerHTML = "";
    document.getElementById("inProgressTasks").innerHTML = "";
    document.getElementById("completedTasks").innerHTML = "";
  
    // Render each category
    Object.keys(taskManager.tasks).forEach(category => {
      const container = document.getElementById(`${category}Tasks`);
      taskManager.tasks[category].forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = "p-4 bg-gray-200 rounded-lg flex justify-between items-center";
  
        taskElement.innerHTML = `
          <span>${task.title}</span>
          <div>
            ${category !== "pending" ? `<button onclick="moveTask(${task.id}, '${category}', 'pending')" class="bg-gray-500 text-white px-2 py-1 rounded-lg hover:bg-gray-600 mr-2">Pending</button>` : ""}
            ${category !== "inProgress" ? `<button onclick="moveTask(${task.id}, '${category}', 'inProgress')" class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 mr-2">In-Progress</button>` : ""}
            ${category !== "completed" ? `<button onclick="moveTask(${task.id}, '${category}', 'completed')" class="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600">Completed</button>` : ""}
          </div>
        `;
  
        container.appendChild(taskElement);
      });
    });
  }
  
  // Move Task Between Categories
  function moveTask(taskId, fromCategory, toCategory) {
    taskManager.moveTask(taskId, fromCategory, toCategory);
  }
  
// Task categories
const categories = {
    pending: [],
    inProgress: [],
    completed: [],
  };
  
  // IndexedDB setup
  const dbRequest = indexedDB.open("TaskManagementDB", 1);
  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
  };
  
  const saveToIndexedDB = (task) => {
    const db = dbRequest.result;
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    store.add(task);
  };
  
  // Render tasks dynamically
  const renderTasks = () => {
    document.getElementById("pending-tasks").innerHTML = categories.pending
      .map(
        (task, index) =>
          `<div class="p-2 border rounded bg-gray-100 flex justify-between">
            <span>${task.name}</span>
            <button class="text-blue-500" onclick="moveTask(${index}, 'pending', 'inProgress')">Start</button>
          </div>`
      )
      .join("");
  
    document.getElementById("in-progress-tasks").innerHTML = categories.inProgress
      .map(
        (task, index) =>
          `<div class="p-2 border rounded bg-gray-100 flex justify-between">
            <span>${task.name}</span>
            <button class="text-green-500" onclick="moveTask(${index}, 'inProgress', 'completed')">Complete</button>
          </div>`
      )
      .join("");
  
    document.getElementById("completed-tasks").innerHTML = categories.completed
      .map(
        (task) =>
          `<div class="p-2 border rounded bg-gray-100">
            <span>${task.name}</span>
          </div>`
      )
      .join("");
  };
  
  // Add task
  document.getElementById("add-task-btn").addEventListener("click", () => {
    const taskName = document.getElementById("task-name").value;
    if (taskName) {
      const task = { name: taskName, status: "pending" };
      categories.pending.push(task);
      saveToIndexedDB(task);
      renderTasks();
      document.getElementById("task-name").value = "";
    }
  });
  
  // Move task between categories
  const moveTask = (index, fromCategory, toCategory) => {
    const task = categories[fromCategory].splice(index, 1)[0];
    task.status = toCategory;
    categories[toCategory].push(task);
    renderTasks();
  };
  
  // Generators for pagination
  function* paginateTasks(tasks, pageSize) {
    for (let i = 0; i < tasks.length; i += pageSize) {
      yield tasks.slice(i, i + pageSize);
    }
  }
  
  // Fetch and update tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      data.slice(0, 10).forEach((task) => {
        categories.pending.push({ name: task.title, status: "pending" });
      });
      renderTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  // Offline task management
  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    const transaction = db.transaction("tasks", "readonly");
    const store = transaction.objectStore("tasks");
    const tasks = [];
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        tasks.push(cursor.value);
        categories[cursor.value.status].push(cursor.value);
        cursor.continue();
      } else {
        renderTasks();
      }
    };
  };
  
  // Initial render
  document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();
  });
  
// User Class
class User {
    constructor(name, email, role) {
      this.id = Date.now(); // Unique ID
      this.name = name;
      this.email = email;
      this.role = role;
      this.preferences = { theme: "light", notifications: true };
    }
  
    updatePreferences(newPreferences) {
      this.preferences = { ...this.preferences, ...newPreferences };
    }
  }
  
  // User Management
  const users = [];
  
  // Add User
  document.getElementById("addUser").addEventListener("click", () => {
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const role = document.getElementById("userRole").value;
  
    if (name && email) {
      const newUser = new User(name, email, role);
      users.push(newUser);
      renderUsers();
      document.getElementById("userName").value = "";
      document.getElementById("userEmail").value = "";
    } else {
      alert("Please enter valid user details.");
    }
  });
  
  // Render Users
  function renderUsers() {
    const userProfiles = document.getElementById("userProfiles");
    userProfiles.innerHTML = ""; // Clear existing users
  
    users.forEach(user => {
      const userElement = document.createElement("div");
      userElement.className = "bg-white shadow-md rounded-lg p-6";
  
      userElement.innerHTML = `
        <h3 class="text-xl font-semibold">${user.name}</h3>
        <p class="text-gray-600">Email: ${user.email}</p>
        <p class="text-gray-600">Role: ${user.role}</p>
        <p class="text-gray-600">Preferences: Theme - ${user.preferences.theme}, Notifications - ${user.preferences.notifications ? "On" : "Off"}</p>
        <button onclick="editPreferences(${user.id})" class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mt-4">
          Edit Preferences
        </button>
      `;
  
      userProfiles.appendChild(userElement);
    });
  }
  
  // Edit Preferences
  function editPreferences(userId) {
    const user = users.find(u => u.id === userId);
  
    if (user) {
      const newTheme = prompt("Enter new theme (light/dark):", user.preferences.theme) || user.preferences.theme;
      const newNotifications = confirm("Enable notifications?");
  
      user.updatePreferences({ theme: newTheme, notifications: newNotifications });
      renderUsers();
    }
  }
  
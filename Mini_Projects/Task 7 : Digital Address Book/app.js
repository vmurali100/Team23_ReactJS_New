// Contact Class
class Contact {
    constructor(name, email, phone) {
      this.id = Date.now(); // Unique ID
      this.name = name;
      this.email = email;
      this.phone = phone;
    }
  }
  
  // Address Book
  const addressBook = [];
  
  // Add Contact
  document.getElementById("addContact").addEventListener("click", () => {
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
  
    if (name && email && phone) {
      const newContact = new Contact(name, email, phone);
      addressBook.push(newContact);
      renderContacts();
      document.getElementById("contactName").value = "";
      document.getElementById("contactEmail").value = "";
      document.getElementById("contactPhone").value = "";
    } else {
      alert("Please fill in all fields.");
    }
  });
  
  // Render Contacts
  function renderContacts(filteredContacts = addressBook) {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = ""; // Clear existing contacts
  
    filteredContacts.forEach(contact => {
      const contactElement = document.createElement("div");
      contactElement.className = "bg-white shadow-md rounded-lg p-6";
  
      contactElement.innerHTML = `
        <h3 class="text-xl font-semibold">${contact.name}</h3>
        <p class="text-gray-600">Email: ${contact.email}</p>
        <p class="text-gray-600">Phone: ${contact.phone}</p>
        <div class="mt-4">
          <button onclick="editContact(${contact.id})" class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2">
            Edit
          </button>
          <button onclick="deleteContact(${contact.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Delete
          </button>
        </div>
      `;
  
      contactList.appendChild(contactElement);
    });
  }
  
  // Edit Contact
  function editContact(contactId) {
    const contact = addressBook.find(c => c.id === contactId);
    if (contact) {
      const newName = prompt("Enter new name:", contact.name) || contact.name;
      const newEmail = prompt("Enter new email:", contact.email) || contact.email;
      const newPhone = prompt("Enter new phone number:", contact.phone) || contact.phone;
  
      contact.name = newName;
      contact.email = newEmail;
      contact.phone = newPhone;
  
      renderContacts();
    }
  }
  
  // Delete Contact
  function deleteContact(contactId) {
    const contactIndex = addressBook.findIndex(c => c.id === contactId);
    if (contactIndex > -1) {
      addressBook.splice(contactIndex, 1);
      renderContacts();
    }
  }
  
  // Search Contacts
  document.getElementById("searchContact").addEventListener("input", () => {
    const query = document.getElementById("searchContact").value.trim().toLowerCase();
    const filteredContacts = addressBook.filter(
      contact => contact.name.toLowerCase().includes(query) || contact.email.toLowerCase().includes(query)
    );
    renderContacts(filteredContacts);
  });
  
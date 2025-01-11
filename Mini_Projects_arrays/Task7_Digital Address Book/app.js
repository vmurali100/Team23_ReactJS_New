const addressBook = {
    contacts: [],
    isEditing: false,
    editingEmail: null,
  
    // Handle Add or Update Contact
    handleContactForm(name, email, phone) {
      if (this.isEditing) {
        this.updateContact(name, email, phone);
      } else {
        this.addContact(name, email, phone);
      }
    },
  
    // Add a new contact
    addContact(name, email, phone) {
      const newContact = {
        id: Date.now(),
        name,
        email,
        phone,
      };
  
      this.contacts.push(newContact);
      this.renderContacts();
      this.resetForm();
    },
  
    // Update an existing contact
    updateContact(name, email, phone) {
      this.contacts = this.contacts.map(contact =>
        contact.email === this.editingEmail ? { ...contact, name, phone } : contact
      );
  
      this.renderContacts();
      this.resetForm();
    },
  
    // Delete a contact
    deleteContact(email) {
      this.contacts = this.contacts.filter(contact => contact.email !== email);
      this.renderContacts();
    },
  
    // Search contacts
    searchContacts(query) {
      query = query.toLowerCase();
      return this.contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query)
      );
    },
  
    // Sort contacts alphabetically by name
    sortContacts() {
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
      this.renderContacts();
    },
  
    // Render contact list
    renderContacts(contacts = this.contacts) {
      const contactList = document.getElementById("contactList");
      contactList.innerHTML = ""; // Clear existing list
  
      contacts.forEach(contact => {
        const contactDiv = document.createElement("div");
        contactDiv.className = "bg-white p-4 rounded shadow";
  
        contactDiv.innerHTML = `
          <p class="font-semibold">${contact.name}</p>
          <p class="text-sm text-gray-600">Email: ${contact.email}</p>
          <p class="text-sm text-gray-600">Phone: ${contact.phone}</p>
          <div class="mt-4">
            <button
              class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              onclick="addressBook.editContact('${contact.email}')"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onclick="addressBook.deleteContact('${contact.email}')"
            >
              Delete
            </button>
          </div>
        `;
  
        contactList.appendChild(contactDiv);
      });
    },
  
    // Edit a contact
    editContact(email) {
      const contact = this.contacts.find(contact => contact.email === email);
      if (contact) {
        document.getElementById("contactName").value = contact.name;
        document.getElementById("contactEmail").value = contact.email;
        document.getElementById("contactPhone").value = contact.phone;
        document.getElementById("contactEmail").setAttribute("readonly", "true");
        document.getElementById("contactSubmitButton").textContent = "Update Contact";
  
        this.isEditing = true;
        this.editingEmail = email;
      }
    },
  
    // Reset the form
    resetForm() {
      document.getElementById("contactName").value = "";
      document.getElementById("contactEmail").value = "";
      document.getElementById("contactPhone").value = "";
      document.getElementById("contactEmail").removeAttribute("readonly");
      document.getElementById("contactSubmitButton").textContent = "Add Contact";
  
      this.isEditing = false;
      this.editingEmail = null;
    },
  };
  
  // Handle Add / Update Contact form submission
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
  
    addressBook.handleContactForm(name, email, phone);
  });
  
  // Handle Search Input
  document.getElementById("searchInput").addEventListener("input", function (e) {
    const query = e.target.value.trim();
    const results = addressBook.searchContacts(query);
    addressBook.renderContacts(results);
  });
  
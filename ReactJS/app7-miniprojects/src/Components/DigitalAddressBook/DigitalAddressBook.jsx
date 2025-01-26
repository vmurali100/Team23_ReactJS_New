import React, { useEffect, useState } from "react";

const DigitalAddressBook = () => {
  const [address, setAddress] = useState({
    contactName: "",
    contactEmail: "",
  });
  const [isEdit, setisEdit] = useState(false);
  const [allContacts, setAllContacts] = useState([]);

  const handleChange = (e) => {
    const newAddress = { ...address };
    console.log(e.target.name);
    newAddress[e.target.name] = e.target.value;
    setAddress(newAddress);
  };

  const getAllContactsFromServer = async () => {
    const response = await fetch("http://localhost:3000/contacts");
    const data = await response.json();
    setAllContacts(data);
    console.log(data);
  };
  const postContactToServer = async () => {
    const response = await fetch("http://localhost:3000/contacts", {
      method: "POST",
      body: JSON.stringify(address),
      headers: { "Content-Type": "application/json" },
    });
    getAllContactsFromServer();
    setAddress({
        contactName: "",
    contactEmail: "",
    })

  };

  useEffect(() => {
    getAllContactsFromServer();
  }, []);
  const deleteContact = async (contact) => {
    const response = await fetch(
      "http://localhost:3000/contacts/" + contact.id,
      {
        method: "DELETE",
      }
    );
    getAllContactsFromServer();
  };
  const editContact = (contact) => {
    setAddress(contact);
    setisEdit(true);
  };

  const updateContactInServer = async() => {
    const response = await fetch("http://localhost:3000/contacts/"+address.id,{
        method:"PUT",
        body:JSON.stringify(address),
        headers: { "Content-Type": "application/json" },
    })
    setisEdit(false)
    setAddress({
        contactName: "",
    contactEmail: "",
    })
    getAllContactsFromServer()
  };

  const getSearchResults=(e)=>{
    console.log(e.target.value)
    const filteredContacts = allContacts.filter((contact)=>{
       return contact.contactName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || contact.contactEmail.indexOf(e.target.value) > -1
    })
    setAllContacts(filteredContacts)
    if(e.target.value == ""){
        getAllContactsFromServer()
    }
  }
  return (
    <div className="bg-gray-100 font-sans">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Digital Address Book
        </h1>

        <div className="mb-6">
          <input
            id="contactName"
            type="text"
            value={address.contactName}
            onChange={handleChange}
            placeholder="contactName"
            name="contactName"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <input
            id="contactEmail"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={address.contactEmail}
            name="contactEmail"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <button
            id="add-contact-btn"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={isEdit ? updateContactInServer : postContactToServer}
          >
            {isEdit ? "Update Contact" : "Add Contact"}
          </button>
        </div>

        <div className="mb-6">
          <input
            id="search"
            type="text"
            placeholder="Search contacts..."
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={getSearchResults}
          />
        </div>

        <div id="contacts-list" className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Contacts</h2>
          <div id="contacts" className="space-y-4">
            {allContacts.map((contact, i) => (
              <div key={i}>
                <div>
                  <p>
                    <strong>Name:</strong> ${contact.contactName}
                  </p>
                  <p>
                    <strong>Email:</strong> ${contact.contactEmail}
                  </p>
                </div>
                <div>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 m-2 rounded mb-2"
                    onClick={() => {
                      editContact(contact);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      deleteContact(contact);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalAddressBook;

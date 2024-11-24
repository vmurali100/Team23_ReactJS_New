import React, { Component } from "react";

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      editIndex: null,
      persons: [
        {
          username: "john_doe",
          email: "john.doe@example.com",
          password: "password123",
          confirmPassword: "password123",
        },
        {
          username: "jane_smith",
          email: "jane.smith@example.com",
          password: "qwerty456",
          confirmPassword: "qwerty456",
        },
        {
          username: "michael_brown",
          email: "michael.brown@example.com",
          password: "abc123",
          confirmPassword: "abc123",
        },
        {
          username: "lisa_white",
          email: "lisa.white@example.com",
          password: "securepass789",
          confirmPassword: "securepass789",
        },
        {
          username: "david_jones",
          email: "david.jones@example.com",
          password: "mypassword321",
          confirmPassword: "mypassword321",
        },
      ],
    };
  }

  handleChange = (e) => {
    console.log(e.target.name);
    const newPerson = { ...this.state.person };
    newPerson[e.target.name] = e.target.value;
    this.setState({ person: newPerson });
  };

  registerUser = () => {
    const newPersons = [...this.state.persons];
    newPersons.push(this.state.person);
    this.setState({ persons: newPersons });
    this.clearForm();
  };

  clearForm = () => {
    let newPerson = { ...this.state.person };
    newPerson = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.setState({ person: newPerson });
  };

  handleDelete = (i) => {
    console.log(i);
    // const newPersons = this.state.persons.filter((obj,index)=>{
    //     return index !== i
    // })
    // this.setState({persons :newPersons })

    const newPersons = [...this.state.persons];
    newPersons.splice(i, 1);
    this.setState({ persons: newPersons });
  };

  handleEdit = (per, i) => {
    this.setState({ editIndex: i, person: per });
  };

  updateUser = () => {
    const newPersons = [...this.state.persons];
    newPersons[this.state.editIndex] = this.state.person;
    this.setState({ persons: newPersons, editIndex: null });
    this.clearForm()
  };
  render() {
    return (
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div id="userform" style={{ width: "40%" }}>
          <h2>Registration Form</h2>
          <form>
            <div style={{ marginBottom: "10px" }}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
                value={this.state.person.username}
                onChange={this.handleChange}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
                value={this.state.person.email}
                onChange={this.handleChange}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
                value={this.state.person.password}
                onChange={this.handleChange}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
                value={this.state.person.confirmPassword}
                onChange={this.handleChange}
              />
            </div>
            {this.state.editIndex != null ? (
              <>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={this.updateUser}
                >
                  Update
                </button>
              </>
            ) : (
              <button
                type="button"
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={this.registerUser}
              >
                Register
              </button>
            )}
          </form>
        </div>
        <div id="usertable" style={{ width: "50%" }}>
          <table
            border="1"
            style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
          >
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Confirm Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.persons.map((per, i) => {
                return (
                  <tr>
                    <td>{per.username}</td>
                    <td>{per.email}</td>
                    <td>{per.password}</td>
                    <td>{per.confirmPassword}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.handleEdit(per, i);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          this.handleDelete(i);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

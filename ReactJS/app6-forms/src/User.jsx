import React, { Component } from "react";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: { fname: "", lname: "" },
      users: [],
    };
  }
  handleInputFieldChange = (e) => {
    console.log(e.target.name);
    const newStateValus = { ...this.state.person };
    newStateValus[e.target.name] = e.target.value;
    this.setState({ person: newStateValus });
    // this.setState({ fname: e.target.value });
  };

  handleFormSubmit = () => {
    console.log(this.state);
    const newUsers = [...this.state.users];
    newUsers.push(this.state.person);
    this.setState({ users: newUsers });
    this.handleClear();
  };

  handleClear = () => {
    this.setState({
      person: {
        fname: "",
        lname: "",
      },
    });
  };
//   handleClear = () => {
//     let newPerson = { ...this.state.person };
//     newPerson = {
//       fname: "",
//       lname: "",
//     };
//     this.setState({
//       person: newPerson,
//     });
//   };
  render() {
    return (
      <div>
        <form>
          <label htmlFor="">First Name :</label>
          <input
            type="text"
            name="fname"
            id=""
            value={this.state.person.fname}
            onChange={this.handleInputFieldChange}
          />{" "}
          <br />
          <label htmlFor="">Last Name :</label>
          <input
            type="text"
            name="lname"
            id=""
            value={this.state.person.lname}
            onChange={this.handleInputFieldChange}
          />{" "}
          <br />
          <button type="button" onClick={this.handleFormSubmit}>
            Add User
          </button>
        </form>

        <hr />
        <ul>
          {this.state.users.map((usr) => {
            return (
              <li>
                {usr.fname} - {usr.lname}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

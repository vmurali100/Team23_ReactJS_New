import { Component } from "react";

class User extends Component {
  state = {
    message: "Welcome to User Component",
    age: 20,
    person: {
      name: "John SS",
      age: 34,
    },
    allUsers: ["John", "Peter", "Mary"],
  };
  changeMessage = () => {
    this.setState({ message: "Thank you for clicking the button", age: 34 });
  };
  render() {
    return (
      <div>
        <button onClick={this.changeMessage}>Change Message</button>
        <h2>{this.state.message}</h2>
        <p>User Age is : {this.state.age}</p>

        <ul>
          {this.state.allUsers.map((usr) => {
            return <li>{usr}</li>;
          })}
        </ul>

        <ul>
          {Object.values(this.state.person).map((val) => {
            return <li>{val}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default User;

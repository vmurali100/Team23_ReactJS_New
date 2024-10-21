import { Component } from "react";

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      fname: "Murali",
    };
  }
  render() {
    return (
      <div>
        <h2>New User Component</h2>
        <p>{this.state.fname}</p>
      </div>
    );
  }
}

export default NewUser;

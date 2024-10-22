import { Component } from "react";
import { ChildComp } from "./Child";

class ParentComp extends Component {
  constructor() {
    super();
    this.state = {
      message: "Welcome State Topic !!!",
      person: {
        email: "murali@gmail.com",
        age: 25,
        state: "AP",
        pin: 517001,
        language: "Telugu",
      },

      friends: ["Murali", "Theju", "Sam", "Kumar", "Krishna"],
    };
  }
  handleChangeMessage = () => {
    this.setState({
      message: "I am New Message after Click Event !!!!",
    });
  };
  deleteLastFriend = () => {
    var newFriends = [...this.state.friends]; //Step 1  - Copy the Existing State
    newFriends.pop(); // Step 2 : Removing the Last Value
    this.setState({ friends: newFriends });
  };
  render() {
    return (
      <div>
        <h1>Parent Component</h1>
        <button onClick={this.handleChangeMessage}>Chame Message</button>
        <h2>{this.state.message}</h2>
        <ul>
          {/* <li>{this.state.person.email}</li>
          <li>{this.state.person.age}</li>
          <li>{this.state.person.state}</li> */}
          {/* {Object.values(this.state.person).map((val) => {
            return <li>{val}</li>;
          })} */}
        </ul>

        <hr />
        {/* Sending Complete State  */}
        {/* <ChildComp {...this.state}/>  */}

        <ChildComp friends={this.state.friends} deleteLastFriend={this.deleteLastFriend}/>
        {/* <ul>
          {this.state.friends.map(function (std) {
            return <li>{std}</li>;
          })}
        </ul> */}
        {/* <ul>
          <li>{this.state.friends[0]}</li>
          <li>{this.state.friends[1]}</li>
          <li>{this.state.friends[2]}</li>
          <li>{this.state.friends[3]}</li>
          <li>{this.state.friends[4]}</li>
        </ul> */}
      </div>
    );
  }
}
export default ParentComp;

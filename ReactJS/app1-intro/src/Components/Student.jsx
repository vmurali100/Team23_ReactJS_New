import { Component } from "react";
import  './Student.css'
class Student extends Component {
  state = {
    myName: "Murali Krishna",
    person: {
      name: "Murali Krishna",
      age: 25,
    },
    allStudents: ["Murali Krishna", "Theju", "Sam", "Kumar", "Shekar"],
  };
  render() {
    return (
      <div>
        <h2>Welcome to Student Component !!</h2>
        <p>Student Name is : {this.state.myName}</p>
        <ul>
          <p>{this.state.person.name}</p>
          <p>{this.state.person.age}</p>
        </ul>
      </div>
    );
  }
}
export default Student;

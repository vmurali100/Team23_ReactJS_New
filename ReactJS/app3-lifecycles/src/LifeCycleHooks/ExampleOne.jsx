import React, { Component } from "react";

export default class ExampleOne extends Component {
  // Constuctor will Be used to Declare to state values ..
  constructor() {
    super();
    this.state = {
      message: "Welcome to ReactJS Lifecycles",
      person: {},
      users: [],
      totalAge: "",
    };
  }
  static getDerivedStateFromProps(propValues, stateValues) {
    console.log(propValues);
    console.log(stateValues);
    console.log("getDerivedStateFromProps is Called ");
    return {
      totalAge: propValues.myAge + 20,
    };
  }
  render() {
    return (
      <div>
        <h2>Welcome to Life Cycle Examples !!!</h2>
        <p>{this.state.message}</p>
        <p>Total Age : {this.state.totalAge}</p>
      </div>
    );
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users").then(res=>res.json()).then((data)=>{
        console.log(data)
        this.setState({users:data})
    })
  }
}

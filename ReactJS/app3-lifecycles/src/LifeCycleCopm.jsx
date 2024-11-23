import React, { Component } from "react";
import LifeCycleChild from "./LifeCycleChild";

export default class LifeCycleCopm extends Component {
  static getDerivedStateFromProps() {
    console.log("getDerivedStateFromProps is excuted !!!");
    return null;
  }

  constructor() {
    super();
    this.state={
        myAge :25
    }
    console.log("constructor is excuted !!!");
  }
  render() {
    console.log("render is excuted !!");
    return (
      <div>
        <h2>Welcome to Class Compoent !!!</h2>
        <button onClick={()=>{this.setState({myAge : 35})}}>Change Age</button>
        <LifeCycleChild age = {this.state.myAge}/>
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount Excucted !!!");
  }
}

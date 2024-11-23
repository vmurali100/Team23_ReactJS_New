import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to parent Comp</h2>
        <hr />
        {/* <Child myUsers = {this.props.allUsers}/> */}
        <Child />
      </div>
    )
  }
}

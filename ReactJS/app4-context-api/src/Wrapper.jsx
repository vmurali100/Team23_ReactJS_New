import React, { Component } from 'react'
import Parent from './Parent'

export default class Wrapper extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to Wrapper</h2>
        {/* <Parent allUsers={this.props.users}/> */}
        <Parent />

      </div>
    )
  }
}

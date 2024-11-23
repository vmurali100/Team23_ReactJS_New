import React, { Component } from 'react'
import HocComponent from './HocComponent'

class HoverCounter extends Component {
    render() {
      return (
        <div>        
          <button style={{padding:5,margin:5}} onMouseOver={this.props.handleIncrementCount}>Increment Count ++ </button>
          <button style={{padding:5,margin:5}} onMouseOver={this.props.handleDecrementCount}>Decrement Count -- </button>
          <h2>Count is : {this.props.count}</h2>
        </div>
      )
    }
}


export default HocComponent(HoverCounter)
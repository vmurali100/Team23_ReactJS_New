import React, { Component } from 'react'

export default class ImageComp extends Component {
  render() {
    return (
      <div>
        <img src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=" alt="" />
      </div>
    )
  }

  componentWillUnmount(){
    console.log("componentWillUnmount is excuted in ImageComp")
  }
}

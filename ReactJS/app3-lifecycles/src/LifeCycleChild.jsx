import React, { Component } from 'react'
import ImageComp from './ImageComp'

export default class LifeCycleChild extends Component {
    static getDerivedStateFromProps(){
        console.log("getDerivedStateFromProps in LifeCycleChild !!!")
    }

    shouldComponentUpdate(){
        console.log("shouldComponentUpdate in LifeCycleChild !!!")
        return true
    }

    getSnapshotBeforeUpdate(){
        console.log("getSnapshotBeforeUpdate in LifeCycleChild !!!")
        return null
    }

    componentDidUpdate(){
        console.log("componentDidUpdate in LifeCycleChild !!!")
    }
  render() {
    console.log("render in LifeCycleChild !!!")
    return (
      <div>
        <h2>{this.props.age}</h2>
        {this.props.age === 25 && <ImageComp/>}
      </div>
    )
  }
}

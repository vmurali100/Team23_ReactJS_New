import React, { Component } from 'react'
import { UserContectConsumer } from './UserContect'

export default class Child extends Component {
  render() {
    return (
      <div>
        <ul>
            
            <UserContectConsumer>
                {(data)=>{
                    return <ul>
                        {data.map((usr)=>{
                        return <li>{usr.username}</li>
                    })}
                    </ul>
                }}
            </UserContectConsumer>
        </ul>
      </div>
    )
  }
}

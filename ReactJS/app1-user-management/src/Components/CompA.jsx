import React from 'react'

const CompA = ({count}) => {
    console.log("Comp A is rendered !!")
  return (
    <div>
      <h2>Welcome to Comp A - {count}</h2>
    </div>
  )
}

export default CompA

import React from 'react'

const CompB = React.memo(()=>{
    console.log("Component B is loaded")
    return <>
        <h2>Hello From Comp B</h2>
    </>
})
export default CompB

import React from 'react'

const CreateNote = () => {
  return (
    <div>
        <p>Enter the title</p>
        <input onChange={(e)=>{StepTitle(e.target.value)}} />
        <p>Enter the Description</p>
        <textarea onChange={(e)=>{StepTitle(e.target.value)}} />
    </div>
  )
}

export default CreateNote;
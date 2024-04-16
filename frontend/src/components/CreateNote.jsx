import axios from 'axios';
import React, { useState } from 'react'

const CreateNote = () => {
    const [title,setTitle] = useState();
    const [tag, setTag] = useState();
    const [desp,setDesp] = useState();
    const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        },
      };

    const handleSubmit =async ()=>{
        const res = await axios.post("http://localhost:3000/notes/newNote",{ title, description:desp, tag },
        config)
    }
  return (
    <>
        <div>
            <p>Enter the title</p>
            <input onChange={(e)=>{setTitle(e.target.value)}} />
            <p>Enter the Description</p>
            <textarea onChange={(e)=>{setDesp(e.target.value)}} />
            <p>Enter the Tag</p>
            <input onChange={(e)=>{setTag(e.target.value)}} />
        </div>
        <div onClick={()=>{handleSubmit()}}>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default</button>
        </div>
    </>
  )
}

export default CreateNote;
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Note = () => {
    const {id} = useParams();
    const [title,setTitle] = useState("Brush Width Adjustment");
    const [tag,setTag]  = useState("notes");
    const [content,setContent] = useState("Users can adjust the brush width using a range input element. The component tracks changes to the brush width and updates the brushWidth state variable accordingly. This allows users to control the thickness of the brush strokes.");
    const [edit,setEdit] = useState();
    useEffect(()=>{
        // noteCall();
    },[]);
    const noteCall =async ()=>{
        const res = await axios.post('/getnote/',id);
        console.log(res);
        setTitle(res?.data?.title);
        setContent(res?.data?.content);
        setTag(res?.data?.tag);
    }
    const doChanges = async()=>{
        const res = await axios.post('/notes/updateNote/',id);
        
    }

  return (
    <>
    <div>
        {!edit? <><div>
            {title}
        </div>
        <div>
            {content}
        </div> 
        <div>
            {tag}
        </div>
        </>
        :
        <>
            <div>
                <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div>
                <textarea value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
            <div>
                <input value={tag} onChange={(e)=>setTag(e.target.value)}/>
            </div>
        </>    
    }

    </div>
    <div>
        {!edit?<p onClick={(()=>setEdit(true))}>Edit</p> : <p onClick={(()=> doChanges() )}>Save</p>}
    </div>
    </>
  )
}

export default Note
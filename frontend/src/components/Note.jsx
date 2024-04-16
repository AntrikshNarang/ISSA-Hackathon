import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Note = () => {
    const {id} = useParams();
    const [info,setInfo] = useState({
        "title": "Brush Width Adjustment",
        "description": "Users can adjust the brush width using a range input element. The component tracks changes to the brush width and updates the brushWidth state variable accordingly. This allows users to control the thickness of the brush strokes.",
        "tag": "notes",
        "_id": 12350
    });
    const [edit,setEdit] = useState();
    useEffect(()=>{
        // noteCall();
    },[]);
    const noteCall =async ()=>{
        const res = await axios.post('/getnote/',id);
        console.log(res);
        setInfo(res?.data);
    }
  return (
    <>
    <div>
        <div>
            {/* {info?.title} */}
        </div>
        <div>
            {/* {info?.description} */}
        </div>
    </div>
    <div>
        <p onClick={(()=>setEdit(true))}>Edit</p>
    </div>
    </>
  )
}

export default Note
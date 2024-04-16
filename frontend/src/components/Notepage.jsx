import React from 'react'
import data from "../data/data.json"
import Card from './Card'

const Notepage = () => {
  return (
    <>

    <div className='mx-[7%] flex flex-wrap justify-evenly'>
        {
            data.map((x)=>{
                return  <Card note={x}/>
            })
        }
    </div>
    </>
  )
}

export default Notepage
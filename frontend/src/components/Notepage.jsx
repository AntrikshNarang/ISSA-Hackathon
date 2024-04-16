import React, { useEffect, useState } from 'react'
import data from "../data/data.json"
import Card from './Card'
import axios from 'axios'
import { useToast } from "@chakra-ui/react";


const Notepage = () => {
  const toast = useToast();
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchNotes();
  }, []);
  async function fetchNotes(){
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("userToken"),
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/notes/getNotes/`,
        config
      );
      console.log(data);
      setNotes(data);
      console.log(notes)
      toast({
        title: "Fetched Notes Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

    } catch (error) {
      console.log("Error Occurred!", error);
      toast({
        title: "Cannot Fetch Notes!",
        description: error.response.data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  return (
    <>

    <div className='mx-[7%] flex flex-wrap justify-evenly'>
        {
            notes.map((note)=>{
                return  <Card key={note._id} title={note.title} description={note.description} tag={note.tag} id={note._id} />
            })
        }
    </div>
    </>
  )
}

export default Notepage
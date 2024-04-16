import React, { useEffect, useState } from 'react'
import data from "../data/data.json"
import Card from './Card'
import axios from 'axios'
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';


const Notepage = () => {
  const toast = useToast();
  const navigate = useNavigate();
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
    <div>
    <button onClick={()=>navigate('/createnote')} type="button" class="fixed bottom-8 right-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center me-2 mb-2">+</button>
    </div>
    </>
  )
}

export default Notepage
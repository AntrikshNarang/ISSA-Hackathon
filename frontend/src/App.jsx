import React from 'react'
import { Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import Notepage from './components/Notepage';
import Note from './components/Note';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/notes" element={<Notepage />} />
        <Route path="notes/:id" element={<Note />} />
        {/* <Route path="/createnotes" element={<CreateNote />} /> */}
        {/* <Route path="/editnotes" element={<Notepage />} /> */}
      </Routes>
    </div>
  )
}

export default App

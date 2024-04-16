import React from 'react'
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Homepage from './components/Homepage';
import Notepage from './components/Notepage';
import Note from './components/Note';
import Navbar from './components/Navbar';
import CreateNote from './components/CreateNote';

const App = () => {
  const location = useLocation();
<<<<<<< HEAD
  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
=======

  return (
    <div>
      {location.pathname!=="/" && <Navbar />}
>>>>>>> 61efbdd9a8e248aefd45e1f390fb3cdaf36cda2c
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/notes" element={<Outlet />}>
        <Route path="/notes" element={<Notepage />} />
          <Route path="notes/:id" element={<Note />} />
        </Route>
        <Route path="/createnotes" element={<CreateNote />} />
        {/* <Route path="/editnotes" element={<Notepage />} /> */}
      </Routes>
    </div>
  )
}

export default App

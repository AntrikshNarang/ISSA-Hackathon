import React from 'react'
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Homepage from './components/Homepage';
import Notepage from './components/Notepage';
import Note from './components/Note';
import Navbar from './components/Navbar';
import CreateNote from './components/CreateNote';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname!=="/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/notes" element={<Outlet />}>
        <Route path="/notes" element={<Notepage />} />
          <Route path="notes/:id" element={<Note />} />
        </Route>
        <Route path="/createnote" element={<CreateNote />} />
        {/* <Route path="/editnotes" element={<Notepage />} /> */}
      </Routes>
    </div>
  )
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { CrewGallery } from './pages/CrewGallery';
import { CreateCrewmate } from './pages/CreateCrewmate';
import { UpdateCrewmate } from './pages/UpdateCrewmate';
import { CrewmateDetail } from './pages/CrewmateDetail';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<CrewGallery />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/edit/:id" element={<UpdateCrewmate />} />
            <Route path="/crewmate/:id" element={<CrewmateDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

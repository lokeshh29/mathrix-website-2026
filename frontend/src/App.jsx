import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Schedule from './pages/Schedule';
import Workshops from './pages/Workshops';
import Sponsors from './pages/Sponsors';
import Members from './pages/Members';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/members" element={<Members />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

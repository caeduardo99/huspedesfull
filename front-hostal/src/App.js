import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './components/navbar';
import RegisterForm from './components/RegisterForm';
import RegisteredUsers from './components/RegisteredUsers';
import Rooms from './components/Rooms';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/RegisteredUsers" element={<RegisteredUsers />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/Rooms" element={<Rooms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

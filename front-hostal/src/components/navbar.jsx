import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to="/RegisteredUsers">Huespedes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/RegisterForm">Registro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Rooms">Habitaciones</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

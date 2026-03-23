// Componente de navegación global de la herramienta administrativa.
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-corporate-blue shadow">
      <div className="container">
        {/* Enlace que actúa como marca principal llevando al inicio. */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="fw-bold fs-4">Eduflix <small className="fs-6 fw-normal ms-1 text-light">Admin</small></span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Lista de enlaces hacia los distintos módulos del administrador. */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/media">Películas y Series</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/generos">Géneros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/directores">Directores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productoras">Productoras</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tipos">Tipos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

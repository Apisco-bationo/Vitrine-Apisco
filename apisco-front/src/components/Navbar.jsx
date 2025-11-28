import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          🚀 Apisco Groupe
        </Link>
        
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/login">Connexion</Link>
          <Link className="nav-link" to="/register">Inscription</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/LOGO AG NOUVEAU 2.png'

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate()

  const handleLogoutClick = async () => {
    if (onLogout) await onLogout()
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logo} 
            alt="Apisco Groupe" 
            style={{ 
              height: '45px',
              width: 'auto',
              marginRight: '12px'
            }}
          />
          <span 
            className="navbar-brand-text"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '1.4rem',
              background: 'linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: '#FF6B35'
            }}
          >
            Apisco Groupe
          </span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/portfolio">Portfolio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">À propos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          <div className="navbar-nav d-flex align-items-center">
            {user ? (
              <>
                <span className="nav-link me-3">Bonjour, {user.name}</span>
                <Link className="nav-link me-2" to="/projects">Mes projets</Link>
                <Link className="nav-link me-3" to="/dashboard">Dashboard</Link>
                <button className="btn btn-outline-primary" onClick={handleLogoutClick}>
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link me-3" to="/login">Connexion</Link>
                <Link className="btn btn-primary" to="/register">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
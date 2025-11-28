import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/LOGO AG NOUVEAU 2.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img 
                src={logo} 
                alt="Apisco Groupe" 
                style={{ 
                  height: '45px',
                  width: 'auto',
                  marginRight: '12px',
                  filter: 'brightness(0) invert(1)'
                }}
              />
              <span 
                className="footer-brand-text"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  color: 'white'
                }}
              >
                Apisco Groupe
              </span>
            </div>
            <p>
              Votre partenaire de confiance pour des solutions digitales 
              innovantes en Côte d'Ivoire et partout dans le monde.
            </p>
            <div className="social-links">
              <a href="https://web.facebook.com/Apisco2.0/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 mb-4">
            <h5>Entreprise</h5>
            <ul className="list-unstyled">
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-4 mb-4">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><Link to="/services">Développement Web</Link></li>
              <li><Link to="/services">Applications Mobile</Link></li>
              <li><Link to="/services">Consulting IT</Link></li>
              <li><Link to="/services">Maintenance</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-4 mb-4">
            <h5>Légal</h5>
            <ul className="list-unstyled">
              <li><Link to="/privacy">Confidentialité</Link></li>
              <li><Link to="/terms">Conditions</Link></li>
              <li><Link to="/cookies">Cookies</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled contact-info">
              <li><i className="fas fa-envelope"></i>apiscogroupe@gmail.com</li>
              <li><i className="fas fa-phone"></i>+225 0768744768</li>
              <li><i className="fas fa-map-marker-alt"></i>Abidjan, Côte d'Ivoire</li>
            </ul>
          </div>
        </div>
        
        <hr />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">&copy; 2024 Apisco Groupe. Tous droits réservés.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted mb-0">Fierté ivoirienne, excellence mondiale 🌍</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
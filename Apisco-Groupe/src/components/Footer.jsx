import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-primary">Apisco Groupe</h5>
            <p>Votre partenaire digital pour des solutions innovantes et performantes.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>📧 contact@apisco.com<br/>📞 +33 1 23 45 67 89</p>
          </div>
          <div className="col-md-4">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li>Développement Web</li>
              <li>Applications Mobile</li>
              <li>Community Manager</li>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="text-center">
          <p>&copy; 2025 Apisco Groupe. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
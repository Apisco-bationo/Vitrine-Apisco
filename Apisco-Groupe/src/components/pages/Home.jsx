import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Solutions Digitales <span className="text-dark">Innovantes</span>
              </h1>
              <p className="lead mb-4">
                Apisco Groupe vous accompagne dans votre transformation digitale avec des solutions sur mesure.
              </p>
              <div className="d-flex gap-3">
                <Link to="/services" className="btn btn-dark btn-lg">
                  Nos Services
                </Link>
                <Link to="/quotes" className="btn btn-outline-light btn-lg">
                  Demander un Devis
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-white rounded p-4 shadow">
                <h3 className="text-primary">🚀 Innovation</h3>
                <p className="text-dark">Des solutions modernes pour votre entreprise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary">Nos Services</h2>
            <p className="lead">Découvrez nos solutions digitales</p>
          </div>
          
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {services.map(service => (
                <div key={service.id} className="col-md-4 mb-4">
                  <div className="card service-card h-100">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{service.title}</h5>
                      <p className="card-text">{service.description}</p>
                      {service.price && (
                        <h6 className="text-dark">
                          À partir de {service.price} €
                        </h6>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-primary btn-lg">
              Voir tous les services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
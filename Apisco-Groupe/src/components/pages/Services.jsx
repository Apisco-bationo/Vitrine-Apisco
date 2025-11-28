import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="text-primary">Nos Services</h1>
        <p className="lead">Des solutions digitales adaptées à vos besoins</p>
      </div>

      <div className="row">
        {services.map(service => (
          <div key={service.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card service-card h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                
                <div className="mb-3">
                  {service.price ? (
                    <h6 className="text-dark fw-bold">
                      À partir de {service.price} €
                    </h6>
                  ) : (
                    <h6 className="text-muted">Sur devis</h6>
                  )}
                  <small className="text-muted">Durée: {service.duration}</small>
                </div>

                <div className="d-grid gap-2">
                  <Link 
                    to="/quotes" 
                    className="btn btn-primary"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
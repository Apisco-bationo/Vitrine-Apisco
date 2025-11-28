import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, showButton = true }) => {
  return (
    <div className="card service-card h-100 fade-in">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{service.title}</h5>
        <p className="card-text flex-grow-1">{service.description}</p>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            {service.price ? (
              <h6 className="text-dark fw-bold mb-0">
                À partir de {service.price} €
              </h6>
            ) : (
              <h6 className="text-muted mb-0">Sur devis</h6>
            )}
            <small className="text-muted">{service.duration}</small>
          </div>

          {showButton && (
            <div className="d-grid gap-2">
              <Link 
                to="/quotes" 
                className="btn btn-primary"
                state={{ service: service.title }}
              >
                💼 Demander un devis
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
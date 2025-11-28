import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await api.get('/services')
      setServices(response.data.data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Nos Services</h1>
              <p className="lead mb-0">
                Des solutions digitales complètes pour propulser votre entreprise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {services.map(service => (
              <div key={service.id} className="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
                <div className="card service-card h-100 hover-lift">
                  <div className="card-body p-4">
                    <div className="feature-icon mx-auto text-white mb-3">
                      <i className="fas fa-laptop-code"></i>
                    </div>
                    <h4 className="card-title text-primary">{service.title}</h4>
                    <p className="card-text text-muted" style={{ fontWeight: '300' }}>
                      {service.description}
                    </p>
                    
                    <div className="service-meta mb-3">
                      {service.price ? (
                        <h5 className="text-dark fw-bold">{service.price} €</h5>
                      ) : (
                        <h5 className="text-muted">Sur devis</h5>
                      )}
                      <small className="text-muted d-block">{service.duration}</small>
                    </div>

                    <div className="d-grid">
                      <Link 
                        to="/quotes" 
                        className="btn btn-primary"
                        state={{ service: service.title }}
                      >
                        Demander un devis
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <div className="bg-light rounded-3 p-5">
                <h3 className="mb-3">Vous ne trouvez pas ce que vous cherchez ?</h3>
                <p className="text-muted mb-4">
                  Contactez-nous pour une solution personnalisée adaptée à vos besoins spécifiques.
                </p>
                <Link to="/contact" className="btn btn-primary btn-lg me-3">
                  Nous Contacter
                </Link>
                <Link to="/quotes" className="btn btn-outline-primary btn-lg">
                  Demander un Devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
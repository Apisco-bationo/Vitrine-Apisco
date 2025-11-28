import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  const team = [
    {
      name: "BATIONO Epiphane",
      role: "CEO & Fondateur",
      description: "Expert en transformation digitale"
    },
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">À Propos d'Apisco</h1>
              <p className="lead mb-4">
                Votre partenaire de confiance pour des solutions digitales innovantes
              </p>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-white rounded-3 p-4 text-dark">
                <h3>🚀 Innovation & Excellence</h3>
                <p className="mb-0">Depuis 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5" data-aos="fade-right">
              <h2 className="text-primary mb-4">Notre Mission</h2>
              <p className="text-muted mb-4" style={{ fontWeight: '300' }}>
                Chez Apisco Groupe, nous croyons que chaque entreprise mérite des solutions digitales 
                de qualité pour prospérer dans l'ère numérique. Notre mission est de démocratiser 
                l'accès aux technologies modernes pour les entreprises africaines.
              </p>
              <p className="text-muted" style={{ fontWeight: '300' }}>
                Nous combinons expertise technique, innovation et compréhension des marchés locaux 
                pour créer des solutions qui répondent parfaitement à vos besoins.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="bg-light rounded-3 p-4">
                <h4 className="text-primary mb-3">Nos Valeurs</h4>
                <div className="d-flex align-items-start mb-3">
                  <div className="bg-primary rounded-circle p-2 me-3 text-white">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Excellence</h6>
                    <p className="text-muted mb-0 small">Nous visons l'excellence dans chaque projet</p>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-3">
                  <div className="bg-primary rounded-circle p-2 me-3 text-white">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Confiance</h6>
                    <p className="text-muted mb-0 small">Relation transparente avec nos clients</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div className="bg-primary rounded-circle p-2 me-3 text-white">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Innovation</h6>
                    <p className="text-muted mb-0 small">Solutions créatives et modernes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary mb-3">Notre Équipe</h2>
            <p className="text-muted" style={{ fontWeight: '300' }}>
              Des experts passionnés à votre service
            </p>
          </div>
          <div className="row">
            {team.map((member, index) => (
              <div key={index} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card text-center h-100 hover-lift">
                  <div className="card-body p-4">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                         style={{ width: '80px', height: '80px' }}>
                      <i className="fas fa-user fa-2x"></i>
                    </div>
                    <h5 className="card-title">{member.name}</h5>
                    <h6 className="text-primary mb-3">{member.role}</h6>
                    <p className="card-text text-muted small">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="bg-primary rounded-3 p-5 text-white">
                <h3 className="mb-3">Prêt à travailler avec nous ?</h3>
                <p className="mb-4 opacity-75">
                  Rejoignez les nombreuses entreprises qui nous font confiance
                </p>
                <Link to="/contact" className="btn btn-light btn-lg me-3">
                  Nous Contacter
                </Link>
                <Link to="/services" className="btn btn-outline-light btn-lg">
                  Voir nos Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
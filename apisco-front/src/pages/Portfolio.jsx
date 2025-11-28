import React from 'react'
import { Link } from 'react-router-dom'

const Portfolio = () => {
  const projects = [
    {
      title: "Site E-commerce",
      description: "Plateforme de vente en ligne complète",
      category: "Développement Web"
    },
    {
      title: "Application Mobile", 
      description: "App de gestion pour entreprise",
      category: "Mobile"
    },
    {
      title: "Dashboard Analytics",
      description: "Tableau de bord analytique",
      category: "Web App"
    }
  ]

  return (
    <div className="portfolio-page">
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Portfolio</h1>
            <p className="lead mb-0">
              Découvrez nos réalisations et projets phares
            </p>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-primary mb-3">Nos Réalisations</h2>
            <p className="text-muted" style={{ fontWeight: '300' }}>
              Des projets variés pour des clients satisfaits
            </p>
          </div>

          <div className="row">
            {projects.map((project, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4" data-aos="fade-up">
                <div className="card h-100 hover-lift">
                  <div className="card-body text-center p-4">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                         style={{ width: '80px', height: '80px' }}>
                      <i className="fas fa-project-diagram fa-2x"></i>
                    </div>
                    <h5 className="card-title">{project.title}</h5>
                    <span className="badge bg-primary mb-3">{project.category}</span>
                    <p className="card-text text-muted">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <div className="bg-light rounded-3 p-5">
              <h3 className="mb-3">Votre projet ici ?</h3>
              <p className="text-muted mb-4">
                Contactez-nous pour discuter de votre projet
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
      </section>
    </div>
  )
}

export default Portfolio
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import AnimatedCounter from '../components/AnimatedCounter'

const Home = () => {
  useEffect(() => {
    AOS.refresh()
  }, [])

  const carouselItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
      title: "Solutions Digitales Innovantes",
      description: "Transformez vos idées en réalité avec nos solutions digitales sur mesure et performantes."
    },
    {
      id: 2, 
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
      title: "Développement Web & Mobile",
      description: "Des applications modernes et responsives qui propulsent votre entreprise vers l'avant."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Expertise Technique de Pointe", 
      description: "Bénéficiez de notre expertise pour des solutions robustes, sécurisées et évolutives."
    }
  ]

  return (
    <>
      {/* Hero Carousel Section */}
      <section className="hero-carousel">
        <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {carouselItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <div className="carousel-inner">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="carousel-overlay">
                  <div className="container">
                    <div 
                      className="carousel-content"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <h1>{item.title}</h1>
                      <p className="lead mb-4" style={{ fontWeight: '300', opacity: '0.9' }}>
                        {item.description}
                      </p>
                      <div className="hero-buttons">
                        <Link 
                          to="/services" 
                          className="btn btn-light btn-lg me-3 hover-lift"
                          style={{ fontWeight: '500' }}
                          data-aos="fade-right"
                          data-aos-delay="400"
                        >
                          Nos Services
                        </Link>
                        <Link 
                          to="/quotes" 
                          className="btn btn-outline-light btn-lg hover-lift"
                          style={{ fontWeight: '500' }}
                          data-aos="fade-left"
                          data-aos-delay="400"
                        >
                          Demander un Devis
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div 
            className="text-center mb-5"
            data-aos="fade-up"
          >
            <h2 className="display-4 fw-bold mb-3">Nos Domaines d'Expertise</h2>
            <p className="lead text-muted" style={{ fontWeight: '300' }}>
              Des solutions complètes pour tous vos besoins digitaux
            </p>
          </div>

          <div className="row">
            <div 
              className="col-md-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="feature-card text-center hover-lift">
                <div className="feature-icon mx-auto text-white pulse">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h4>Développement Web</h4>
                <p className="text-muted" style={{ fontWeight: '300', lineHeight: '1.6' }}>
                  Sites vitrines, e-commerce, applications web sur mesure 
                  avec les technologies les plus récentes.
                </p>
              </div>
            </div>

            <div 
              className="col-md-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="feature-card text-center hover-lift">
                <div className="feature-icon mx-auto text-white pulse">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h4>Applications Mobile</h4>
                <p className="text-muted" style={{ fontWeight: '300', lineHeight: '1.6' }}>
                  Applications iOS et Android natives et cross-platform 
                  pour toucher votre audience mobile.
                </p>
              </div>
            </div>

            <div 
              className="col-md-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="feature-card text-center hover-lift">
                <div className="feature-icon mx-auto text-white pulse">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4>Consulting Digital</h4>
                <p className="text-muted" style={{ fontWeight: '300', lineHeight: '1.6' }}>
                  Audit, stratégie digitale et accompagnement personnalisé 
                  pour maximiser votre présence en ligne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
     {/* Stats Section avec image de fond - Version Sombre */}
<section className="stats-section">
  <div className="container">
    <div className="row text-center">
      <div 
        className="col-md-3 mb-4"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="stats-counter">
          <AnimatedCounter end={87} duration={2500} />
        </div>
        <p className="lead mt-2">Projets Livrés</p>
      </div>
      <div 
        className="col-md-3 mb-4"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        <div className="stats-counter">
          <AnimatedCounter end={98} duration={2500} />
        </div>
        <p className="lead mt-2">Clients Satisfaits</p>
      </div>
      <div 
        className="col-md-3 mb-4"
        data-aos="zoom-in"
        data-aos-delay="600"
      >
        <div className="stats-counter">
          <AnimatedCounter end={5} duration={2500} />
        </div>
        <p className="lead mt-2">Ans d'Expérience</p>
      </div>
      <div 
        className="col-md-3 mb-4"
        data-aos="zoom-in"
        data-aos-delay="800"
      >
        <div className="stats-counter">24/7</div>
        <p className="lead mt-2">Support Client</p>
      </div>
    </div>
  </div>
</section>

      {/* Process Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div 
            className="text-center mb-5"
            data-aos="fade-up"
          >
            <h2 className="display-4 fw-bold mb-3">Notre Processus</h2>
            <p className="lead text-muted" style={{ fontWeight: '300' }}>
              Une méthodologie éprouvée pour votre succès
            </p>
          </div>

          <div className="row">
            <div 
              className="col-md-3 mb-4"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="text-center">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3 hover-lift"
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-lightbulb fa-2x"></i>
                </div>
                <h5>Conception</h5>
                <p className="text-muted" style={{ fontWeight: '300' }}>
                  Analyse de vos besoins et conception de la solution
                </p>
              </div>
            </div>

            <div 
              className="col-md-3 mb-4"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <div className="text-center">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3 hover-lift"
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-code fa-2x"></i>
                </div>
                <h5>Développement</h5>
                <p className="text-muted" style={{ fontWeight: '300' }}>
                  Création avec les meilleures technologies
                </p>
              </div>
            </div>

            <div 
              className="col-md-3 mb-4"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="text-center">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3 hover-lift"
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-vial fa-2x"></i>
                </div>
                <h5>Tests</h5>
                <p className="text-muted" style={{ fontWeight: '300' }}>
                  Validation rigoureuse de la qualité
                </p>
              </div>
            </div>

            <div 
              className="col-md-3 mb-4"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="text-center">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3 hover-lift"
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-rocket fa-2x"></i>
                </div>
                <h5>Lancement</h5>
                <p className="text-muted" style={{ fontWeight: '300' }}>
                  Déploiement et support continu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div 
            className="row justify-content-center text-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="col-lg-8">
              <div className="bg-light rounded-3 p-5 border hover-lift">
                <h3 className="mb-3">Prêt à transformer votre vision en réalité ?</h3>
                <p className="text-muted mb-4" style={{ fontWeight: '300' }}>
                  Rejoignez les entreprises qui nous font confiance pour leur succès digital.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Link 
                    to="/register" 
                    className="btn btn-primary btn-lg hover-lift"
                    style={{ fontWeight: '500' }}
                  >
                    Commencer Maintenant
                  </Link>
                  <Link 
                    to="/contact" 
                    className="btn btn-outline-primary btn-lg hover-lift"
                    style={{ fontWeight: '500' }}
                  >
                    Nous Contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
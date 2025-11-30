import React from 'react'
import { Link } from 'react-router-dom'

const sampleProjects = [
  {
    id: 1,
    title: 'Site Vitrine - Apisco',
    description: 'Un site vitrine moderne et responsive pour présenter l\'entreprise et ses services.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'Application Mobile',
    description: 'Application mobile cross-platform avec UI fluide et synchronisation en temps réel.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'Plateforme E-commerce',
    description: 'Solution e-commerce sécurisée et optimisée pour la conversion.',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    title: 'Dashboard Admin',
    description: 'Tableau de bord d\'administration avec statistiques et gestion des contenus.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
  }
]

const Projects = ({ user }) => {
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Mes réalisations</h2>
          <p className="text-muted">Projets récents présentés avec image et description.</p>
        </div>
        <div>
          <Link to="/dashboard" className="btn btn-outline-primary me-2">Aller au Dashboard</Link>
          {user ? (
            <span className="text-muted">Connecté en tant que <strong>{user.name}</strong></span>
          ) : (
            <Link to="/login" className="btn btn-primary">Se connecter</Link>
          )}
        </div>
      </div>

      <div className="row g-4">
        {sampleProjects.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ height: 200, overflow: 'hidden' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted" style={{ flex: 1 }}>{p.description}</p>
                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <Link to="/portfolio" className="btn btn-light">Voir le projet</Link>
                  <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects

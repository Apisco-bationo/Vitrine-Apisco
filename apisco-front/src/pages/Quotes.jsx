import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../api/api'

const Quotes = ({ user }) => {
  const location = useLocation()
  const preselectedService = location.state?.service || ''

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    service: preselectedService,
    description: '',
    budget: '',
    deadline: '',
    company: user?.company || ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const quoteData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        description: `Service: ${form.service}\n\n${form.description}`,
        budget: form.budget ? parseFloat(form.budget) : null,
        preferred_deadline: form.deadline || null
      }

      const response = await api.post('/quotes', quoteData)
      setMessage('✅ Votre demande de devis a été envoyée avec succès !')
      setForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        service: '',
        description: '',
        budget: '',
        deadline: '',
        company: user?.company || ''
      })
    } catch (error) {
      setMessage('❌ Erreur lors de l\'envoi du devis')
      console.error('Error submitting quote:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="quotes-page">
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Demande de Devis</h1>
            <p className="lead mb-0">
              Obtenez un devis personnalisé pour votre projet
            </p>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="text-primary">Formulaire de Devis</h2>
                    <p className="text-muted">Remplissez ce formulaire pour recevoir un devis détaillé</p>
                  </div>

                  {message && (
                    <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
                      {message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Nom complet *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          disabled={!!user}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          disabled={!!user}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="phone" className="form-label">Téléphone</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          disabled={!!user}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="company" className="form-label">Entreprise</label>
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          disabled={!!user}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="service" className="form-label">Service souhaité *</label>
                        <select
                          className="form-select"
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Sélectionnez un service</option>
                          <option value="Développement Web">Développement Web</option>
                          <option value="Application Mobile">Application Mobile</option>
                          <option value="Consulting IT">Consulting IT</option>
                          <option value="Maintenance">Maintenance & Support</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="budget" className="form-label">Budget estimé (€)</label>
                        <input
                          type="number"
                          className="form-control"
                          id="budget"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          min="0"
                          placeholder="Optionnel"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="deadline" className="form-label">Date souhaitée</label>
                      <input
                        type="date"
                        className="form-control"
                        id="deadline"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="description" className="form-label">Description du projet *</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="6"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Décrivez en détail votre projet, vos objectifs, vos besoins spécifiques, les fonctionnalités souhaitées..."
                        required
                      ></textarea>
                      <div className="form-text">
                        Plus votre description est détaillée, plus notre devis sera précis.
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100 py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Envoi en cours...
                        </>
                      ) : (
                        '📨 Envoyer ma demande de devis'
                      )}
                    </button>
                  </form>

                  {!user && (
                    <div className="text-center mt-4">
                      <p className="text-muted">
                        Déjà client ? <Link to="/login" className="text-primary">Connectez-vous</Link> pour pré-remplir vos informations
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="bg-light rounded-3 p-5 text-center">
                <h3 className="text-primary mb-4">Notre Processus de Devis</h3>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                         style={{ width: '70px', height: '70px' }}>
                      <span className="fw-bold">1</span>
                    </div>
                    <h5>Analyse</h5>
                    <p className="text-muted small">Nous étudions votre projet en détail</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                         style={{ width: '70px', height: '70px' }}>
                      <span className="fw-bold">2</span>
                    </div>
                    <h5>Devis Détaillé</h5>
                    <p className="text-muted small">Création d'un devis personnalisé</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                         style={{ width: '70px', height: '70px' }}>
                      <span className="fw-bold">3</span>
                    </div>
                    <h5>Validation</h5>
                    <p className="text-muted small">Échanges et ajustements si nécessaire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Quotes
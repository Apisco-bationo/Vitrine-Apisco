import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

const Register = ({ onLogin }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    company: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/register', form)
      localStorage.setItem('apisco_token', response.data.token)
      onLogin(response.data.user)
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || "Erreur lors de l'inscription")
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
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center position-relative">
          <div className="col-12 col-md-10 col-lg-6">
            <div 
              className="auth-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Header */}
              <div className="auth-header">
               
                <h2 className="text-primary fw-bold mb-2">Inscription</h2>
                <p className="text-muted">Rejoignez notre communauté</p>
              </div>

              {/* Body */}
              <div className="auth-body">
                {error && (
                  <div 
                    className="alert alert-danger glass-effect"
                    role="alert"
                    data-aos="fade-in"
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="auth-form-group" data-aos="fade-right" data-aos-delay="300">
                        <label htmlFor="name" className="auth-form-label">👤 Nom complet</label>
                        <input
                          id="name"
                          type="text"
                          className="form-control auth-form-control"
                          name="name"
                          placeholder="Votre nom complet"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="auth-form-group" data-aos="fade-left" data-aos-delay="400">
                        <label htmlFor="email" className="auth-form-label">📧 Email</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control auth-form-control"
                          name="email"
                          placeholder="votre@email.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="auth-form-group" data-aos="fade-right" data-aos-delay="500">
                        <label htmlFor="password" className="auth-form-label">🔒 Mot de passe</label>
                        <input
                          id="password"
                          type="password"
                          className="form-control auth-form-control"
                          name="password"
                          placeholder="Minimum 8 caractères"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="auth-form-group" data-aos="fade-left" data-aos-delay="600">
                        <label htmlFor="password_confirmation" className="auth-form-label">✅ Confirmation</label>
                        <input
                          id="password_confirmation"
                          type="password"
                          className="form-control auth-form-control"
                          name="password_confirmation"
                          placeholder="Confirmez le mot de passe"
                          value={form.password_confirmation}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="auth-form-group" data-aos="fade-right" data-aos-delay="700">
                        <label htmlFor="phone" className="auth-form-label">📱 Téléphone</label>
                        <input
                          id="phone"
                          type="tel"
                          className="form-control auth-form-control"
                          name="phone"
                          placeholder="Votre numéro de téléphone"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="auth-form-group" data-aos="fade-left" data-aos-delay="800">
                        <label htmlFor="company" className="auth-form-label">🏢 Entreprise</label>
                        <input
                          id="company"
                          type="text"
                          className="form-control auth-form-control"
                          name="company"
                          placeholder="Nom de votre entreprise"
                          value={form.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 mt-2 hover-lift"
                    disabled={loading}
                    data-aos="zoom-in"
                    data-aos-delay="900"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Inscription...
                      </>
                    ) : (
                      "Créer mon compte"
                    )}
                  </button>
                </form>

                <div 
                  className="text-center mt-4"
                  data-aos="fade-in"
                  data-aos-delay="1000"
                >
                  <p className="text-muted mb-0">
                    Déjà un compte ?{' '}
                    <Link to="/login" className="text-primary text-decoration-none fw-bold">
                      Se connecter
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating decorative elements - hidden on mobile */}
          <div 
            className="position-fixed top-0 start-0 mt-5 ms-5 floating-element d-none d-lg-block"
            style={{ zIndex: -1, opacity: 0.1 }}
          >
            <div className="bg-success rounded-circle" style={{ width: '80px', height: '80px' }}></div>
          </div>
          <div 
            className="position-fixed bottom-0 end-0 mb-5 me-5 floating-element d-none d-lg-block"
            style={{ zIndex: -1, opacity: 0.1, animationDelay: '3s' }}
          >
            <div className="bg-info rounded-circle" style={{ width: '120px', height: '120px' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
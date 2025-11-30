import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/login', form)
      localStorage.setItem('apisco_token', response.data.token)
      onLogin(response.data.user)
      navigate('/projects')
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuth = (provider) => {
    window.location.href = `http://localhost:8000/api/oauth/${provider}/redirect`
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center position-relative">
          <div className="col-12 col-md-8 col-lg-5">
            <div 
              className="auth-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Header */}
              <div className="auth-header">
               
                <h2 className="text-primary fw-bold mb-2">Connexion</h2>
                <p className="text-muted">Content de vous revoir !</p>
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
                  <div className="auth-form-group" data-aos="fade-right" data-aos-delay="300">
                    <label htmlFor="email" className="auth-form-label">📧 Email</label>
                    <input
                      id="email"
                      type="email"
                      className="form-control auth-form-control"
                      placeholder="Votre adresse email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="auth-form-group" data-aos="fade-left" data-aos-delay="400">
                    <label htmlFor="password" className="auth-form-label">🔒 Mot de passe</label>
                    <input
                      id="password"
                      type="password"
                      className="form-control auth-form-control"
                      placeholder="Votre mot de passe"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 mb-4 hover-lift"
                    disabled={loading}
                    data-aos="zoom-in"
                    data-aos-delay="500"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Connexion...
                      </>
                    ) : (
                      'Se connecter'
                    )}
                  </button>
                </form>

                <div className="auth-divider" data-aos="fade-in" data-aos-delay="600">
                  <span>Ou continuer avec</span>
                </div>

                <div className="d-grid gap-3" data-aos="fade-up" data-aos-delay="700">
                  <button 
                    type="button" 
                    className="oauth-btn d-flex align-items-center justify-content-center"
                    onClick={() => handleOAuth('google')}
                  >
                    <i className="fab fa-google text-danger me-3"></i>
                    <span>Google</span>
                  </button>
                  <button 
                    type="button" 
                    className="oauth-btn d-flex align-items-center justify-content-center"
                    onClick={() => handleOAuth('github')}
                  >
                    <i className="fab fa-github me-3"></i>
                    <span>GitHub</span>
                  </button>
                </div>

                <div 
                  className="text-center mt-4"
                  data-aos="fade-in"
                  data-aos-delay="800"
                >
                  <p className="text-muted mb-0">
                    Pas de compte ?{' '}
                    <Link to="/register" className="text-primary text-decoration-none fw-bold">
                      S'inscrire
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
            <div className="bg-primary rounded-circle" style={{ width: '100px', height: '100px' }}></div>
          </div>
          <div 
            className="position-fixed bottom-0 end-0 mb-5 me-5 floating-element d-none d-lg-block"
            style={{ zIndex: -1, opacity: 0.1, animationDelay: '2s' }}
          >
            <div className="bg-warning rounded-circle" style={{ width: '150px', height: '150px' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
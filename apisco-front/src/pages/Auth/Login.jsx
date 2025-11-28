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
      navigate('/dashboard')
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
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="text-primary fw-bold">Connexion</h2>
                  <p className="text-muted">Accédez à votre compte</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Connexion...' : 'Se connecter'}
                  </button>
                </form>

                <div className="text-center mb-4">
                  <div className="position-relative">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                      Ou continuer avec
                    </span>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="button" 
                    className="btn btn-outline-dark d-flex align-items-center justify-content-center"
                    onClick={() => handleOAuth('google')}
                  >
                    <i className="fab fa-google me-2"></i>
                    Google
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-dark d-flex align-items-center justify-content-center"
                    onClick={() => handleOAuth('github')}
                  >
                    <i className="fab fa-github me-2"></i>
                    GitHub
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-muted">
                    Pas de compte ? <Link to="/register" className="text-primary text-decoration-none">S'inscrire</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
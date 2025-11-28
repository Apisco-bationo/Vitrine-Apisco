import React, { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulation d'envoi
    setTimeout(() => {
      setMessage('✅ Message envoyé avec succès !')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setLoading(false)
    }, 2000)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="contact-page">
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Contactez-nous</h1>
              <p className="lead mb-0">
                Discutons de votre projet ensemble
              </p>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-white rounded-3 p-4 text-dark">
                <h4>📞 +225 0768744768</h4>
                <p className="mb-0">📧 apiscogroupe@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="text-primary">Envoyez-nous un message</h2>
                    <p className="text-muted">Nous vous répondons sous 24h</p>
                  </div>

                  {message && (
                    <div className="alert alert-success" role="alert">
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
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="subject" className="form-label">Sujet *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="6"
                        value={form.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100 py-2"
                      disabled={loading}
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="row mt-5">
            <div className="col-md-4 text-center mb-4">
              <div className="bg-light rounded-3 p-4 h-100">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                     style={{ width: '60px', height: '60px' }}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h5>Adresse</h5>
                <p className="text-muted mb-0">Abidjan, Côte d'Ivoire</p>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-light rounded-3 p-4 h-100">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                     style={{ width: '60px', height: '60px' }}>
                  <i className="fas fa-phone"></i>
                </div>
                <h5>Téléphone</h5>
                <p className="text-muted mb-0">+225 0768744768</p>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-light rounded-3 p-4 h-100">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                     style={{ width: '60px', height: '60px' }}>
                  <i className="fas fa-envelope"></i>
                </div>
                <h5>Email</h5>
                <p className="text-muted mb-0">apiscogroupe@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
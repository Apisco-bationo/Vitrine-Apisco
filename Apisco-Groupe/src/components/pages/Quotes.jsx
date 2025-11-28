import React, { useState } from 'react';
import api from '../api/api.js';

const Quotes = ({ user }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    description: '',
    budget: '',
    preferred_deadline: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.post('/quotes', form);
      setMessage('✅ Votre demande de devis a été envoyée avec succès !');
      setForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        description: '',
        budget: '',
        preferred_deadline: ''
      });
    } catch (error) {
      setMessage('❌ Erreur lors de l\'envoi du devis');
      console.error('Error submitting quote:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <h1 className="text-center text-primary mb-4">📋 Demande de Devis</h1>
              <p className="text-center text-muted mb-4">
                Décrivez votre projet et nous vous recontacterons sous 24h
              </p>

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
                    />
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
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="preferred_deadline" className="form-label">Date souhaitée</label>
                  <input
                    type="date"
                    className="form-control"
                    id="preferred_deadline"
                    name="preferred_deadline"
                    value={form.preferred_deadline}
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
                    placeholder="Décrivez en détail votre projet, vos besoins, vos attentes..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 py-3"
                  disabled={loading}
                >
                  {loading ? 'Envoi en cours...' : '📨 Envoyer ma demande de devis'}
                </button>
              </form>

              {!user && (
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Déjà client ? <a href="/login" className="text-primary">Connectez-vous</a> pour pré-remplir le formulaire
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
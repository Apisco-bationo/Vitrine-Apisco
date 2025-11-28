import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const OrderForm = ({ user, serviceId, onSuccess }) => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    service_id: serviceId || '',
    custom_description: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      navigate('/login', { state: { returnTo: '/dashboard' } });
      return;
    }

    try {
      const response = await api.post('/orders', form);
      
      if (onSuccess) {
        onSuccess(response.data.data);
      } else {
        navigate('/dashboard');
      }
      
      // Reset form
      setForm({
        service_id: serviceId || '',
        custom_description: '',
        amount: ''
      });
      
      alert('✅ Commande créée avec succès !');
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la création de la commande');
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
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">📦 Nouvelle Commande</h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="service_id" className="form-label">Service</label>
            <select
              className="form-select"
              id="service_id"
              name="service_id"
              value={form.service_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisir un service --</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.title} {service.price ? `- ${service.price} €` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="custom_description" className="form-label">
              Description détaillée *
            </label>
            <textarea
              className="form-control"
              id="custom_description"
              name="custom_description"
              rows="4"
              value={form.custom_description}
              onChange={handleChange}
              placeholder="Décrivez en détail votre projet, vos besoins spécifiques, vos attentes..."
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Budget estimé (€)
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Optionnel"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2"
            disabled={loading || !user}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Création en cours...
              </>
            ) : (
              '🚀 Créer la commande'
            )}
          </button>

          {!user && (
            <div className="alert alert-warning mt-3 text-center">
              <p className="mb-0">
                ⚠️ Vous devez être connecté pour créer une commande.
                <a href="/login" className="alert-link ms-1">Se connecter</a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
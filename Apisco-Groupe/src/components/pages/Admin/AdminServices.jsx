import React, { useState, useEffect } from 'react';
// @ts-expect-error: Pas de déclaration de type pour ce module JS/JSX
import api from '../../../api/api.js';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    active: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const serviceData = {
        ...form,
        price: form.price ? parseFloat(form.price) : null
      };

      if (editingService) {
        // Update existing service
        await api.put(`/admin/services/${editingService.id}`, serviceData);
        alert('✅ Service modifié avec succès !');
      } else {
        // Create new service
        await api.post('/admin/services', serviceData);
        alert('✅ Service créé avec succès !');
      }

      // Reset form and refresh
      resetForm();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('❌ Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setForm({
      title: service.title,
      description: service.description || '',
      price: service.price || '',
      duration: service.duration || '',
      active: service.active
    });
    setShowForm(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        await api.delete(`/admin/services/${serviceId}`);
        alert('✅ Service supprimé avec succès !');
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('❌ Erreur lors de la suppression');
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      price: '',
      duration: '',
      active: true
    });
    setEditingService(null);
    setShowForm(false);
  };

  const toggleActive = async (service) => {
    try {
      await api.put(`/admin/services/${service.id}`, {
        active: !service.active
      });
      fetchServices();
    } catch (error) {
      console.error('Error toggling service:', error);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">🛍️ Gestion des Services</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Annuler' : '+ Ajouter un Service'}
        </button>
      </div>

      {/* Service Form */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              {editingService ? '✏️ Modifier le Service' : '➕ Nouveau Service'}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">Titre *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">Prix (€)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    min="0"
                    step="0.01"
                    placeholder="Laisser vide pour 'Sur devis'"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="duration" className="form-label">Durée</label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="ex: 2-4 semaines"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Statut</label>
                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="active"
                      checked={form.active}
                      onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="active">
                      {form.active ? '🟢 Actif' : '🔴 Inactif'}
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description détaillée du service..."
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingService ? '💾 Modifier' : '🚀 Créer'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="row">
        {services.map(service => (
          <div key={service.id} className="col-md-6 col-lg-4 mb-4">
            <div className={`card h-100 ${service.active ? '' : 'bg-light'}`}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">{service.title}</h6>
                <span className={`badge ${service.active ? 'bg-success' : 'bg-secondary'}`}>
                  {service.active ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text small">{service.description}</p>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Prix:</span>
                    <strong className="text-dark">
                      {service.price ? `${service.price} €` : 'Sur devis'}
                    </strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Durée:</span>
                    <span className="text-dark">{service.duration || 'Non spécifié'}</span>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary flex-fill"
                    onClick={() => handleEdit(service)}
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-outline-warning flex-fill"
                    onClick={() => toggleActive(service)}
                  >
                    {service.active ? '🔴 Désactiver' : '🟢 Activer'}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(service.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && !showForm && (
        <div className="card text-center py-5">
          <div className="card-body">
            <h5 className="text-muted">Aucun service pour le moment</h5>
            <p className="text-muted">Commencez par créer votre premier service.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              + Créer un Service
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
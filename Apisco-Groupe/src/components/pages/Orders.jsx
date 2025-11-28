import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'bg-warning text-dark', text: '⏳ En attente' },
      in_progress: { class: 'bg-primary', text: '🚀 En cours' },
      done: { class: 'bg-success', text: '✅ Terminé' },
      cancelled: { class: 'bg-danger', text: '❌ Annulé' }
    };
    
    const config = statusConfig[status] || { class: 'bg-secondary', text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        <h1 className="text-primary">📦 Mes Commandes</h1>
        <Link to="/services" className="btn btn-primary">
          + Nouvelle Commande
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <h5 className="text-muted">Aucune commande pour le moment</h5>
            <p className="text-muted mb-4">
              Créez votre première commande pour commencer à travailler avec nous.
            </p>
            <Link to="/services" className="btn btn-primary btn-lg">
              🛍️ Voir les services
            </Link>
          </div>
        </div>
      ) : (
        <div className="row">
          {orders.map(order => (
            <div key={order.id} className="col-lg-6 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">
                    {order.service?.title || 'Service personnalisé'}
                  </h6>
                  {getStatusBadge(order.status)}
                </div>
                <div className="card-body">
                  <p className="card-text">{order.custom_description}</p>
                  
                  <div className="mb-3">
                    {order.amount && (
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Montant:</span>
                        <strong className="text-dark">{order.amount} €</strong>
                      </div>
                    )}
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Date:</span>
                      <span className="text-dark">{formatDate(order.created_at)}</span>
                    </div>
                  </div>

                  {order.admin_notes && (
                    <div className="alert alert-info mt-3">
                      <strong>Note de l'admin:</strong>
                      <p className="mb-0 mt-1">{order.admin_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
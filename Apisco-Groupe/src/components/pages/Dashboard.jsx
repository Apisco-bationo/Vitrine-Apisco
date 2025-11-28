import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const Dashboard = ({ user }) => {
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
      pending: { class: 'bg-warning', text: 'En attente' },
      in_progress: { class: 'bg-primary', text: 'En cours' },
      done: { class: 'bg-success', text: 'Terminé' },
      cancelled: { class: 'bg-danger', text: 'Annulé' }
    };
    
    const config = statusConfig[status] || { class: 'bg-secondary', text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
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
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">👋 Bonjour, {user?.name}</h5>
              <p className="text-muted">{user?.email}</p>
              {user?.company && <p className="text-muted">{user.company}</p>}
              
              <div className="mt-4">
                <Link to="/quotes" className="btn btn-primary w-100 mb-2">
                  📋 Demander un devis
                </Link>
                <Link to="/services" className="btn btn-outline-primary w-100">
                  🛍️ Voir les services
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">📦 Mes Commandes</h5>
            </div>
            <div className="card-body">
              {orders.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">Aucune commande pour le moment</p>
                  <Link to="/services" className="btn btn-primary">
                    Commander un service
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Description</th>
                        <th>Montant</th>
                        <th>Statut</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>
                            <strong>{order.service?.title || 'Service personnalisé'}</strong>
                          </td>
                          <td>{order.custom_description}</td>
                          <td>{order.amount ? `${order.amount} €` : 'Sur devis'}</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>{new Date(order.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
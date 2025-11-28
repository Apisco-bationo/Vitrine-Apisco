import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status, adminNotes = '') => {
    try {
      await api.patch(`/admin/orders/${orderId}`, {
        status,
        admin_notes: adminNotes
      });
      
      // Refresh orders
      fetchOrders();
      alert('✅ Statut mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('❌ Erreur lors de la mise à jour');
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
      <h1 className="text-primary mb-4">📦 Gestion des Commandes</h1>

      {orders.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <h5 className="text-muted">Aucune commande pour le moment</h5>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Service</th>
                <th>Description</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>
                    <div>
                      <strong>{order.user?.name}</strong>
                      <br/>
                      <small className="text-muted">{order.user?.email}</small>
                    </div>
                  </td>
                  <td>{order.service?.title || 'Personnalisé'}</td>
                  <td>
                    <small>{order.custom_description}</small>
                  </td>
                  <td>
                    {order.amount ? `${order.amount} €` : 'Sur devis'}
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => updateOrderStatus(order.id, 'in_progress', 'Traitement en cours')}
                      >
                        En cours
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => updateOrderStatus(order.id, 'done', 'Commande terminée')}
                      >
                        Terminer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
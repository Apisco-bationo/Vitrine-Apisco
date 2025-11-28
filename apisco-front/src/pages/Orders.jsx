import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my')
      setOrders(response.data.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'bg-warning text-dark', text: '⏳ En attente', icon: '⏳' },
      in_progress: { class: 'bg-primary', text: '🚀 En cours', icon: '🚀' },
      done: { class: 'bg-success', text: '✅ Terminé', icon: '✅' },
      cancelled: { class: 'bg-danger', text: '❌ Annulé', icon: '❌' }
    }
    
    const config = statusConfig[status] || { class: 'bg-secondary', text: status, icon: '❓' }
    return (
      <span className={`badge ${config.class} d-flex align-items-center`}>
        <span className="me-1">{config.icon}</span>
        {config.text}
      </span>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price) => {
    return price ? `${parseFloat(price).toLocaleString('fr-FR')} €` : 'Sur devis'
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <section className="bg-primary text-white py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">📦 Mes Commandes</h1>
            <Link to="/services" className="btn btn-light btn-sm">
              + Nouvelle Commande
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {orders.length === 0 ? (
            <div className="card text-center py-5">
              <div className="card-body">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-4"
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-box-open fa-2x"></i>
                </div>
                <h5 className="text-muted mb-3">Aucune commande pour le moment</h5>
                <p className="text-muted mb-4">
                  Créez votre première commande pour commencer à travailler avec nous.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/services" className="btn btn-primary btn-lg">
                    🛍️ Voir les services
                  </Link>
                  <Link to="/quotes" className="btn btn-outline-primary btn-lg">
                    📋 Demander un devis
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="row mb-4">
                <div className="col-12">
                  <div className="bg-light rounded-3 p-4">
                    <div className="row text-center">
                      <div className="col-md-3">
                        <h4 className="text-primary mb-1">{orders.length}</h4>
                        <small className="text-muted">Commandes totales</small>
                      </div>
                      <div className="col-md-3">
                        <h4 className="text-primary mb-1">
                          {orders.filter(o => o.status === 'pending').length}
                        </h4>
                        <small className="text-muted">En attente</small>
                      </div>
                      <div className="col-md-3">
                        <h4 className="text-primary mb-1">
                          {orders.filter(o => o.status === 'in_progress').length}
                        </h4>
                        <small className="text-muted">En cours</small>
                      </div>
                      <div className="col-md-3">
                        <h4 className="text-primary mb-1">
                          {orders.filter(o => o.status === 'done').length}
                        </h4>
                        <small className="text-muted">Terminées</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {orders.map(order => (
                  <div key={order.id} className="col-lg-6 mb-4">
                    <div className="card h-100 hover-lift">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">
                          {order.service?.title || 'Service personnalisé'}
                        </h6>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="card-body">
                        <p className="card-text">{order.custom_description}</p>
                        
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Montant:</span>
                            <strong className="text-dark">{formatPrice(order.amount)}</strong>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Date de création:</span>
                            <span className="text-dark">{formatDate(order.created_at)}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Dernière mise à jour:</span>
                            <span className="text-dark">{formatDate(order.updated_at)}</span>
                          </div>
                        </div>

                        {order.admin_notes && (
                          <div className="alert alert-info mt-3">
                            <strong>📝 Note de l'équipe:</strong>
                            <p className="mb-0 mt-1 small">{order.admin_notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="card-footer bg-transparent">
                        <small className="text-muted">
                          Référence: <strong>CMD-{order.id.toString().padStart(4, '0')}</strong>
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Orders
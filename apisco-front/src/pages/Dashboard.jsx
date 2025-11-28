import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

const Dashboard = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const ordersResponse = await api.get('/orders/my')
      const userOrders = ordersResponse.data.data
      
      setOrders(userOrders.slice(0, 3)) // Only show 3 latest orders
      setStats({
        totalOrders: userOrders.length,
        pendingOrders: userOrders.filter(order => order.status === 'pending').length,
        completedOrders: userOrders.filter(order => order.status === 'done').length
      })
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'bg-warning text-dark', text: '⏳' },
      in_progress: { class: 'bg-primary', text: '🚀' },
      done: { class: 'bg-success', text: '✅' },
      cancelled: { class: 'bg-danger', text: '❌' }
    }
    
    const config = statusConfig[status] || { class: 'bg-secondary', text: '❓' }
    return <span className={`badge ${config.class}`}>{config.text}</span>
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
    <div className="dashboard-page">
      <section className="bg-primary text-white py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1">Tableau de Bord</h1>
              <p className="mb-0 opacity-75">Bienvenue, {user?.name} 👋</p>
            </div>
            <div className="text-end">
              <small className="d-block opacity-75">{user?.email}</small>
              {user?.company && <small className="opacity-75">{user.company}</small>}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-4 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                       style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-user fa-2x"></i>
                  </div>
                  <h5 className="card-title">{user?.name}</h5>
                  <p className="text-muted small">{user?.email}</p>
                  {user?.company && (
                    <p className="text-muted small mb-3">{user.company}</p>
                  )}
                  
                  <div className="d-grid gap-2">
                    <Link to="/services" className="btn btn-primary">
                      🛍️ Voir les services
                    </Link>
                    <Link to="/quotes" className="btn btn-outline-primary">
                      📋 Demander un devis
                    </Link>
                    <Link to="/contact" className="btn btn-outline-secondary">
                      💬 Support
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card mt-4">
                <div className="card-header bg-transparent">
                  <h6 className="mb-0">📊 Statistiques</h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Commandes totales:</span>
                    <strong>{stats.totalOrders}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>En attente:</span>
                    <strong className="text-warning">{stats.pendingOrders}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Terminées:</span>
                    <strong className="text-success">{stats.completedOrders}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-8">
              {/* Welcome Card */}
              <div className="card bg-light border-0 mb-4">
                <div className="card-body">
                  <h5 className="card-title text-primary">Bienvenue sur votre espace client</h5>
                  <p className="card-text text-muted">
                    Gérez vos commandes, suivez l'avancement de vos projets et accédez à tous nos services.
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="card">
                <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">📦 Commandes Récentes</h6>
                  <Link to="/orders" className="btn btn-sm btn-outline-primary">
                    Voir tout
                  </Link>
                </div>
                <div className="card-body">
                  {orders.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                      <p className="text-muted mb-3">Aucune commande pour le moment</p>
                      <Link to="/services" className="btn btn-primary">
                        Commander un service
                      </Link>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {orders.map(order => (
                        <div key={order.id} className="list-group-item px-0">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{order.service?.title || 'Service personnalisé'}</h6>
                              <p className="mb-1 text-muted small">
                                {order.custom_description.substring(0, 80)}...
                              </p>
                              <small className="text-muted">
                                Créé le {new Date(order.created_at).toLocaleDateString()}
                              </small>
                            </div>
                            <div className="text-end">
                              {getStatusBadge(order.status)}
                              {order.amount && (
                                <div className="mt-1">
                                  <strong>{order.amount} €</strong>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="row mt-4">
                <div className="col-md-6 mb-3">
                  <div className="card text-center h-100 hover-lift">
                    <div className="card-body">
                      <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                           style={{ width: '60px', height: '60px' }}>
                        <i className="fas fa-plus"></i>
                      </div>
                      <h6>Nouvelle Commande</h6>
                      <p className="text-muted small mb-3">Commander un nouveau service</p>
                      <Link to="/services" className="btn btn-sm btn-primary">
                        Commander
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card text-center h-100 hover-lift">
                    <div className="card-body">
                      <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
                           style={{ width: '60px', height: '60px' }}>
                        <i className="fas fa-file-invoice"></i>
                      </div>
                      <h6>Demande de Devis</h6>
                      <p className="text-muted small mb-3">Obtenir un devis personnalisé</p>
                      <Link to="/quotes" className="btn btn-sm btn-primary">
                        Demander
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
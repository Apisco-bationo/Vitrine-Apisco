import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api' // Chemin corrigé

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalQuotes: 0,
    newQuotes: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [ordersRes, quotesRes] = await Promise.all([
        api.get('/admin/orders'),
        api.get('/admin/quotes')
      ])

      const orders = ordersRes.data.data
      const quotes = quotesRes.data.data

      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        totalQuotes: quotes.length,
        newQuotes: quotes.filter(q => q.status === 'new').length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
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
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="text-primary">👑 Tableau de Bord Admin</h1>
        <span className="text-muted">Connecté en tant que {user.name}</span>
      </div>

      {/* Stats Cards */}
      <div className="row mb-5">
        <div className="col-md-3 mb-4">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3>{stats.totalOrders}</h3>
              <p className="mb-0">Commandes Total</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card bg-warning text-dark">
            <div className="card-body text-center">
              <h3>{stats.pendingOrders}</h3>
              <p className="mb-0">En Attente</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h3>{stats.totalQuotes}</h3>
              <p className="mb-0">Devis Total</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3>{stats.newQuotes}</h3>
              <p className="mb-0">Nouveaux Devis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">📦 Commandes</h5>
              <p className="card-text">Gérer les commandes clients</p>
              <Link to="/admin/orders" className="btn btn-primary w-100">
                Gérer les Commandes
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">🛍️ Services</h5>
              <p className="card-text">Gérer les services</p>
              <Link to="/admin/services" className="btn btn-primary w-100">
                Gérer les Services
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">📋 Devis</h5>
              <p className="card-text">Voir les demandes de devis</p>
              <Link to="/admin/quotes" className="btn btn-primary w-100">
                Voir les Devis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
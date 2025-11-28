import React, { useState, useEffect } from 'react'
import api from '../../api/api'

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await api.get('/admin/quotes')
      setQuotes(response.data.data)
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuoteStatus = async (quoteId, status) => {
    try {
      // Implémentez la mise à jour du statut
      alert('Statut mis à jour !')
      fetchQuotes()
    } catch (error) {
      console.error('Error updating quote:', error)
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
      <h1 className="text-primary mb-4">📋 Gestion des Devis</h1>

      {quotes.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <h5 className="text-muted">Aucun devis pour le moment</h5>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Email</th>
                <th>Description</th>
                <th>Budget</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(quote => (
                <tr key={quote.id}>
                  <td>#{quote.id}</td>
                  <td>{quote.name}</td>
                  <td>{quote.email}</td>
                  <td>
                    <small>{quote.description.substring(0, 50)}...</small>
                  </td>
                  <td>
                    {quote.budget ? `${quote.budget} €` : 'Non spécifié'}
                  </td>
                  <td>
                    <span className={`badge ${
                      quote.status === 'new' ? 'bg-warning' : 
                      quote.status === 'accepted' ? 'bg-success' : 'bg-secondary'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td>
                    {new Date(quote.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminQuotes
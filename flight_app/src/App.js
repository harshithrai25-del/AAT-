
import React, { useState, useEffect } from 'react';
import { flightService } from './services/flightService';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState({ source: '', destination: '', date: '' });
  const [newFlight, setNewFlight] = useState({ flightCode: '', flightName: '', make: '', capacity: 180, source: '', destination: '', date: '', basePrice: 4000, active: true });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    const res = await flightService.getFlights();
    setFlights(res.data);
  };

  const handleSaveFlight = async (e) => {
    e.preventDefault();
    if (editId) {
      await flightService.updateFlight(editId, newFlight);
    } else {
      await flightService.addFlight(newFlight);
    }
    resetForm();
    loadFlights();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight record?')) {
      await flightService.deleteFlight(id);
      loadFlights();
    }
  };

  const handleEdit = (flight) => {
    setEditId(flight.id);
    setNewFlight(flight);
  };

  const resetForm = () => {
    setEditId(null);
    setNewFlight({ flightCode: '', flightName: '', make: '', capacity: 180, source: '', destination: '', date: '', basePrice: 4000, active: true });
  };

  return (
    <div className="container mt-4">
      <header className="pb-3 mb-4 border-bottom d-flex justify-content-between align-items-center">
        <h2>✈️ Travel Service System - Airline Booking & Management</h2>
        <span className="badge bg-primary fs-6">Student: Harshith R (1BM25AI061)</span>
      </header>

      {/* Flight Registration Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5>{editId ? 'Edit Flight Registration' : 'Register New Flight'}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSaveFlight} className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Flight Code</label>
              <input type="text" className="form-control" required value={newFlight.flightCode} onChange={e => setNewFlight({...newFlight, flightCode: e.target.value})} placeholder="e.g. AI-202" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Flight Name</label>
              <input type="text" className="form-control" required value={newFlight.flightName} onChange={e => setNewFlight({...newFlight, flightName: e.target.value})} placeholder="Air India" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Source</label>
              <input type="text" className="form-control" required value={newFlight.source} onChange={e => setNewFlight({...newFlight, source: e.target.value})} placeholder="Bengaluru" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Destination</label>
              <input type="text" className="form-control" required value={newFlight.destination} onChange={e => setNewFlight({...newFlight, destination: e.target.value})} placeholder="Delhi" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Departure Date</label>
              <input type="date" className="form-control" required value={newFlight.date} onChange={e => setNewFlight({...newFlight, date: e.target.value})} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Base Price (₹)</label>
              <input type="number" className="form-control" required value={newFlight.basePrice} onChange={e => setNewFlight({...newFlight, basePrice: parseInt(e.target.value)})} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Capacity</label>
              <input type="number" className="form-control" required value={newFlight.capacity} onChange={e => setNewFlight({...newFlight, capacity: parseInt(e.target.value)})} />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button type="submit" className="btn btn-success me-2">{editId ? 'Update Flight' : 'Save Flight'}</button>
              {editId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>

      {/* Flight Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5>Scheduled Flights List</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Route</th>
                <th>Date</th>
                <th>Fare (₹)</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map(f => (
                <tr key={f.id}>
                  <td><strong>{f.flightCode}</strong></td>
                  <td>{f.flightName}</td>
                  <td>{f.source} ➔ {f.destination}</td>
                  <td>{f.date}</td>
                  <td>₹{f.basePrice}</td>
                  <td>{f.capacity} seats</td>
                  <td><span className={`badge ${f.active ? 'bg-success' : 'bg-danger'}`}>{f.active ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(f)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(f.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

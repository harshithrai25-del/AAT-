
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const flightService = {
  getFlights: () => axios.get(`${API_BASE}/flights`),
  addFlight: (flight) => axios.post(`${API_BASE}/flights`, flight),
  updateFlight: (id, flight) => axios.put(`${API_BASE}/flights/${id}`, flight),
  deleteFlight: (id) => axios.delete(`${API_BASE}/flights/${id}`),
  searchFlights: (source, destination, date) => 
    axios.get(`${API_BASE}/flights?source=${source}&destination=${destination}&date=${date}`),
  getReservations: () => axios.get(`${API_BASE}/reservations`),
  createReservation: (res) => axios.post(`${API_BASE}/reservations`, res),
  cancelReservation: (id) => axios.delete(`${API_BASE}/reservations/${id}`)
};

// lib/api.js
import axios from 'axios';

const api = axios.create({
//   baseURL: 'https://api.turmusayacreations.com/api',
  baseURL: 'http://localhost:5000/api',
});

export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vamucome.onrender.com',
});

export default api;
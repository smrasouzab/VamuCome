import axios from 'axios';

// https://jsonplaceholder.typicode.com

const api = axios.create({
    baseURL: 'http://localhost:8082',
});

export default api;
import axios from 'axios';

// https://jsonplaceholder.typicode.com

const api = axios.create({
    baseURL: 'http://127.0.0.1:8082',
});

export default api;
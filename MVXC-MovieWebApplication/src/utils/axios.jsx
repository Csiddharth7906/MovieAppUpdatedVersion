import axios from "axios";

// Use your backend proxy server
const BACKEND_PROXY = 'http://localhost:5000/api/tmdb';

const instance = axios.create({
    baseURL: BACKEND_PROXY,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

export default instance;
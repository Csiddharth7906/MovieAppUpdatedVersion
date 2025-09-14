import axios from "axios";

// Use your deployed backend proxy server
const BACKEND_PROXY = process.env.NODE_ENV === 'production' 
    ? 'https://mvxc-movie-backend.onrender.com/api/tmdb'
    : 'http://localhost:5000/api/tmdb';

const instance = axios.create({
    baseURL: BACKEND_PROXY,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000 // Increased timeout for production
});

export default instance;
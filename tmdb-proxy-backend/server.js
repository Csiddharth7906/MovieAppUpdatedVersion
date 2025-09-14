const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://siddharthchauhan_0:Siddharth0@cluster0.y4bqnrh.mongodb.net/mvxc-movie-app';

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://your-frontend-domain.netlify.app']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// TMDB API configuration with CORS proxy fallbacks
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY || '6babd480b42257f8eb8b6fb026f2ddea';
const TMDB_TOKEN = process.env.TMDB_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmFiZDQ4MGI0MjI1N2Y4ZWI4YjZmYjAyNmYyZGRlYSIsIm5iZiI6MTc1MDEzNzQ0OS44NDUsInN1YiI6IjY4NTBmYTY5OGUwMjhhNDFjYjA2NWMzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SGWaaRsbBLhCYn1WiiL70oCwKAwxRG52mWei7BZzsAk';

// Working CORS proxy services - prioritize fastest ones
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://corsproxy.io/?',
  'https://cors.bridged.cc/'
];

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Rate limiting
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 30;

// Try multiple methods to reach TMDB API
const tryTMDBRequest = async (tmdbPath, queryParams) => {
  // Add API key to query params for all requests
  const allParams = { ...queryParams, api_key: TMDB_API_KEY };
  const fullUrl = `${TMDB_BASE_URL}/${tmdbPath}`;

  // Method 1: Try CORS proxies first (more reliable)
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    try {
      const urlWithParams = `${fullUrl}?${new URLSearchParams(allParams).toString()}`;
      let proxyUrl;
      
      if (CORS_PROXIES[i].includes('allorigins')) {
        proxyUrl = `${CORS_PROXIES[i]}${encodeURIComponent(urlWithParams)}`;
      } else if (CORS_PROXIES[i].includes('codetabs')) {
        proxyUrl = `${CORS_PROXIES[i]}${urlWithParams}`;
      } else {
        proxyUrl = `${CORS_PROXIES[i]}${urlWithParams}`;
      }
      
      console.log(`Trying proxy ${i + 1}: ${CORS_PROXIES[i]}`);
      
      const response = await axios.get(proxyUrl, {
        headers: {
          'accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });
      
      console.log(`✅ Proxy ${i + 1} succeeded`);
      return response.data;
    } catch (error) {
      console.log(`❌ Proxy ${i + 1} failed: ${error.message}`);
    }
  }

  // Method 2: Direct request as fallback
  try {
    console.log(`Trying direct request to: ${fullUrl}`);
    const response = await axios.get(fullUrl, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      params: allParams,
      timeout: 8000
    });
    console.log(`✅ Direct request succeeded`);
    return response.data;
  } catch (error) {
    console.log(`❌ Direct request failed: ${error.message}`);
  }

  throw new Error('All methods failed to reach TMDB API');
};

// Rate limiting middleware
const rateLimiter = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    const clientData = requestCounts.get(clientIP);
    
    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + RATE_LIMIT_WINDOW;
    } else {
      clientData.count++;
    }
    
    if (clientData.count > MAX_REQUESTS_PER_MINUTE) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
      });
    }
  }
  
  next();
};

// Proxy endpoint for TMDB API with enhanced error handling
app.get('/api/tmdb/*', rateLimiter, async (req, res) => {
  try {
    const tmdbPath = req.params[0];
    const queryParams = req.query;
    const cacheKey = `${tmdbPath}?${new URLSearchParams(queryParams).toString()}`;
    
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log(`Cache hit for: ${tmdbPath}`);
      return res.json(cachedData.data);
    }
    
    console.log(`Proxying request to: ${TMDB_BASE_URL}/${tmdbPath}`);
    
    const responseData = await tryTMDBRequest(tmdbPath, queryParams);
    
    // Cache successful response
    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now()
    });
    
    // Clean old cache entries periodically
    if (cache.size > 100) {
      const now = Date.now();
      for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
          cache.delete(key);
        }
      }
    }
    
    res.json(responseData);
  } catch (error) {
    console.error('TMDB API Error:', error.message);
    
    let statusCode = 500;
    let errorMessage = 'Failed to fetch data from TMDB';
    
    if (error.code === 'ECONNABORTED') {
      statusCode = 408;
      errorMessage = 'Request timeout - TMDB API is slow to respond';
    } else if (error.response) {
      statusCode = error.response.status;
      if (statusCode === 429) {
        errorMessage = 'TMDB API rate limit exceeded. Please try again later.';
      } else if (statusCode === 401) {
        errorMessage = 'TMDB API authentication failed';
      } else if (statusCode >= 500) {
        errorMessage = 'TMDB API server error';
      }
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      statusCode = 503;
      errorMessage = 'Cannot connect to TMDB API - network issue';
    }
    
    res.status(statusCode).json({
      error: errorMessage,
      message: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    message: 'TMDB Proxy Server for bypassing Jio network restrictions'
  });
});

// Routes
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'TMDB Proxy Server',
    endpoints: {
      health: '/health',
      tmdb: '/api/tmdb/*',
      auth: '/api/auth/*'
    },
    usage: 'Use /api/tmdb/ followed by any TMDB API endpoint'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TMDB Proxy Server running on port ${PORT}`);
  console.log(`🔐 Authentication endpoints available at /api/auth`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🎬 TMDB API proxy: http://localhost:${PORT}/api/tmdb/`);
});

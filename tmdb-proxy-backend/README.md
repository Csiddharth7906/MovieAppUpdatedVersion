# TMDB Proxy Backend

This backend server acts as a proxy for the TMDB API to bypass network restrictions (especially Jio network blocking).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Usage

The server runs on `http://localhost:5000` by default.

### Endpoints

- **Health Check**: `GET /health`
- **TMDB Proxy**: `GET /api/tmdb/*`

### Example Requests

```bash
# Get popular movies
curl http://localhost:5000/api/tmdb/movie/popular

# Search movies
curl http://localhost:5000/api/tmdb/search/movie?query=avengers

# Get movie details
curl http://localhost:5000/api/tmdb/movie/550
```

## Frontend Integration

Update your frontend axios configuration to use this proxy server instead of calling TMDB API directly.

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

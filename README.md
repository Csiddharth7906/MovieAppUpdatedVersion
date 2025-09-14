# MVXC Movie Web Application

A full-stack movie streaming web application built with React.js frontend and Node.js backend, featuring TMDB API integration and user authentication.

## 🎬 Features

### Frontend (React.js)
- **Movie & TV Show Browsing**: Browse trending, popular, and categorized content
- **In-App Streaming**: Watch movies and TV shows directly in the app
- **Responsive Design**: Mobile-first design with desktop optimization
- **User Authentication**: Login, signup, and profile management
- **Watchlist & Favorites**: Save content for later viewing
- **Search Functionality**: Find movies, TV shows, and people
- **Episode Navigation**: Season and episode selection for TV shows

### Backend (Node.js)
- **TMDB API Proxy**: Bypass network restrictions with multiple proxy methods
- **User Authentication**: JWT-based authentication system
- **MongoDB Integration**: User data and preferences storage
- **Rate Limiting**: API protection and caching
- **CORS Configuration**: Production-ready CORS settings

## 🚀 Tech Stack

**Frontend:**
- React.js 18
- Redux Toolkit (State Management)
- React Router (Navigation)
- Tailwind CSS (Styling)
- Axios (HTTP Client)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)
- CORS & Rate Limiting

## 📁 Project Structure

```
├── MVXC-MovieWebApplication/     # Frontend React App
│   ├── src/
│   │   ├── components/          # React Components
│   │   ├── templates/           # Reusable UI Templates
│   │   ├── store/              # Redux Store & Actions
│   │   ├── contexts/           # React Contexts
│   │   └── utils/              # Utility Functions
│   └── public/                 # Static Assets
│
└── tmdb-proxy-backend/          # Backend API Server
    ├── routes/                 # API Routes
    ├── models/                 # MongoDB Models
    └── server.js              # Main Server File
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- TMDB API key

### Backend Setup
```bash
cd tmdb-proxy-backend
npm install
cp .env.example .env
# Fill in your environment variables in .env
npm run dev
```

### Frontend Setup
```bash
cd MVXC-MovieWebApplication
npm install
npm run dev
```

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables in Render dashboard
5. Deploy with build command: `npm install` and start command: `npm start`

### Frontend (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `dist` folder to your preferred hosting service
3. Update backend CORS settings with your frontend URL

## 🔧 Environment Variables

### Backend (.env)
```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
TMDB_TOKEN=your_tmdb_bearer_token
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=your_frontend_domain
```

## 📱 Features Overview

- **Home Page**: Trending content with dynamic wallpapers
- **Movie/TV Pages**: Categorized browsing with infinite scroll
- **Detail Pages**: Comprehensive information with trailers and recommendations
- **Streaming Player**: Full-screen capable player with episode navigation
- **User System**: Authentication, watchlist, and favorites
- **Search**: Global search across movies, TV shows, and people
- **Responsive**: Mobile-optimized with hamburger navigation

## 🎯 API Endpoints

### TMDB Proxy
- `GET /api/tmdb/*` - Proxy all TMDB API requests

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/watchlist` - Manage watchlist
- `POST /api/auth/favorites` - Manage favorites

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- CORS protection
- Environment variable security

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

Built with ❤️ for movie enthusiasts

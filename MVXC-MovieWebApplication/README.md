# 🎬 MVXC - Movie Web Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)](https://mvxc-movie-web-application.vercel.app/)
[![React](https://img.shields.io/badge/React-19+-blue)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)](https://redux-toolkit.js.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3+-orange)](https://vitejs.dev/)

A modern, feature-rich movie web application that brings the cinema experience to your browser. Discover trending movies, explore TV shows, search for your favorite actors, and enjoy seamless streaming with a sleek, responsive interface.

## 🌟 Live Demo

**🔗 Website**: [https://mvxc-movie-web-application.vercel.app/](https://mvxc-movie-web-application.vercel.app/)

**📱 GitHub**: [https://github.com/Csiddharth7906/MVXC-MovieWebApplication](https://github.com/Csiddharth7906/MVXC-MovieWebApplication)

> **⚠️ Network Compatibility Note**: Some ISPs (like Jio) may block access to movie APIs. If you experience connectivity issues, try using a VPN or switch to WiFi for optimal performance.

## ✨ Key Features

- 🎥 **Movie Discovery** - Browse trending and popular movies with detailed information
- 📺 **TV Shows Hub** - Explore latest TV series and episodes
- 👤 **People Search** - Find actors, directors, and cast information
- 🎬 **Movie Streaming** - Watch movies directly through 2embed integration
- 🔍 **Smart Search** - Powerful search functionality across movies, TV shows, and people
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ♾️ **Infinite Scroll** - Seamless browsing experience with lazy loading
- 🎭 **Rich Details** - Comprehensive movie/TV show details with trailers
- 🚀 **Fast Performance** - Built with Vite for lightning-fast loading

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1+ | Frontend framework |
| **Redux Toolkit** | 2.8+ | State management |
| **Tailwind CSS** | 4.1+ | Styling framework |
| **Vite** | 6.3+ | Build tool & dev server |
| **React Router** | 7.6+ | Client-side routing |
| **Axios** | 1.10+ | HTTP client |
| **React Player** | 2.16+ | Video player component |
| **React Infinite Scroll** | 6.1+ | Infinite scrolling |

## 🏗️ Project Architecture

```
src/
├── components/           # Main application components
│   ├── Home.jsx         # Landing page with trending content
│   ├── Movie.jsx        # Movie browsing page
│   ├── Moviedetails.jsx # Detailed movie information
│   ├── Tvshows.jsx      # TV shows catalog
│   ├── Tvdetails.jsx    # TV show details
│   ├── People.jsx       # People/cast search
│   ├── PersonDetails.jsx # Actor/director profiles
│   ├── Popular.jsx      # Popular content section
│   ├── Trending.jsx     # Trending movies/shows
│   ├── Loading.jsx      # Loading spinner component
│   └── NotFound.jsx     # 404 error page
├── store/               # Redux state management
│   ├── actions/         # Redux actions
│   │   ├── movieAction.jsx    # Movie-related actions
│   │   ├── tvAction.jsx       # TV show actions
│   │   └── personAction.jsx   # People search actions
│   ├── reducers/        # Redux reducers
│   │   ├── movieSlice.jsx     # Movie state slice
│   │   ├── tvSlice.jsx        # TV show state slice
│   │   └── personSlice.jsx    # Person state slice
│   └── store.jsx        # Redux store configuration
├── templates/           # Reusable UI components
│   ├── Header.jsx       # Main navigation header
│   ├── Sidenav.jsx      # Sidebar navigation
│   ├── Topnav.jsx       # Top navigation bar
│   ├── Cards.jsx        # Movie/TV show cards
│   ├── HorizontalCards.jsx # Horizontal scrolling cards
│   ├── DropDown.jsx     # Dropdown menus
│   └── Trailer.jsx      # Video trailer component
├── utils/               # Utility functions
│   └── axios.jsx        # API configuration
├── App.jsx              # Root component
├── index.css            # Global styles
└── main.jsx             # Application entry point
```

## 🎯 Core Features

### 🎬 Movie Experience
- **Trending Movies** - Latest and most popular movies
- **Movie Details** - Cast, crew, ratings, synopsis, and trailers
- **Movie Streaming** - Direct video playback using 2embed
- **Genre Filtering** - Browse movies by categories

### 📺 TV Shows
- **TV Series Discovery** - Popular and trending TV shows
- **Episode Information** - Season and episode details
- **Show Streaming** - Watch TV episodes online
- **Series Tracking** - Follow your favorite shows

### 👥 People & Cast
- **Actor Profiles** - Detailed information about actors and directors
- **Filmography** - Complete list of movies and TV shows
- **Biography** - Background information and career highlights
- **Photo Galleries** - High-quality actor photos

### 🔍 Search & Discovery
- **Global Search** - Search across movies, TV shows, and people
- **Smart Suggestions** - Auto-complete and related content
- **Advanced Filters** - Filter by genre, year, rating, and more
- **Infinite Scroll** - Seamless content loading

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Internet connection for API calls

### Installation

```bash
# Clone the repository
git clone https://github.com/Csiddharth7906/MVXC-MovieWebApplication.git

# Navigate to project directory
cd MVXC-MovieWebApplication

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# 2embed Streaming Configuration
VITE_EMBED_BASE_URL=https://www.2embed.to/embed

# Optional: Custom API endpoints
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```

### API Integration

#### TMDB API
- **Movies**: Trending, popular, search, and detailed information
- **TV Shows**: Series data, episodes, and cast information
- **People**: Actor/director profiles and filmographies
- **Images**: Posters, backdrops, and profile photos

#### 2embed Streaming
- **Movie Streaming**: Direct video playback integration
- **TV Episode Streaming**: Series episode playback
- **Multiple Sources**: Fallback streaming options

## 📱 Screenshots

<details>
<summary>View Application Screenshots</summary>

### 🏠 Home Page
![Home Page](./public/home-screenshot.png)

### 🎬 Movie Details
![Movie Details](./public/movie-details-screenshot.png)

### 📺 TV Shows
![TV Shows](./public/tv-shows-screenshot.png)

### 👤 Person Profile
![Person Profile](./public/person-profile-screenshot.png)

</details>

## 🔍 API Testing

### Sample API Requests

#### Get Trending Movies
```bash
curl -X GET "https://api.themoviedb.org/3/trending/movie/day?api_key=YOUR_API_KEY"
```

#### Search Movies
```bash
curl -X GET "https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=avengers"
```

#### Get Movie Details
```bash
curl -X GET "https://api.themoviedb.org/3/movie/550?api_key=YOUR_API_KEY"
```

## 🛠️ Troubleshooting

### Common Issues

#### Network Connectivity Problems
```bash
# Issue: API calls failing on certain networks (Jio, etc.)
# Solutions:
1. Use VPN to bypass ISP restrictions
2. Switch to WiFi network
3. Try mobile hotspot
4. Contact ISP about API access
```

#### Slow Loading
```bash
# Issue: Slow image/video loading
# Solutions:
1. Check internet connection speed
2. Enable image optimization
3. Use CDN for static assets
4. Implement lazy loading (already included)
```

#### Build Issues
```bash
# Clear cache and reinstall
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🎨 Customization

### Theming
```css
/* Custom theme colors in index.css */
:root {
  --primary-color: #1f2937;
  --secondary-color: #3b82f6;
  --accent-color: #f59e0b;
  --text-color: #ffffff;
}
```

### Component Styling
```jsx
// Tailwind classes for custom styling
<div className="bg-gray-900 text-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
  {/* Your content */}
</div>
```

## 🚧 Roadmap & Future Enhancements

### Phase 1 (Current)
- ✅ Movie and TV show browsing
- ✅ Search functionality
- ✅ Streaming integration
- ✅ Responsive design

### Phase 2 (In Development)
- 🔄 **User Authentication** - Personal watchlists and favorites
- 🔄 **Reviews & Ratings** - User-generated content
- 🔄 **Recommendation Engine** - AI-powered suggestions
- 🔄 **Offline Mode** - Progressive Web App features

### Phase 3 (Planned)
- 📱 **Mobile App** - React Native version
- 🎮 **Interactive Features** - Quizzes and games
- 🌍 **Multi-language** - International content support
- 🔔 **Push Notifications** - New release alerts

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add proper error handling for API calls
- Test on multiple devices and networks
- Update documentation for new features
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TMDB API** - For comprehensive movie and TV show data
- **2embed** - For streaming capabilities
- **Tailwind CSS** - For beautiful, responsive styling
- **React Community** - For amazing libraries and tools
- **Vercel** - For seamless deployment and hosting

## 👨‍💻 Author

**Siddharth Chauhan**
- 📧 Email: [siddharthchauhan7906@gmail.com](mailto:siddharthchauhan7906@gmail.com)
- 🐱 GitHub: [@Csiddharth7906](https://github.com/Csiddharth7906)
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/siddharth-chauhan-3496982b1)
- 🌐 Portfolio: [Visit my other projects](https://github.com/Csiddharth7906)

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>🎬 <strong>Enjoy watching movies with MVXC!</strong></p>
  <p>Made with ❤️ and 🍿 by <a href="https://github.com/Csiddharth7906">Siddharth Chauhan</a></p>
</div>

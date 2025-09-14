import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

const Landing = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular, topRated] = await Promise.all([
          axios.get('/trending/movie/day'),
          axios.get('/movie/popular'),
          axios.get('/movie/top_rated')
        ]);
        
        setTrendingMovies(trending.data.results.slice(0, 10));
        setPopularMovies(popular.data.results.slice(0, 8));
        setTopRatedMovies(topRated.data.results.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trendingMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trendingMovies.length]);

  const currentMovie = trendingMovies[currentSlide];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1F1E24] via-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#D2042D]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F1E24] via-gray-900 to-black text-white overflow-x-hidden w-full">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#1F1E24]/80 backdrop-blur-lg border-b border-[#D2042D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img src="/mvxclogo.jpg" alt="MVXC Logo" className="h-8 w-8 rounded-full object-cover" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#D2042D] to-red-400 bg-clip-text text-transparent">
                MVXC
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/trending" className="hover:text-[#D2042D] transition-colors">Trending</Link>
              <Link to="/movie" className="hover:text-[#D2042D] transition-colors">Movies</Link>
              <Link to="/tv" className="hover:text-[#D2042D] transition-colors">TV Shows</Link>
              <Link to="/person" className="hover:text-[#D2042D] transition-colors">People</Link>
            </div>
            <Link 
              to="/auth" 
              className="bg-gradient-to-r from-[#D2042D] to-red-600 px-6 py-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {currentMovie && (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          </div>
        )}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-red-200 bg-clip-text text-transparent animate-pulse">
            Discover Movies
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Explore millions of movies, TV shows, and discover your next favorite entertainment
          </p>
          
          {currentMovie && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-yellow-400">
                Now Trending: {currentMovie.title}
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto line-clamp-3">
                {currentMovie.overview}
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/home"
              className="bg-gradient-to-r from-[#D2042D] to-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <i className="ri-play-fill mr-2"></i>
              Start Exploring
            </Link>
            <Link 
              to="/movie"
              className="border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <i className="ri-movie-fill mr-2"></i>
              Browse Movies
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {trendingMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#D2042D] scale-125' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#D2042D] to-red-400 bg-clip-text text-transparent">
            Popular Movies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {popularMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/details/${movie.id}`}
                className="group relative overflow-hidden rounded-xl transform transition-all duration-300 hover:scale-105 hover:z-10"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center text-xs text-yellow-400">
                      <i className="ri-star-fill mr-1"></i>
                      {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F1E24]/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#D2042D] to-red-400 bg-clip-text text-transparent">
            Why Choose MVXC?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-[#D2042D] to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-search-line text-3xl"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Smart Discovery</h3>
              <p className="text-gray-300">
                Find your next favorite movie with our intelligent recommendation system and advanced search filters.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-[#D2042D] to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-heart-line text-3xl"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Personal Watchlist</h3>
              <p className="text-gray-300">
                Create your personal watchlist and keep track of movies you want to watch or have already seen.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-[#D2042D] to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-play-circle-line text-3xl"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Stream Anywhere</h3>
              <p className="text-gray-300">
                Watch movies and TV shows on any device with our responsive design and PWA capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#D2042D] to-red-400 bg-clip-text text-transparent">
            Popular Movies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRatedMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/details/${movie.id}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1F1E24]/80 to-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-[#D2042D]/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex p-6">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-24 h-36 object-cover rounded-lg mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#D2042D] transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center mb-3 text-yellow-400">
                      <i className="ri-star-fill mr-1"></i>
                      <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                      <span className="text-gray-400 ml-2">({movie.vote_count} votes)</span>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1F1E24]/80 to-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join millions of movie lovers and discover your next favorite film today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth"
              className="bg-gradient-to-r from-[#D2042D] to-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <i className="ri-user-add-line mr-2"></i>
              Sign Up Free
            </Link>
            <Link 
              to="/home"
              className="border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <i className="ri-eye-line mr-2"></i>
              Browse as Guest
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1F1E24]/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src="/mvxclogo.jpg" alt="MVXC Logo" className="h-6 w-6 rounded-full object-cover" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#D2042D] to-red-400 bg-clip-text text-transparent">
                MVXC
              </span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <Link to="/movie" className="hover:text-[#D2042D] transition-colors">Movies</Link>
              <Link to="/tv" className="hover:text-[#D2042D] transition-colors">TV Shows</Link>
              <Link to="/trending" className="hover:text-[#D2042D] transition-colors">Trending</Link>
              <Link to="/auth" className="hover:text-[#D2042D] transition-colors">Sign In</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 MVXC Movie App. All rights reserved. Powered by TMDB.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

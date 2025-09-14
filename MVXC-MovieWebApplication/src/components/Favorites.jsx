import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Sidenav from '../templates/Sidenav';
import Topnav from '../templates/Topnav';

const Favorites = () => {
  const { user } = useAuth();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch favorites from backend
    // For now, showing empty state
    setLoading(false);
  }, []);

  const removeFromFavorites = (itemId) => {
    // TODO: Add API call to remove from favorites
    setFavoriteItems(favoriteItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto">
        <Topnav />
        
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">My Favorites</h1>
              <p className="text-zinc-400">Movies and TV shows you love</p>
            </div>

            {/* Stats */}
            <div className="bg-[#2A2930] rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Favorites Summary</h2>
                  <p className="text-zinc-400 mt-1">
                    {favoriteItems.length} items in your favorites
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#D2042D]">
                      {favoriteItems.filter(item => item.media_type === 'movie').length}
                    </div>
                    <div className="text-sm text-zinc-400">Movies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#D2042D]">
                      {favoriteItems.filter(item => item.media_type === 'tv').length}
                    </div>
                    <div className="text-sm text-zinc-400">TV Shows</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorite Items */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D2042D]"></div>
              </div>
            ) : favoriteItems.length === 0 ? (
              <div className="bg-[#2A2930] rounded-lg p-12 text-center">
                <div className="w-24 h-24 bg-[#D2042D] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-heart-line text-white text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
                <p className="text-zinc-400 mb-6">
                  Start adding movies and TV shows to your favorites
                </p>
                <Link
                  to="/"
                  className="bg-[#D2042D] hover:bg-[#B8032A] text-white px-6 py-3 rounded-lg transition duration-200 inline-flex items-center"
                >
                  <i className="ri-search-line mr-2"></i>
                  Browse Movies & Shows
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favoriteItems.map((item) => (
                  <div key={item.id} className="bg-[#2A2930] rounded-lg overflow-hidden group hover:scale-105 transition duration-300">
                    <div className="relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300">
                        <button
                          onClick={() => removeFromFavorites(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition duration-200"
                        >
                          <i className="ri-heart-fill"></i>
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-[#D2042D] text-white px-2 py-1 rounded text-xs font-semibold">
                          {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                        {item.title || item.name}
                      </h3>
                      <p className="text-zinc-400 text-xs">
                        {item.release_date || item.first_air_date ? 
                          new Date(item.release_date || item.first_air_date).getFullYear() : 
                          'N/A'
                        }
                      </p>
                      <div className="flex items-center mt-2">
                        <i className="ri-star-fill text-yellow-500 text-xs mr-1"></i>
                        <span className="text-zinc-400 text-xs">
                          {item.vote_average?.toFixed(1) || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;

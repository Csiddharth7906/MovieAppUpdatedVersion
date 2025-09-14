import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie } from '../store/actions/movieAction';
import { asyncloadtv } from '../store/actions/tvAction';
import HorizontalCards from '../templates/HorizontalCards';

const MoviePlayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);

  // Get data from Redux store
  const movieInfo = useSelector((state) => state.movie?.info);
  const tvInfo = useSelector((state) => state.tv?.info);

  // Determine content type and get current info
  const urlParams = new URLSearchParams(location.search);
  const contentType = urlParams.get('type') || 'movie';
  const currentInfo = contentType === 'tv' ? tvInfo : movieInfo;

  // Initialize season/episode from URL params
  useEffect(() => {
    const season = urlParams.get('season') || '1';
    const episode = urlParams.get('episode') || '1';
    setCurrentSeason(parseInt(season));
    setCurrentEpisode(parseInt(episode));
  }, [location.search]);

  // Load content data
  useEffect(() => {
    if (contentType === 'tv') {
      dispatch(asyncloadtv(id));
    } else {
      dispatch(asyncloadmovie(id));
    }
  }, [id, contentType, dispatch]);


  // Extract streaming URL
  const getStreamingUrl = () => {
    if (location.state?.streamingUrl) {
      return location.state.streamingUrl;
    }
    
    if (contentType === 'tv') {
      return `https://www.2embed.stream/embed/tv/${id}/${currentSeason}/${currentEpisode}`;
    } else {
      return `https://www.2embed.stream/embed/movie/${id}`;
    }
  };

  const streamingUrl = getStreamingUrl();

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle season/episode change
  const handleSeasonEpisodeChange = (season, episode) => {
    setCurrentSeason(season);
    setCurrentEpisode(episode);
    setIsLoading(true);
  };

  const toggleFullscreen = () => {
    const playerContainer = document.getElementById('player-container');
    
    if (!document.fullscreenElement) {
      playerContainer.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Render sidebar content
  const renderSidebar = () => {
    if (!currentInfo) return null;

    return (
      <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700">
        {/* Content Info */}
        <div className="p-4 lg:p-6 border-b border-gray-700">
          <div className="flex gap-3 mb-4">
            <img 
              className="w-16 h-20 lg:w-20 lg:h-24 object-cover rounded-lg shadow-lg flex-shrink-0" 
              src={`https://image.tmdb.org/t/p/w200${currentInfo.detail.poster_path}`} 
              alt={currentInfo.detail.title || currentInfo.detail.name}
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg lg:text-xl font-bold mb-2 text-white line-clamp-2">
                {currentInfo.detail.title || currentInfo.detail.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-red-600 text-xs px-2 py-1 rounded-full">
                  {contentType === 'tv' ? 'TV Series' : 'Movie'}
                </span>
                <span className="text-yellow-400 text-sm flex items-center gap-1">
                  <i className="ri-star-fill"></i>
                  {currentInfo.detail.vote_average?.toFixed(1)}
                </span>
              </div>
              {contentType === 'tv' && (
                <p className="text-sm text-gray-300 font-medium">
                  Season {currentSeason} • Episode {currentEpisode}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Episodes List for TV Shows */}
        {contentType === 'tv' && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Episodes</h3>
              <span className="text-xs text-gray-400">
                {currentInfo.detail.seasons?.find(s => s.season_number === currentSeason)?.episode_count || 12} EPs
              </span>
            </div>
            
            {/* Season Selector */}
            <select
              value={currentSeason}
              onChange={(e) => handleSeasonEpisodeChange(parseInt(e.target.value), 1)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg text-sm mb-3 border border-gray-700 focus:border-red-500 focus:outline-none"
            >
              {currentInfo.detail.seasons?.map((season, i) => (
                <option key={i} value={season.season_number || i + 1}>
                  Season {season.season_number || i + 1}
                </option>
              ))}
            </select>

            {/* Episode List */}
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({
                  length: currentInfo.detail.seasons?.find(s => s.season_number === currentSeason)?.episode_count || 12
                }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSeasonEpisodeChange(currentSeason, i + 1)}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-all ${
                      currentEpisode === i + 1 
                        ? 'bg-red-600 border-red-500 text-white' 
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Movie Details */}
        {contentType === 'movie' && (
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold text-white mb-3">Movie Details</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-1">Overview</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {currentInfo.detail.overview || 'No overview available.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Runtime</h4>
                  <p className="text-sm text-white">{currentInfo.detail.runtime || 'N/A'} min</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300">Release</h4>
                  <p className="text-sm text-white">{currentInfo.detail.release_date?.split('-')[0] || 'N/A'}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Genres</h4>
                <div className="flex flex-wrap gap-1">
                  {currentInfo.detail.genres?.map((genre, i) => (
                    <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="p-4">
          <h3 className="font-semibold text-white mb-3">You might also like</h3>
          {/* Check multiple possible data paths */}
          {(currentInfo.recommendations?.results?.length > 0 || 
            currentInfo.similar?.results?.length > 0 || 
            currentInfo.detail?.recommendations?.results?.length > 0 ||
            currentInfo.detail?.similar?.results?.length > 0) ? (
            <div className="space-y-3">
              {/* Try different data sources */}
              {(currentInfo.recommendations?.results || 
                currentInfo.similar?.results || 
                currentInfo.detail?.recommendations?.results ||
                currentInfo.detail?.similar?.results || 
                []).slice(0, 6).map((item, index) => (
                <Link
                  key={index}
                  to={`/${item.media_type || contentType}/details/${item.id}`}
                  className="flex gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group"
                >
                  <img 
                    className="w-12 h-16 object-cover rounded shadow-md group-hover:shadow-lg transition-shadow" 
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : '/noimage.jpg'} 
                    alt={item.title || item.name}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-red-300 transition-colors">
                      {item.title || item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400 text-xs">★ {item.vote_average?.toFixed(1)}</span>
                      <span className="text-gray-400 text-xs">
                        {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4">
              <i className="ri-movie-line text-2xl mb-2"></i>
              <p className="text-sm">Loading recommendations...</p>
            </div>
          )}
        </div>

        {/* Alternative: Show trending content if no recommendations */}
        {!currentInfo.recommendations?.results?.length && 
         !currentInfo.similar?.results?.length && 
         !currentInfo.detail?.recommendations?.results?.length &&
         !currentInfo.detail?.similar?.results?.length && (
          <div className="p-4 border-t border-gray-700">
            <h3 className="font-semibold text-white mb-3">Popular {contentType === 'tv' ? 'TV Shows' : 'Movies'}</h3>
            <div className="text-center text-gray-400 py-4">
              <p className="text-sm">Check console for data structure</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="flex-shrink-0 z-50 bg-[#0F0F0F] border-b border-gray-800">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              <i className="ri-arrow-left-line text-lg"></i>
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-lg lg:text-xl font-semibold truncate max-w-xs lg:max-w-md">
                {currentInfo ? (currentInfo.detail.title || currentInfo.detail.name) : 'Now Playing'}
              </h1>
              {contentType === 'tv' && (
                <span className="text-xs lg:text-sm bg-red-600 px-2 lg:px-3 py-1 rounded-full whitespace-nowrap">
                  S{currentSeason}:E{currentEpisode}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            <i className={`text-lg lg:text-xl ${isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'}`}></i>
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="flex-1 w-full px-2 lg:px-4 py-4 lg:py-6 overflow-y-auto">
        <div className="flex flex-col xl:flex-row gap-4 lg:gap-6 max-w-none">
          
          {/* Left Column - Video Player & Controls */}
          <div className="flex-1 xl:flex-[2]">
            
            {/* Video Player Container */}
            <div id="player-container" className="relative bg-black rounded-xl overflow-hidden shadow-2xl mb-6">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                      <p className="text-base lg:text-lg">Loading player...</p>
                      <p className="text-sm text-gray-400 mt-2">Please wait...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  key={streamingUrl}
                  src={streamingUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={handleIframeLoad}
                  title="Movie Player"
                />
              </div>
            </div>

            {/* Video Info & Controls Section */}
            <div className="space-y-4">
              
              {/* Title & Basic Info */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-xl lg:text-2xl font-bold mb-2">
                    {currentInfo ? (currentInfo.detail.title || currentInfo.detail.name) : 'Loading...'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400"></i>
                      {currentInfo?.detail.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                    <span>{currentInfo?.detail.release_date?.split('-')[0] || currentInfo?.detail.first_air_date?.split('-')[0] || 'N/A'}</span>
                    {currentInfo?.detail.runtime && (
                      <span>{currentInfo.detail.runtime} min</span>
                    )}
                    <span className="bg-gray-700 px-2 py-1 rounded text-xs">
                      {contentType === 'tv' ? 'TV Series' : 'Movie'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <i className="ri-thumb-up-line"></i>
                  <span className="hidden sm:inline">Like</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <i className="ri-bookmark-line"></i>
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>

              {/* Description */}
              {currentInfo?.detail.overview && (
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                    {currentInfo.detail.overview}
                  </p>
                </div>
              )}

              {/* Genres */}
              {currentInfo?.detail.genres?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentInfo.detail.genres.map((genre, i) => (
                      <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Streaming Info */}
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Streaming from 2embed.stream</span>
                  <span className="ml-auto">Press F for fullscreen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Related Content */}
          <div className="w-full xl:w-80 xl:flex-shrink-0">
            {renderSidebar()}
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50">
          <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent text-white transition-opacity duration-300 opacity-0 hover:opacity-100`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                >
                  <i className="ri-arrow-left-line text-xl"></i>
                  <span>Back</span>
                </button>
                <h1 className="text-xl font-semibold">
                  {currentInfo ? (currentInfo.detail.title || currentInfo.detail.name) : 'Now Playing'}
                </h1>
              </div>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <i className="ri-fullscreen-exit-line text-xl"></i>
              </button>
            </div>
          </div>

          <iframe
            src={streamingUrl}
            className="w-full h-full border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Movie Player Fullscreen"
          />

          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white transition-opacity duration-300 opacity-0 hover:opacity-100`}>
            <div className="flex items-center justify-center">
              <span className="text-sm opacity-75">Press ESC to exit fullscreen</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePlayer;

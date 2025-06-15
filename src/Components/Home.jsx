import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";
import { useNavigate } from "react-router-dom";

const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });
  const [searchItem, setSearchItem] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState("all"); // 'all' or 'favourites'

  const navigate = useNavigate();

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const searchMovies = async () => {
    const response = await fetch(`${url}&s=${searchItem}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search || []);
    setSelectedMovie(null);
  };

  const fetchMovieDetails = async (id) => {
    const response = await fetch(`${url}&i=${id}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  const addToFavourites = (movie) => {
    if (!favourites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavourites([...favourites, movie]);
    }
  };

  const removeFromFavourites = (movieId) => {
    setFavourites(favourites.filter((fav) => fav.imdbID !== movieId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-500/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40 delay-500"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping opacity-50 delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-30 delay-1500"></div>
      </div>

      <div className="header relative backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>

        <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          {/* Title with cinematic effect */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl"></div>
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 relative z-10 tracking-tight">
              🎬 Movie Finder
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse"></div>
            <p className="text-white/70 text-lg mt-4 font-medium">
              Discover your next favorite movie
            </p>
          </div>

          {/* Search section with glassmorphism */}
          <div className="search flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative w-full sm:w-96 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <input
                type="text"
                placeholder="Enter Movie Name"
                onChange={(e) => setSearchItem(e.target.value)}
                className="relative w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 outline-none text-white placeholder-white/60 text-lg font-medium transition-all duration-300 hover:bg-white/15"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <button
              onClick={searchMovies}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-pulse"></div>
              <span className="relative z-10 text-lg tracking-wide">
                🔍 Search
              </span>
            </button>
          </div>

          {/* View toggle with advanced styling */}
          <div className="view-toggle flex justify-center gap-4">
            <button
              onClick={() => setView("all")}
              className={`group relative px-8 py-3 rounded-full font-bold transition-all duration-300 overflow-hidden transform hover:scale-105 ${
                view === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/25"
                  : "bg-white/10 backdrop-blur-xl text-white/80 hover:bg-white/20 border border-white/20"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 tracking-wide">🎭 All Movies</span>
            </button>

            <button
              onClick={() => setView("favourites")}
              className={`group relative px-8 py-3 rounded-full font-bold transition-all duration-300 overflow-hidden transform hover:scale-105 ${
                view === "favourites"
                  ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-2xl shadow-red-500/25"
                  : "bg-white/10 backdrop-blur-xl text-white/80 hover:bg-white/20 border border-white/20"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 tracking-wide">
                ❤️ My Favourites ({favourites.length})
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {selectedMovie ? (
          <div className="animate-fadeIn">
            <MovieDetails
              movie={selectedMovie}
              onBack={() => setSelectedMovie(null)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 animate-fadeIn">
            {view === "all"
              ? movies.map((movie, index) => (
                  <div
                    key={index}
                    className="animate-slideUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Movie
                      movie={movie}
                      onClick={() => handleMovieClick(movie.imdbID)}
                      isFavourite={favourites.some(
                        (fav) => fav.imdbID === movie.imdbID
                      )}
                      onAddFavourite={() => addToFavourites(movie)}
                      onRemoveFavourite={() =>
                        removeFromFavourites(movie.imdbID)
                      }
                    />
                  </div>
                ))
              : favourites.map((movie, index) => (
                  <div
                    key={index}
                    className="animate-slideUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Movie
                      movie={movie}
                      onClick={() => fetchMovieDetails(movie.imdbID)}
                      isFavourite={true}
                      onRemoveFavourite={() =>
                        removeFromFavourites(movie.imdbID)
                      }
                    />
                  </div>
                ))}
          </div>
        )}

        {/* Enhanced empty state messages */}
        {!selectedMovie &&
          view === "all" &&
          movies.length === 0 &&
          searchItem && (
            <div className="text-center py-20 animate-fadeIn">
              <div className="relative inline-block mb-8">
                <div className="text-8xl mb-4 animate-bounce">🎭</div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-auto border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  No movies found
                </h3>
                <p className="text-white/70 text-lg">
                  Try searching for a different movie title
                </p>
              </div>
            </div>
          )}

        {!selectedMovie && view === "favourites" && favourites.length === 0 && (
          <div className="text-center py-20 animate-fadeIn">
            <div className="relative inline-block mb-8">
              <div className="text-8xl mb-4 animate-pulse">💔</div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-auto border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                No favourites yet
              </h3>
              <p className="text-white/70 text-lg">
                Add some movies to your favourites to see them here
              </p>
            </div>
          </div>
        )}

        {!selectedMovie &&
          view === "all" &&
          movies.length === 0 &&
          !searchItem && (
            <div className="text-center py-20 animate-fadeIn">
              <div className="relative inline-block mb-8">
                <div className="text-8xl mb-4 animate-bounce">🍿</div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-lg mx-auto border border-white/20">
                <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
                  Welcome to Movie Finder
                </h3>
                <p className="text-white/70 text-lg">
                  Search for your favorite movies to get started
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-150"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping delay-300"></div>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Home;

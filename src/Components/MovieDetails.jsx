import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API = 'http://www.omdbapi.com/?apikey=73477204';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`${API}&i=${id}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <div className="p-10 text-center text-gray-500 text-xl">Loading...</div>;

  return (
    <div className="movie-details min-w-screen min-h-screen mx-auto p-8 relative ">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-3xl shadow-2xl border border-gray-200/50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>

      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 via-white to-gray-100 hover:from-blue-50 hover:via-white hover:to-purple-50 text-gray-700 hover:text-gray-900 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl border border-gray-200/50 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="text-lg transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span className="relative z-10">Back to Results</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1 group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full rounded-2xl object-cover filter group-hover:brightness-110 group-hover:contrast-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight relative">
              {movie.Title}
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform origin-left animate-pulse"></div>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[
                { label: 'Year', value: movie.Year, colors: 'from-gray-50/80 to-blue-50/80' },
                { label: 'Genre', value: movie.Genre, colors: 'from-gray-50/80 to-green-50/80' },
                { label: 'Director', value: movie.Director, colors: 'from-gray-50/80 to-purple-50/80' },
                { label: 'Language', value: movie.Language, colors: 'from-gray-50/80 to-teal-50/80' },
              ].map(({ label, value, colors }) => (
                <div key={label} className={`group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r ${colors} hover:brightness-105 transition-all duration-300 border border-gray-200/30 backdrop-blur-sm h-20`}>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 group-hover:animate-pulse"></div>
                  <p className="text-gray-700 flex-1">
                    <strong className="text-gray-900 font-bold">{label}:</strong>
                    <span className="ml-2 font-semibold">{value}</span>
                  </p>
                </div>
              ))}

              <div className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50/80 to-orange-50/80 hover:from-orange-50 hover:to-red-50 transition-all duration-300 border border-gray-200/30 backdrop-blur-sm h-20 lg:col-span-2">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-2 group-hover:animate-pulse"></div>
                <p className="text-gray-700 flex-1">
                  <strong className="text-gray-900 font-bold">Actors:</strong>
                  <span className="ml-2 font-semibold">{movie.Actors}</span>
                </p>
              </div>

              <div className="group p-5 rounded-xl bg-gradient-to-r from-yellow-50/80 via-amber-50/50 to-orange-50/80 hover:brightness-105 transition-all duration-300 border-2 border-yellow-200/50 backdrop-blur-sm relative overflow-hidden shadow-lg h-20 lg:col-span-2">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-amber-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full group-hover:animate-bounce"></div>
                  <p className="text-gray-700 flex items-center gap-4 flex-1">
                    <strong className="text-gray-900 font-bold">IMDB Rating:</strong>
                    <span className="flex items-center px-4 py-2 rounded-full font-bold bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-300/50 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <span className="text-lg mr-2 animate-pulse">⭐</span>
                      {movie.imdbRating}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-50/80 via-blue-50/50 to-purple-50/80 hover:brightness-105 transition-all duration-500 border border-gray-200/30 backdrop-blur-sm relative overflow-hidden mt-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 group-hover:animate-pulse"></div>
                <p className="text-gray-700 leading-relaxed flex-1">
                  <strong className="text-gray-900 font-bold block mb-2">Plot:</strong>
                  <span className="font-medium text-gray-800 leading-7">{movie.Plot}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30"></div>
    </div>
  );
}

export default MovieDetails;

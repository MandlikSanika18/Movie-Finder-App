const Movie = ({
  movie,
  onClick,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite,
}) => {
  return (
    <div
     
      className="movie group relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden border border-gray-200/50 backdrop-blur-sm"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

      {/* Image container with advanced effects */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-72 object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out filter group-hover:brightness-110 group-hover:contrast-105"
        />

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
      </div>

      <div className="relative p-6 z-20">
        {/* Type badge with glassmorphism */}
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4 shadow-lg backdrop-blur-sm border border-white/20 transform group-hover:scale-105 transition-transform duration-300">
          <span className="relative z-10">{movie.Type}</span>
          <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
        </span>

        {/* Title with gradient text */}
        <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2 line-clamp-2 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500 leading-tight" onClick={onClick}>
          {movie.Title.slice(0, 13)}
        </h3>

        {/* Year with subtle animation */}
        <p className="text-gray-500 text-sm mb-4 font-medium transform group-hover:translate-x-1 transition-transform duration-300">
          <span className="inline-block w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2 group-hover:animate-pulse"></span>
          {movie.Year}
        </p>

        {/* Button with advanced styling */}
        {isFavourite ? (
          <button
            onClick={onRemoveFavourite}
            className="w-full relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group/btn overflow-hidden border border-red-400/30"
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>

            <span className="text-xl animate-pulse">💔</span>
            <span className="relative z-10 tracking-wide">
              Remove from Favourites
            </span>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          </button>
        ) : (
          onAddFavourite && (
            <button
              onClick={onAddFavourite}
              className="w-full relative bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group/btn overflow-hidden border border-emerald-400/30"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-600/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>

              <span className="text-xl group-hover/btn:animate-bounce">❤️</span>
              <span className="relative z-10 tracking-wide">
                Add to Favourites
              </span>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          )
        )}

        {/* Floating particles effect */}
        <div className="absolute -top-2 -right-2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
        <div className="absolute top-4 -left-1 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500 delay-150"></div>
        <div className="absolute -bottom-1 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-700 delay-300"></div>
      </div>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

export default Movie;

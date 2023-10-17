import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
  isLoading: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ data, title, isLoading }) => {
  if (!(Array.isArray(data) && data.length > 0 && !isLoading)) return null;
  return (
    <div className="px-4 md:px-12 mt-6 space-y-8">
      <div className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        {title}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {data.map((movie) => (
          <MovieCard key={movie._id} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;

import { FiPlus } from 'react-icons/fi';
import { MovieData } from './Data';
import { MoviePoster } from './Poster';

type Movie = {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
};

interface MovieProps {
  movie: Movie;
  onAddMovie: (movieId: number) => void;
}

export function Movie({ movie, onAddMovie }: MovieProps) {
  return (
    <div className="flex rounded-lg overflow-hidden bg-slate-700 p-4 justify-between">
      <div className="min-w-fit">
        <MoviePoster movie={movie} />
      </div>

      <MovieData movie={movie} className="mx-2 grow" />

      <button
        className="bg-highlight flex justify-center items-center text-heading hover:brightness-90 transition -m-4 ml-0 shadow-md w-fit p-4"
        onClick={() => onAddMovie(movie.id)}
      >
        <FiPlus className="text-2xl" />
      </button>
    </div>
  );
}

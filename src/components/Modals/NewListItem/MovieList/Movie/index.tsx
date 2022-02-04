import { FiPlus } from 'react-icons/fi';

import { Movie as MovieType } from '../../../../../services/moviedb';

import { MovieData } from './Data';
import { MoviePoster } from './Poster';

interface MovieProps {
  movie: MovieType;
  onAddMovie: (movie: MovieType) => void;
}

export function Movie({ movie, onAddMovie }: MovieProps) {
  return (
    <div className="flex justify-between p-4 overflow-hidden rounded-lg bg-slate-700">
      <div className="min-w-fit">
        <MoviePoster movie={movie} />
      </div>

      <MovieData movie={movie} className="mx-2 grow" />

      <button
        className="flex items-center justify-center p-4 ml-0 -m-4 transition shadow-md bg-highlight text-heading hover:brightness-90 w-fit"
        onClick={() => onAddMovie(movie)}
      >
        <FiPlus className="text-2xl" />
      </button>
    </div>
  );
}

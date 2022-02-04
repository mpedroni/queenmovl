import { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal } from '..';
import { useDebounce } from '../../../hooks/useDebounce';
import { Movie as MovieType, searchMovie } from '../../../services/moviedb';
import { Input } from '../../Forms/Input';
import { Movie } from './MovieList/Movie';

interface NewListItemProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const MOVIE_OVERVIEW_MAX_LENGTH = 380;

export function NewListItem({ isOpen, onRequestClose }: NewListItemProps) {
  const [name, setName] = useState('');
  const [movies, setMovies] = useState<MovieType[]>([]);

  const debouncedGetMovies = useDebounce(getMovies);

  async function handleSearch(query: string) {
    setName(query);

    if (query === '') return;

    debouncedGetMovies(query);
  }

  function formatMovieDate(date: string) {
    if (!date) return '';

    return Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
    }).format(Date.parse(date));
  }

  function formatMovieOverview(overview: string) {
    if (!overview) return 'Descrição não disponível';

    // movie overview is lower than limit
    if (MOVIE_OVERVIEW_MAX_LENGTH > overview.length) return overview;

    const overviewSubstring = overview.substring(0, MOVIE_OVERVIEW_MAX_LENGTH);

    const lastWhiteSpaceIndex = overviewSubstring.lastIndexOf(' ');

    // breaks the string at the last whitespace so it doesn't break the last word
    const parsedMovieOverview = overviewSubstring.substring(
      0,
      lastWhiteSpaceIndex
    );

    return parsedMovieOverview + '...';
  }

  async function handleAddMovie(movie: MovieType) {
    console.log(movie);
  }

  async function getMovies(query: string) {
    const { error, results } = await searchMovie({
      query,
    });

    if (!!error) {
      toast.error(error.message);
      return;
    }

    const parsedMovies = results.map((movie) => ({
      ...movie,
      release_date: formatMovieDate(movie.release_date),
      overview: formatMovieOverview(movie.overview),
    }));

    setMovies(parsedMovies);
  }

  return (
    <Modal
      isOpen={isOpen}
      headline="Adicionar Filme"
      onRequestClose={onRequestClose}
    >
      <Input
        label="Nome do filme"
        placeholder="Ex: Orgulho e Preconceito"
        autoComplete="off"
        value={name}
        onChange={(e) => handleSearch(e.target.value)}
        tw="mb-8"
      />

      <div className="flex flex-col gap-4">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} onAddMovie={handleAddMovie} />
        ))}
      </div>
    </Modal>
  );
}

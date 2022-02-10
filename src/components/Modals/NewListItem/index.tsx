import { useState } from 'react';
import { toast } from 'react-toastify';

import { Modal } from '..';
import { useLists } from '../../../contexts/ListsContext';
import { useDebounce } from '../../../hooks/useDebounce';
import { Movie as MovieType, searchMovie } from '../../../services/moviedb';
import { Input } from '../../Forms/Input';
import { Select } from '../../Forms/Select';
import { Movie } from './MovieList/Movie';

interface NewListItemProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type Plataform = 'netflix' | 'prime_video' | 'disney_plus' | 'hbo';
type PlatformSelectOption = {
  text: string;
  value: Plataform | '';
};

const platformSelectOptions: PlatformSelectOption[] = [
  { text: '', value: '' },
  { text: 'Netflix', value: 'netflix' },
  { text: 'Prime Video', value: 'prime_video' },
  { text: 'Disney Plus', value: 'disney_plus' },
  { text: 'HBO', value: 'hbo' },
];

const MOVIE_OVERVIEW_MAX_LENGTH = 380;

export function NewListItem({ isOpen, onRequestClose }: NewListItemProps) {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [streamingPlatform, setStreamingPlatform] = useState('');
  const [movies, setMovies] = useState<MovieType[]>([]);
  const { addListItem } = useLists();

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
    const release_year = !!movie.release_date
      ? new Date(Date.parse(movie.release_date)).getFullYear()
      : '';

    addListItem({
      ...movie,
      movie_database_id: movie.id,
      genre,
      release_year,
      streaming_platform: streamingPlatform,
      watched: false,
    });

    onRequestClose();
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
      <div className="flex flex-wrap gap-2 mb-8 md:flex-nowrap">
        <div className="md:basis-1/2 basis-full">
          <Input
            label="Nome do filme"
            placeholder="Ex: Orgulho e Preconceito"
            autoComplete="off"
            value={name}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="basis-1/2 md:basis-1/4">
          <Input
            label="Gênero"
            placeholder="Ex: Drama"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className="flex-1 md:basis-1/4">
          <Select
            label="Plataforma"
            value={streamingPlatform}
            options={platformSelectOptions}
            onChange={(e) => setStreamingPlatform(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} onAddMovie={handleAddMovie} />
        ))}
      </div>
    </Modal>
  );
}

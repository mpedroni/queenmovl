import Image from 'next/image';

import DefaultPosterSvg from '../../../../../assets/default-movie-poster.svg';

type Movie = {
  poster_path: string;
  title: string;
};

interface MoviePosterProps {
  movie: Movie;
}

type PosterSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original';

export function MoviePoster({ movie }: MoviePosterProps) {
  if (movie.poster_path === '')
    return (
      <Image
        src={DefaultPosterSvg}
        alt="Default movie poster"
        className="rounded-md"
        width={66}
        height={99}
      />
    );

  const baseUrl = 'https://image.tmdb.org/t/p';
  const posterSize: PosterSize = 'w92';

  const src = `${baseUrl}/${posterSize}/${movie.poster_path}`;

  return (
    <Image
      src={src}
      alt={movie.title + ' poster'}
      width={66}
      height={99}
      className="rounded-md"
    />
  );
}

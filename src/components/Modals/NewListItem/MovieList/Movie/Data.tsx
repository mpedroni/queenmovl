type Movie = {
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
};

interface MovieDataProps {
  movie: Movie;
}

export function MovieData({
  movie: { original_title, overview, release_date, title },
}: MovieDataProps) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-base font-bold text-heading">{title}</h3>

        <div className="text-body text-xs">
          {!original_title || original_title === title
            ? release_date
            : original_title + ', ' + release_date}
        </div>
      </div>

      <div className="text-body text-sm">{overview}</div>
    </div>
  );
}

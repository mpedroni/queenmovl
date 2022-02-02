import { customRender as render } from '../../../../../customRender';

import { MovieData } from '../../../../../../components/Modals/NewListItem/MovieList/Movie/Data';

describe('Modals/NewListItem/MovieData component', () => {
  it('should renders correctly', () => {
    const movie = {
      title: 'O Lobo de Wall Street',
      original_title: 'The Wolf of Wall Street',
      release_date: 'november of 2013',
      overview: 'The Wolf of Wall Street movie overview',
    };
    const { getByText } = render(<MovieData movie={movie} />);

    expect(getByText(movie.title)).toBeInTheDocument();
    expect(
      getByText(movie.original_title + ', ' + movie.release_date)
    ).toBeInTheDocument();
    expect(getByText(movie.overview)).toBeInTheDocument();
  });

  it('should render only movie release date in the subtitle when the movie has no original title', () => {
    const movie = {
      title: 'The Wolf of Wall Street',
      original_title: '',
      release_date: 'november of 2013',
      overview: 'The Wolf of Wall Street movie overview',
    };
    const { getByText } = render(<MovieData movie={movie} />);

    expect(getByText(movie.release_date)).toBeInTheDocument();
  });

  it('should render only the movie release date in the subtitle when the movie original title is equal to the title', () => {
    const movie = {
      title: 'The Wolf of Wall Street',
      original_title: 'The Wolf of Wall Street',
      release_date: 'november of 2013',
      overview: 'The Wolf of Wall Street movie overview',
    };
    const { getByText } = render(<MovieData movie={movie} />);

    expect(getByText(movie.release_date)).toBeInTheDocument();
  });
});

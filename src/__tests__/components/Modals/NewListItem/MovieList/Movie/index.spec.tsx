import { customRender as render } from '../../../../../customRender';

import { Movie } from '../../../../../../components/Modals/NewListItem/MovieList/Movie';
import userEvent from '@testing-library/user-event';

describe('Modals/NewListItem/Movie component', () => {
  it('should renders correctly', () => {
    const movie = {
      id: 1,
      original_title: 'The Wolf of Wall Street',
      overview: 'Amazing movie',
      poster_path: 'fake_poster_path.png',
      release_date: 'november of 2013',
      title: 'The Wolf of Wall Street',
    };

    const onAddMovie = jest.fn();

    const { getByRole } = render(
      <Movie movie={movie} onAddMovie={onAddMovie} />
    );

    userEvent.click(getByRole('button'));

    expect(onAddMovie).toBeCalledTimes(1);
  });
});

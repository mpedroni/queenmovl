import { ImageProps } from 'next/image';

import { MoviePoster } from '../../../../../../components/Modals/NewListItem/MovieList/Movie/Poster';
import { customRender as render } from '../../../../../customRender';

jest.mock(
  'next/image',
  () =>
    function Image({ src, alt }: ImageProps) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src as any} alt={alt} />;
    }
);

describe('Modals/NewListItem/MovieAvatar component', () => {
  it('should renders correctly', () => {
    const movie = {
      title: 'O Lobo de Wall Street',
      poster_path: '/fake_poster_path.png',
    };

    const { getByAltText } = render(<MoviePoster movie={movie} />);

    expect(getByAltText(`${movie.title} poster`)).toBeInTheDocument();
  });

  it('should renders the default movie poster when movie `poster_path` is empty', () => {
    const movie = {
      title: 'O Lobo de Wall Street',
      poster_path: '',
    };

    const { getByAltText } = render(<MoviePoster movie={movie} />);

    expect(getByAltText('Default movie poster')).toBeInTheDocument();
  });
});

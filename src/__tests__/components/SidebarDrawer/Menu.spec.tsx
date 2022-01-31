import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Menu, MenuProps } from '../../../components/SidebarDrawer/Menu';

const createMenuProps = ({
  header = 'Test Header',
  lists = [
    { id: 1, name: 'Movies list' },
    { id: 2, name: 'Books list' },
  ],
  onSelectList = jest.fn(),
}: Partial<MenuProps>): MenuProps => ({
  header,
  lists,
  onSelectList,
});

describe('SidebarDrawer/Menu component', () => {
  it('should renders correctly', () => {
    const props = createMenuProps({});

    render(<Menu {...props} />);

    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Movies list')).toBeInTheDocument();
    expect(screen.getByText('Books list')).toBeInTheDocument();
  });

  it('should renders the empty message when prop `lists` is empty', () => {
    const props = createMenuProps({ lists: [] });

    render(<Menu {...props} />);

    expect(screen.getByText('Nenhuma lista encontrada')).toBeInTheDocument();
  });

  it('should executes the function passed to the prop `onSelectList` when click in list item', () => {
    const props = createMenuProps({});

    render(<Menu {...props} />);

    userEvent.click(screen.getByText('Movies list'));
    userEvent.click(screen.getByText('Books list'));

    expect(props.onSelectList).toHaveBeenCalledTimes(2);
  });
});

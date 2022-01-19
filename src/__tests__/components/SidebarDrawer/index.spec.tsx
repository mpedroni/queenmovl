import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import userEvent from '@testing-library/user-event';

import { SidebarDrawer } from '../../../components/SidebarDrawer';

import { useAuth } from '../../../contexts/AuthContext';
import { useSidebarDrawer } from '../../../contexts/SidebarDrawerContext';

jest.mock('../../../contexts/SidebarDrawerContext');
jest.mock('../../../contexts/AuthContext');

function getSidebarMocked(options: any) {
  const useSidebarDrawerMocked = mocked(useSidebarDrawer);

  useSidebarDrawerMocked.mockReset();
  useSidebarDrawerMocked.mockReturnValueOnce(options);
}

function getAuthMocked(options: any) {
  const useAuthMocked = mocked(useAuth);

  useAuthMocked.mockReset();
  useAuthMocked.mockReturnValueOnce(options);
}

describe('SidebarDrawer Component', () => {
  beforeEach(() => {
    getSidebarMocked({ isOpen: true });
    getAuthMocked({
      user: {
        avatarUrl: 'asdawd',
        name: 'John Doe',
        username: 'johndoe',
      },
    });
  });

  it('should be visible when `isOpen` is `true` and user is logged', () => {
    render(<SidebarDrawer />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should be hidden when `isOpen` is `false` or user is not logged', () => {
    getSidebarMocked({ isOpen: false });
    getAuthMocked({ user: null });

    render(<SidebarDrawer />);

    expect(screen.queryByTestId('sidebar')).toBeNull();
  });

  it('should hides when user click in the overlay', () => {
    const close = jest.fn();

    getSidebarMocked({
      isOpen: true,
      close,
    });

    render(<SidebarDrawer />);

    userEvent.click(screen.getByTestId('overlay'));

    expect(close).toBeCalledTimes(1);
  });
});

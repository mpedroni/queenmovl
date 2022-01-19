import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'jest-mock';

import { Header } from '../../components/Header';

import { useAuth } from '../../contexts/AuthContext';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

jest.mock('../../contexts/AuthContext');
jest.mock('../../contexts/SidebarDrawerContext');

function setSidebarMock(options: any) {
  const useSidebarDrawerMocked = mocked(useSidebarDrawer);

  useSidebarDrawerMocked.mockReset();
  useSidebarDrawerMocked.mockReturnValueOnce(options);
}

function setAuthMock(options: any) {
  const useAuthMocked = mocked(useAuth);

  useAuthMocked.mockReset();
  useAuthMocked.mockReturnValueOnce(options);
}

describe('Header component', () => {
  beforeEach(() => {
    setSidebarMock({});
    setAuthMock({
      isLogged: true,
    });
  });

  it('should renders correctly', () => {
    render(<Header />);

    expect(screen.getByText('queenmovl')).toBeInTheDocument();
  });

  it('should open sidebar when click sidebar toggle button', () => {
    const handleState = jest.fn();
    setSidebarMock({
      handleState,
    });

    render(<Header />);

    userEvent.click(screen.getByTestId('toggle-sidebar'));

    expect(handleState).toBeCalledTimes(1);
  });

  it('should not render toggle sidebar button when user is not logged', () => {
    setAuthMock({
      isLogged: false,
    });

    render(<Header />);

    expect(screen.queryByTestId('toggle-sidebar')).toBeNull();
  });
});

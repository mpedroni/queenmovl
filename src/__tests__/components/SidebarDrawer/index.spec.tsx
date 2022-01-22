import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  customRender as render,
  CustomRenderOptions,
} from '../../customRender';

import { SidebarDrawer } from '../../../components/SidebarDrawer';

const openSidebarOptions: CustomRenderOptions = {
  providerProps: {
    authProviderProps: {
      user: {
        avatarUrl: 'https://johndoe.com/avatar',
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
      },
    },
    sidebarDrawerProviderProps: {
      isOpen: true,
    },
  },
};

describe('SidebarDrawer Component', () => {
  it('should be hidden when `isOpen` is `false` or user is not logged. Default behavior', () => {
    render(<SidebarDrawer />);

    expect(screen.queryByTestId('sidebar')).toBeNull();
  });

  it('should be visible when `isOpen` is `true` and user is logged', () => {
    render(<SidebarDrawer />, openSidebarOptions);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should hides when user click in the overlay', () => {
    const { providerProps } = render(<SidebarDrawer />, openSidebarOptions);

    userEvent.click(screen.getByTestId('overlay'));

    expect(providerProps.sidebarDrawerProviderProps?.close).toBeCalledTimes(1);
  });
});

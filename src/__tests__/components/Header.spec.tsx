import userEvent from '@testing-library/user-event';

import { customRender as render } from '../customRender';

import { Header } from '../../components/Header';

describe('Header component', () => {
  it('should renders correctly', () => {
    const { getByText } = render(<Header />);

    expect(getByText('queenmovl')).toBeInTheDocument();
  });

  it('should open sidebar when click sidebar toggle button', () => {
    const { getByTestId, providerProps } = render(<Header />, {
      providerProps: {
        authProviderProps: {
          user: {} as any,
        },
      },
    });

    userEvent.click(getByTestId('toggle-sidebar'));

    expect(
      providerProps.sidebarDrawerProviderProps?.handleState
    ).toBeCalledTimes(1);
  });

  it('should not render toggle sidebar button when user is not logged', () => {
    const { queryByTestId } = render(<Header />);

    expect(queryByTestId('toggle-sidebar')).toBeNull();
  });
});

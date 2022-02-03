import { getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';

import { NewListModal } from '../../../../components/Modals/NewListModal';

import { customRender as render } from '../../../customRender';

describe('NewListModal component', () => {
  it('should renders correctly', () => {
    render(<NewListModal isOpen={true} onRequestClose={() => {}} />);

    expect(screen.getByText(/Criar Lista/i)).toBeInTheDocument();
  });

  it('should not render when prop `isOpen` is `false`', () => {
    const { container } = render(
      <NewListModal isOpen={false} onRequestClose={() => {}} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should execute the function `onRequestClose` when click on close button', () => {
    const onRequestClose = jest.fn();
    render(<NewListModal isOpen={true} onRequestClose={onRequestClose} />);

    userEvent.click(screen.getByTestId('close-icon'));

    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('should execute the function `onRequestClose` when click on cancel button', () => {
    const onRequestClose = jest.fn();
    render(<NewListModal isOpen={true} onRequestClose={onRequestClose} />);

    userEvent.click(
      screen.getByRole('button', {
        name: /cancelar/i,
      })
    );

    expect(onRequestClose).toBeCalledTimes(1);
  });

  it('should renders error message when ListsContext `error` data is not null', async () => {
    const error = {
      message: 'Test error message',
      name: 'test-error',
    };

    render(
      <>
        <NewListModal isOpen={true} onRequestClose={() => {}} />

        <ToastContainer />
      </>,
      {
        providerProps: {
          listsProviderProps: {
            error,
          },
        },
      }
    );

    expect(await screen.findByText(error.message)).toBeInTheDocument();
  });
});

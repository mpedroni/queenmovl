import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NewListModal } from '../../../components/Modals/NewListModal';

describe('NewListModal component', () => {
  it('should renders correctly', () => {
    render(<NewListModal isOpen={true} onRequestClose={() => {}} />);

    expect(screen.getByText('Criar Lista')).toBeInTheDocument();
  });

  it('should not render when prop `isOpen` is `false`', () => {
    const { container } = render(
      <NewListModal isOpen={false} onRequestClose={() => {}} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should execute the function `onRequestClose` when click on overlay', () => {
    const onRequestClose = jest.fn();
    render(<NewListModal isOpen={true} onRequestClose={onRequestClose} />);

    userEvent.click(screen.getByTestId('overlay'));

    expect(onRequestClose).toBeCalledTimes(1);
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
});

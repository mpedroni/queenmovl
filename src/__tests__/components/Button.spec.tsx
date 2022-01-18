import { render, screen } from '@testing-library/react';
import { FiSave } from 'react-icons/fi';

import { BaseButton, sizes } from '../../components/Button';

describe('Button Component', () => {
  it('should renders correctly', () => {
    render(<BaseButton />);
  });

  it('should renders the label when exists', () => {
    const label = 'Test Button';
    render(<BaseButton>{label}</BaseButton>);

    expect(screen.getByTestId('button')).toHaveTextContent(label);
  });

  it('should renders icon when prop `icon` is passed', () => {
    render(<BaseButton Icon={FiSave} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should apply `md` size when prop `size` is not passed', () => {
    render(<BaseButton Icon={FiSave} />);

    expect(screen.getByTestId('button')).toHaveClass(sizes.md.text);
    expect(screen.getByTestId('icon')).toHaveClass(sizes.md.icon);
  });

  it('should apply the correct size when the prop `size` is passed', () => {
    render(<BaseButton Icon={FiSave} size="xl" />);

    expect(screen.getByTestId('button')).toHaveClass(sizes.xl.text);
    expect(screen.getByTestId('icon')).toHaveClass(sizes.xl.icon);
  });

  it('should apply the classes passed by the prop `tw`', () => {
    const classes = 'bg-blue-600 rounded-none';
    render(<BaseButton tw={classes} />);

    expect(screen.getByTestId('button')).toHaveClass(classes);
  });
});

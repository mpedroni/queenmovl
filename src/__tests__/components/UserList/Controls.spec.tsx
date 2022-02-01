import userEvent from '@testing-library/user-event';

import { Controls } from '../../../components/UserList/Controls';
import { customRender as render } from '../../customRender';

describe('UserList/Controls component', () => {
  it('should call the `onAddItem` function passed by prop when clicked in the `Add Item` button', () => {
    const onAddItem = jest.fn();

    const { getByRole } = render(<Controls onAddItem={onAddItem} />);
    userEvent.click(getByRole('button'));

    expect(onAddItem).toBeCalledTimes(1);
  });
});

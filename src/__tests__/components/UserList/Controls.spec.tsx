import { Controls } from '../../../components/UserList/Controls';
import { customRender as render } from '../../customRender';

describe('UserList/Controls component', () => {
  it('should call the `onAddItem` function passed by prop when clicked in the `Add Item` button', () => {
    render(<Controls />);
  });
});

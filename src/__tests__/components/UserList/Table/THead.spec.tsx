import { THead } from '../../../../components/UserList/Table/THead';
import { customRender as render } from '../../../customRender';

describe('UserList/Table/THead component', () => {
  it('should renders correctly', () => {
    const headers = [
      { id: 1, value: 'test-value-1', text: 'Test Header 1' },
      { id: 2, value: 'test-value-2', text: 'Test Header 2' },
      { id: 3, value: 'test-value-3' },
      { id: 4, value: 'test-value-4' },
    ];

    const table = document.createElement('table');

    const { getByText } = render(<THead headers={headers} />, {
      container: document.body.appendChild(table),
    });

    expect(getByText('Test Header 1')).toBeInTheDocument();
    expect(getByText('Test Header 2')).toBeInTheDocument();
  });
});

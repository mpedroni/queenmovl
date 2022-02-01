import { TBody } from '../../../../components/UserList/Table/TBody';
import { customRender as render } from '../../../customRender';

describe('UserList/Table/TBody component', () => {
  it('should renders correctly', () => {
    const headers = [
      { id: 1, value: 'name' },
      { id: 2, value: 'age' },
      { id: 3, value: (item: any) => <button>{item.birthday}</button> },
    ];

    const items = [
      { id: 1, name: 'John Doe', age: 40, birthday: '01 jan' },
      { id: 2, name: 'Jane Doe', age: 42, birthday: '15 mar' },
    ];

    const table = document.createElement('table');

    const { getByText, getByRole } = render(
      <TBody headers={headers} items={items} />,
      { container: document.body.appendChild(table) }
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText(40)).toBeInTheDocument();
    expect(getByRole('button', { name: '01 jan' })).toBeInTheDocument();

    expect(getByText('Jane Doe')).toBeInTheDocument();
    expect(getByText(42)).toBeInTheDocument();
    expect(getByRole('button', { name: '15 mar' })).toBeInTheDocument();
  });

  it('should renders the default `noDataMessage` when has no items', async () => {
    const table = document.createElement('table');
    const { getByText } = render(<TBody headers={[]} items={[]} />, {
      container: document.body.appendChild(table),
    });

    expect(
      getByText(/Parece que esta lista ainda está vazia/gi)
    ).toBeInTheDocument();
  });

  it('should renders the given `noDataMessage` when has no items', () => {
    const noDataMessage = 'Test the empty message prop';

    const table = document.createElement('table');
    const { getByText } = render(
      <TBody headers={[]} items={[]} noDataMessage={noDataMessage} />,
      { container: document.body.appendChild(table) }
    );

    expect(getByText(noDataMessage)).toBeInTheDocument();
  });
});

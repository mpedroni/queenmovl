import { Header } from './THead';

interface TBodyProps {
  items: any[];
  headers: Header[];
}

export function TBody({ items, headers }: TBodyProps) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          {headers.map((header) => (
            <td key={`${item.id}_${header.id}`}>
              {typeof header.value === 'function'
                ? header.value(item)
                : item[header.value]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

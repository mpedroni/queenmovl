import { Header } from './THead';

interface TBodyProps {
  items: any[];
  headers: Header[];
  emptyMessage?: string;
}

export function TBody({
  items,
  headers,
  emptyMessage = 'Parece que esta lista ainda está vazia. Experimente adicionar alguns itens 😃',
}: TBodyProps) {
  return (
    <tbody>
      {items.length === 0 && (
        <tr className="bg-slate-800">
          <td className="p-4 text-body">{emptyMessage}</td>
        </tr>
      )}

      {items.map((item) => (
        <tr
          key={item.id}
          className="even:bg-slate-700 bg-slate-800 hover:cursor-pointer"
        >
          {headers.map((header) => (
            <td
              key={`${item.id}_${header.id}`}
              align="center"
              className="p-4 text-body"
            >
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

import { useCallback, useMemo } from 'react';
import { FiCheck } from 'react-icons/fi';
import { Header } from '../Table';

interface TBodyProps {
  items: any[];
  headers: Header[];
  noDataMessage?: string;
  propertyToCheckItem?: string | ((item: any) => string);
}

export function TBody({
  items,
  headers,
  propertyToCheckItem,
  noDataMessage = 'Parece que esta lista ainda está vazia. Experimente adicionar alguns itens 😃',
}: TBodyProps) {
  function isCheckedItem(item: any) {
    if (!propertyToCheckItem) return false;

    return typeof propertyToCheckItem === 'string'
      ? !!item[propertyToCheckItem]
      : !!propertyToCheckItem(item);
  }

  const getItemCheckedTd = useCallback((item: any) => {
    if (!propertyToCheckItem) return null;

    return isCheckedItem(item) ? (
      <td className="p-2">
        <div className="flex justify-center">
          <FiCheck className="text-2xl stroke-highlight" />
        </div>
      </td>
    ) : (
      <td />
    );
  }, []);

  const sortedItems = useMemo(() => {
    if (!propertyToCheckItem) return items;

    return items.sort((a, b) => (isCheckedItem(a) > isCheckedItem(b) ? 1 : -1));
  }, [items, propertyToCheckItem]);

  return (
    <tbody>
      {sortedItems.length === 0 && (
        <tr className="bg-slate-800">
          <td
            className="p-2 text-center text-body"
            colSpan={
              !!propertyToCheckItem ? headers.length + 1 : headers.length
            }
          >
            {noDataMessage}
          </td>
        </tr>
      )}

      {sortedItems.map((item) => (
        <tr
          key={item.id}
          className="even:bg-slate-700 bg-slate-800 hover:cursor-pointer"
        >
          {getItemCheckedTd(item)}

          {headers.map((header) => (
            <td key={`${item.id}_${header.id}`} align="center">
              <div className="flex justify-center p-2 align-center text-body">
                {typeof header.itemProperty === 'function'
                  ? header.itemProperty(item)
                  : item[header.itemProperty]}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

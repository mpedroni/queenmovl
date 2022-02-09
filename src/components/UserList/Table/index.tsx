import { TBody } from './TBody';
import { THead, Header as TableHeader } from './THead';

export type Header = TableHeader & {
  itemProperty: string | ((item: any) => any);
};

interface TableProps {
  headers: Header[];
  items: any[];
  propertyToCheckItem?: string | ((item: any) => string);
}

export function Table({ headers, items, propertyToCheckItem }: TableProps) {
  return (
    <table className="w-full overflow-hidden border-collapse rounded-lg">
      <THead headers={headers} hasColumnForChecked={!!propertyToCheckItem} />

      <TBody
        headers={headers}
        items={items}
        propertyToCheckItem={propertyToCheckItem}
      />
    </table>
  );
}

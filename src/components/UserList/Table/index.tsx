import { TBody } from './TBody';
import { THead, Header } from './THead';

interface TableProps {
  headers: Header[];
  items: any[];
}

export function Table({ headers, items }: TableProps) {
  return (
    <table className="w-full overflow-hidden border-collapse rounded-lg">
      <THead headers={headers} />

      <TBody headers={headers} items={items} />
    </table>
  );
}

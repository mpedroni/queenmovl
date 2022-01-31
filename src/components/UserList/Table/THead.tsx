export type Header = {
  id: number;
  value: string | ((item: any) => any);
  text?: string;
};

interface THeadProps {
  headers: Header[];
}

export function THead({ headers }: THeadProps) {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.id}>{header.text}</th>
        ))}
      </tr>
    </thead>
  );
}

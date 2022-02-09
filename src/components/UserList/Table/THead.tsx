export type Header = {
  id: string;
  text?: string;
};

interface THeadProps {
  headers: Header[];
  hasColumnForChecked: boolean;
}

export function THead({ headers, hasColumnForChecked }: THeadProps) {
  return (
    <thead>
      <tr>
        {hasColumnForChecked && <th className="py-4 bg-highlight" />}

        {headers.map((header) => (
          <th
            key={header.id}
            align="center"
            className="py-4 font-bold text-heading bg-highlight"
          >
            {header.text}
          </th>
        ))}
      </tr>
    </thead>
  );
}

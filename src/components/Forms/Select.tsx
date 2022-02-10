import React, {
  forwardRef,
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
} from 'react';
import classNames from 'classnames';

type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'className'
> & {
  label: string;
  itemText?: string;
  itemValue?: string;
  options: Record<string, any>[];
  error?: string;
  tw?: string;
};

const SelectComponent: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = (
  {
    label,
    tw,
    error,
    options,
    itemText = 'text',
    itemValue = 'value',
    value,
    ...props
  }: SelectProps,
  ref
) => {
  const className = 'px-4 border-none rounded-md h-9 bg-slate-700 text-body';

  return (
    <label htmlFor="select" className="flex flex-col">
      <span className="mb-2 text-xs font-bold uppercase text-body">
        {label}
      </span>
      <select
        id="select"
        className={classNames(className, tw)}
        {...props}
        value={value}
        ref={ref}
      >
        {options.map((option) => (
          <option key={option[itemValue]} value={option[itemValue]}>
            {option[itemText]}
          </option>
        ))}
      </select>
      {!!error && (
        <p className="flex items-center mt-1 text-xs text-error">{error}</p>
      )}
    </label>
  );
};

export const Select = forwardRef(SelectComponent);

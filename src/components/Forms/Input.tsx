import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import classNames from 'classnames';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label: string;
  error?: string;
  tw?: string;
};

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, tw, error, ...props }: InputProps,
  ref
) => {
  const className =
    'p-4 placeholder-opacity-0 border-none rounded-md placeholder-slate-500 h-9 bg-slate-700 text-body focus:placeholder-opacity-100';

  return (
    <label className="flex flex-col">
      <span className="mb-2 text-xs font-bold uppercase text-body">
        {label}
      </span>
      <input {...props} className={classNames(className, tw)} ref={ref} />

      <p className="flex items-center mt-1 text-xs text-error">{error}</p>
    </label>
  );
};

export const Input = forwardRef(InputComponent);

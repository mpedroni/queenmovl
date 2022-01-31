import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { FiPlus } from 'react-icons/fi';

import { BaseButton } from '../Button';

interface ControlsProps extends HTMLAttributes<HTMLDivElement> {
  onAddItem: () => void;
}

export function Controls({ onAddItem, ...props }: ControlsProps) {
  const className = 'p-4 rounded-lg shadow-md bg-slate-800';

  return (
    <div {...props} className={classNames(className, props.className)}>
      <BaseButton Icon={FiPlus} tw="bg-highlight" onClick={onAddItem}>
        Adicionar Item
      </BaseButton>
    </div>
  );
}

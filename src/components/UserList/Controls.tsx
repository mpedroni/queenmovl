import classNames from 'classnames';
import { HTMLAttributes, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { BaseButton } from '../Button';
import { NewListItem } from '../Modals/NewListItem';

interface ControlsProps extends HTMLAttributes<HTMLDivElement> {}

export function Controls({ ...props }: ControlsProps) {
  const [isNewListItemModalOpen, setIsNewListItemModalOpen] = useState(false);

  const className = 'p-4 rounded-lg shadow-md bg-slate-800';

  function handleNewListItemModalStatus() {
    setIsNewListItemModalOpen(!isNewListItemModalOpen);
  }

  return (
    <>
      <div {...props} className={classNames(className, props.className)}>
        <BaseButton
          Icon={FiPlus}
          tw="bg-highlight"
          onClick={handleNewListItemModalStatus}
        >
          Adicionar Item
        </BaseButton>
      </div>

      {isNewListItemModalOpen && (
        <NewListItem
          isOpen={isNewListItemModalOpen}
          onRequestClose={handleNewListItemModalStatus}
        />
      )}
    </>
  );
}

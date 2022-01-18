import { ButtonHTMLAttributes, cloneElement } from 'react';
import { IconType } from 'react-icons';
import classNames from 'classnames';

export const sizes = {
  md: {
    text: 'h-9 text-sm p-4',
    icon: 'text-lg',
  },
  xl: {
    text: 'h-14 text-base p-6',
    icon: 'text-xl',
  },
};

type BaseButtonStyles = {
  tw?: string;
  size?: 'md' | 'xl';
  Icon?: IconType;
};

type BaseButtonProps = BaseButtonStyles &
  // should use `tw` prop to custom styles
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function BaseButton({
  tw = '',
  size = 'md',
  Icon,
  ...props
}: BaseButtonProps) {
  const className =
    'flex items-center justify-center font-medium tracking-widest uppercase transition rounded-md shadow-md hover:brightness-90 text-heading disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:filter-none';

  return (
    <button
      {...props}
      className={classNames(className, tw, sizes[size].text)}
      data-testid="button"
    >
      {!!Icon && (
        <Icon className={`${sizes[size].icon} mr-2`} data-testid="icon" />
      )}
      <span className="flex items-center justify-center">{props.children}</span>
    </button>
  );
}

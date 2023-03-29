import classNames from 'classnames';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  secondary?: boolean;
  loading?: boolean;
  className?: string;
  sizeClassName?: string;
}

export function Button({
  children,
  secondary = false,
  loading = false,
  className,
  sizeClassName = 'text-base',
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles['container'],
        !secondary
          ? 'text-white bg-primary-500 rounded-[62px] px-16 py-2.5'
          : 'text-primary-500',
        className,
        sizeClassName
      )}
    >
      {children}
    </button>
  );
}

export default Button;

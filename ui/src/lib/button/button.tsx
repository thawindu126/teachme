import classNames from 'classnames';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <div className={classNames(styles['container'])}>
      <button>{props.children}</button>
    </div>
  );
}

export default Button;

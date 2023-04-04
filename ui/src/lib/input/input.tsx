import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import classNames from 'classnames';
import styles from './input.module.css';

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export function Input({
  className,
  name,
  onChange,
  value,
  placeholder,
}: InputProps) {
  return (
    <input
      className={classNames(styles['container'], className)}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    ></input>
  );
}

export default Input;

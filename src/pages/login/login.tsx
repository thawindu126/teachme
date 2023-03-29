import { Link } from 'react-router-dom';
import styles from './login.module.css';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Login!</h1>
      <Link to="/signup">Create an account</Link>
    </div>
  );
}

export default Login;

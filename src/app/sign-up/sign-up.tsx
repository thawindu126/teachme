import { Link } from 'react-router-dom';
import styles from './sign-up.module.css';

/* eslint-disable-next-line */
export interface SignUpProps {}

export function SignUp(props: SignUpProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SignUp!</h1>
      <Link to="/login">Already a member</Link>
    </div>
  );
}

export default SignUp;

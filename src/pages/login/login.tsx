import { Link } from 'react-router-dom';
import styles from './login.module.css';
import BackgroundPattern from '../../assets/background-pattern.png';
import iconEye from '../../assets/icon-eye.png';
import { Button } from '@teachme/ui';
import logo from '../../assets/logo.png';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  return (
    <div className={styles['container']} style={{ backgroundImage: `url(${BackgroundPattern})` }}>
        <div className={styles['left']}>
          <div>
            <img className={styles["logo"]} src={logo} alt='Teachme Logo'/>
            <div
              className={classNames(
                styles['slogan'],
                'flex items-center justify-center flex-col'
              )}
            >
              <h1 className="text-5xl font-bold text-white">TeachMe</h1>
              <span className=" inline-block mt-2 text-2xl text-white font-medium ms">
                I'm listening
              </span>
            </div>
          </div>
          
        </div>
        <div className={styles['right']}>
          <Button value="Create an account" sizeClassName='text-xs' className={styles['top-button']} >Create an account</Button>
          <Button value="Log in" className={styles['bottom-button']}>Log in</Button>
          <div className={styles['text']}>
              <div className={styles["login"]}>
                  <span className={styles["login-title"]}>Login</span>
        
                  <input className={styles["email"]} type="text" placeholder="Email Address" />
                  <div className={styles["password-div"]}>
                    <input
                      className={styles["password"]}
                      type="password"
                      placeholder="Password"
                    /><img className={styles["see-password"]} src={iconEye} alt='show password'/>
                  </div>
                  <div className={styles["checkbox"]}>
                    <input type="checkbox" /><span>Remember me</span>
                  </div>
                  <a href='#' className={styles['forgot-password']}>Forgot password?</a>
              </div>
          </div>
        </div>

    </div>
  );
}

export default Login;

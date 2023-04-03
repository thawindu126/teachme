import { Button, Input } from '@teachme/ui';
import { ChangeEvent, useState } from 'react';

import BackgroundPattern from '../../assets/background-pattern.png';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import classNames from 'classnames';
import eyeIcon from '../../assets/icon-eye.png';
import styles from './sign-up.module.css';

export function SignUp() {
  const [email, setEmail] = useState<string>('');
  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState<string>('');
  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const confirmPasswordInputHnadler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className={classNames(styles['container'])}>
      <div className={classNames(styles['left-column'])}>
        <div
          className={classNames(styles['background'])}
          style={{ backgroundImage: `url(${BackgroundPattern})` }}
        />
        <div className={classNames(styles['left-column-content'])}>
          <img src={Logo} className={classNames(styles['logo'])} />
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

      <div
        className={classNames(
          styles['right-column'],
          styles['right-column-background']
        )}
        style={{ backgroundImage: `url(${BackgroundPattern})` }}
      >
        <div
          className={classNames(
            styles['right-column'],
            styles['right-column-content'],
            'flex flex-col justify-center items-center'
          )}
        >
          <Link to="/login">
            <Button className={classNames(styles['already-member-button'])}>
              Already member?
            </Button>
          </Link>

          <div className={classNames(styles['content'], 'flex flex-col')}>
            <span
              className={classNames(styles['signup-header'], 'text-4xl ml-0')}
            >
              Sign up
            </span>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => emailInputHandler(e)}
              />
              <div className={classNames('relative')}>
                <Input
                  type="password"
                  id="password "
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => passwordInputHandler}
                />
                <img
                  src={eyeIcon}
                  className={classNames('absolute right-0 bottom-1 w-8 ')}
                />
              </div>
              <div className={classNames('relative')}>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={confirmPasswordInputHnadler}
                />
                <img
                  src={eyeIcon}
                  className={classNames('absolute right-0 bottom-1 w-8')}
                />
              </div>
            </div>
            <Link to="/onboarding" className={classNames('self-end text-3xl')}>
              <Button
                type="submit"
                className={classNames(styles['signup-bitton'])}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

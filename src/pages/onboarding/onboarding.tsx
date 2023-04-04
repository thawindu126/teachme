import { Button, Input } from '@teachme/ui';
import { ChangeEvent, useState } from 'react';

import BackgroundPatternOriginal from '../../assets/background-pattern-original.png';
import Logo from '../../assets/logo.png';
import classNames from 'classnames';
import styles from './onboarding.module.css';

/* eslint-disable-next-line */
export interface OnboardingProps {}

export function Onboarding(props: OnboardingProps) {
  const [name, setName] = useState<string>('');
  const nameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [education, setEducation] = useState<string>('');
  const educationInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEducation(e.target.value);
  };

  const [topic, setTopic] = useState<string>('');
  const topicInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  return (
    <div
      className={styles['container']}
      style={{ backgroundImage: `url(${BackgroundPatternOriginal})` }}
    >
      <div
        className={styles['redStrip']}
        style={{ backgroundImage: `url(${BackgroundPatternOriginal})` }}
      ></div>
      <div id="sloganBrand"></div>

      <div>
        <div className={styles['centerAlign']}>
          <img src={Logo} alt="logo" className={styles['logo']} />
          <span className={classNames(styles['title'], 'text-white')}>
            Thank you for signing up!
          </span>
          <span className={classNames(styles['subtitle'], 'text-white')}>
            Can you give us a little more info about yourself?
          </span>
        </div>

        <div
          className={classNames(
            styles['alignBottom'],
            styles['bottom'],
            'relative'
          )}
        >
          <div
            className={classNames(styles['leftAlign'], styles['questionGroup'])}
          >
            <label>Your full name?</label>
            <Input
              value={name}
              onChange={nameInputHandler}
              placeholder="John Doe"
              name="name"
            ></Input>
          </div>

          <div
            className={classNames(styles['leftAlign'], styles['questionGroup'])}
          >
            <span>Highest educational experience</span>
            <Input
              placeholder="Bachelor’s Degree"
              value={education}
              onChange={(e) => educationInputHandler(e)}
              name="education"
            ></Input>
          </div>

          <div
            className={classNames(styles['leftAlign'], styles['questionGroup'])}
          >
            <span>Interested topics</span>
            <Input
              value={topic}
              onChange={(e) => topicInputHandler(e)}
              placeholder="Radiation techniques, Nuclear fusion, Isomorphism"
              name="topic"
            ></Input>
          </div>
          <Button
            className={classNames(
              styles['nextButton'],
              'absolute right-20 -bottom-4 w-fit'
            )}
          >
            Next!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;

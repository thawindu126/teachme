import { Button, Layout } from '../../../ui/src';

import { Link } from 'react-router-dom';
import { Path } from '@teachme/types/constants';
import achievementOne from '../../assets/homepage-assets/Two-Sessino-Star.png';
import achievementThree from '../../assets/homepage-assets/momentum-maker.png';
import achievementTwo from '../../assets/homepage-assets/Session-Sensation.png';
import backgroundPatternOriginal from '../../assets/background-pattern-original.png';
import classNames from 'classnames';
import mic from '../../assets/homepage-assets/mic.png';
import styles from './homepage.module.css';

/* eslint-disable-next-line */
export interface HomepageProps {}

export function Homepage(props: HomepageProps) {
  return (
    <Layout className={styles['container']}>
      <div
        className={classNames(
          styles['background'],
          'w-full h-full bg-cover bg-center'
        )}
        style={{ backgroundImage: `url(${backgroundPatternOriginal})` }}
      >
        <div className={classNames(styles['left'])}>
          <section
            className={classNames(
              styles['top-section'],
              'flex items-center justify-center'
            )}
          >
            <div className={classNames(styles['profile-info'])}>
              <span></span>
              <span></span>
              <span className={classNames('flex items-center justify-evenly')}>
                <img
                  src={achievementOne}
                  className={classNames(styles['achievement-badge'])}
                />
                <img
                  src={achievementTwo}
                  className={classNames(styles['achievement-badge'])}
                />
                <img
                  src={achievementThree}
                  className={classNames(styles['achievement-badge'])}
                />
              </span>
            </div>
          </section>
          <section
            className={classNames(
              styles['middle-section'],
              'flex items-center justify-center'
            )}
          >
            <div
              className={classNames(
                'flex flex-col items-center justify-center'
              )}
            >
              <img
                src={mic}
                alt="mic-icon"
                className={classNames(styles['mic'])}
              />
              <div className={classNames('font-semibold')}>Start Session</div>
            </div>
          </section>
          <section className={classNames(styles['quote'])}></section>
        </div>
        <div className={classNames(styles['right'])}></div>
      </div>
    </Layout>
  );
}

export default Homepage;

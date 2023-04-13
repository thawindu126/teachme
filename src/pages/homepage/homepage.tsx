import { Button, Layout } from '../../../ui/src';
import { avatarArray, recordsPlaceholder } from './placeholder.module';

import { Link } from 'react-router-dom';
import { Path } from '@teachme/types/constants';
import achievementOne from '../../assets/homepage-assets/Two-Sessino-Star.png';
import achievementThree from '../../assets/homepage-assets/momentum-maker.png';
import achievementTwo from '../../assets/homepage-assets/Session-Sensation.png';
import backgroundPatternOriginal from '../../assets/background-pattern-original.png';
import classNames from 'classnames';
import mic from '../../assets/homepage-assets/mic.png';
import starIcon from '../../assets/homepage-assets/icon -star.png';
import styles from './homepage.module.css';
import { useState } from 'react';
import userIcon from '../../assets/homepage-assets/Profile-Picture-Group.png';

/* eslint-disable-next-line */
export interface HomepageProps {}
interface records {
  title: string;
  date: string;
  points: number;
  score: string;
  avatar: number;
}

export function Homepage(props: HomepageProps) {
  const [name, setName] = useState<string>('Jane Doe');
  const [points, setPoints] = useState<number>(799002);
  const [pastRecords, setPastRecords] = useState<records[]>(recordsPlaceholder);

  return (
    <Layout className={classNames(styles['container'])}>
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
            <div
              className={classNames(
                styles['profile-info'],
                'flex justify-around items-center h-min w-full bg-white'
              )}
            >
              <img
                src={userIcon}
                className={classNames(styles['profile-pic'])}
              />
              <span className={classNames('flex flex-col')}>
                <span className={classNames(styles['name'])}>{name}</span>
                <span className={classNames('flex items-center')}>
                  <img src={starIcon} className={classNames('w-5 h-4')} />
                  <span className={styles['profile-text']}>Total points:</span>
                  <span className={classNames(styles['profile-text'])}>
                    {points}
                  </span>
                </span>
              </span>
              <span className={classNames('flex flex-row')}>
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
              <div
                className={classNames(
                  styles['start-session-text'],
                  'text-red-500 font-medium'
                )}
              >
                Start Session
              </div>
            </div>
          </section>
          <section className={classNames(styles['quote'], 'bg-white')}>
            <span className={classNames(styles['quote-text'])}>
              “If you can't explain it{' '}
              <span
                className={classNames(styles['quote-simply'], 'text-red-500')}
              >
                simply
              </span>
              , you don't understand it well enough”
            </span>
          </section>
        </div>
        <div
          className={classNames(
            styles['right'],
            'flex justify-center items-center'
          )}
        >
          <section
            className={classNames(styles['session-records'], 'bg-white')}
          >
            <div className={classNames(styles['session-record-title'])}>
              Session Records
            </div>
            <hr className={classNames(styles['hr'], 'bg-red-500')}></hr>
            {pastRecords.map((record, index) => {
              console.log(avatarArray[index]);
              return (
                <div
                  key={index}
                  className={classNames(styles['record'], 'bg-white')}
                >
                  <section className={classNames(styles['first'])}>
                    <span>
                      Title:<span>{record.title}</span>
                    </span>
                    <span>
                      Points:<span>{record.points}</span>
                    </span>
                    <span className={classNames(styles['date'])}>
                      Date:<span>{record.date}</span>
                    </span>
                  </section>
                  <section
                    className={classNames(
                      styles['second'],
                      'text-red-500 font-semibold'
                    )}
                  >
                    <span>{record.score}/100</span>
                  </section>
                  <section className={classNames(styles['third'])}>
                    <img src={avatarArray[record.avatar]}></img>
                  </section>
                </div>
              );
            })}
            <div></div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;

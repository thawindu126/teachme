import { Button, Layout } from '../../../ui/src';

import backgroundPatternOriginal from '../../assets/background-pattern-original.png';
import { chaptersPlaceholder } from './placeholder.module';
import classNames from 'classnames';
import inProgressIcon from './assets/inProgress.png';
import styles from './chapters.module.css';
import tickIcon from './assets/tick.png';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface ChaptersProps {}
interface records {
  title: string;
  date: string;
  done: boolean;
}

export function Chapters(props: ChaptersProps) {
  const [pastRecords, setPastRecords] =
    useState<records[]>(chaptersPlaceholder);

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
          <div className={classNames(styles['chapters'])}>
            <span className={classNames(styles['chapters-title'])}>
              Chapters
            </span>

            <Button className={classNames(styles['new-chapter-text'])}>
              Start New Chapter
            </Button>
            {pastRecords.map((chapter, index) => {
              return (
                <div
                  key={index}
                  className={classNames(styles['chapter'], 'bg-white')}
                >
                  {chapter.done ? (
                    <img
                      src={tickIcon}
                      className={classNames(styles['icon'])}
                    />
                  ) : (
                    <img
                      src={inProgressIcon}
                      className={classNames(styles['icon'])}
                    />
                  )}
                  <span>{chapter.title}</span>
                  <span>{chapter.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Chapters;

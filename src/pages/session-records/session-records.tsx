import { Layout } from '@teachme/ui';
import styles from './session-records.module.css';
import RetryButton from '../../assets/Retry button.png';
import Avatar from '../../assets/Avatar.png';
import BackgroundPattern from '../../assets/Background-white.png';

/* eslint-disable-next-line */
export interface SessionRecordsProps {}

export function SessionRecords(props: SessionRecordsProps) {
  return (
    <Layout>
    <div className={styles['background']} style={{ backgroundImage: `url(${BackgroundPattern})` }}>
        <div className={styles["container"]}>
          <div className={styles["heading"]}><span className={styles["session-records"]}>Session Records</span></div>
          <div className={styles["content"]}>
            <div className={styles["record-card"]}>
                <div className={styles["info"]}>
                    <div className={styles["topic"]}><span className={styles["type"]}>Topic:</span><span>Photosynthesis</span></div>
                    <div className={styles["points"]}><span className={styles["type"]}>Points:</span><span>90</span></div>
                    <div className={styles["date"]}><span className={styles["type"]}>Date:</span><span>2nd March 2023</span></div>
                </div>
                <div className={styles["score"]}><span style={{marginRight: 10}}>Score:</span><div className={styles["value"]}>57/100</div></div>
                <div className={styles["right"]}><a href='#'> <img src={RetryButton} alt="retry" className={styles["retry-button"]}/></a><img src={Avatar} alt={styles["avatar"]} className={styles["avatar"]}/></div>
            </div>
            <div className={styles["record-card"]}>
                <div className={styles["info"]}>
                    <div className={styles["topic"]}><span className={styles["type"]}>Topic:</span><span>Photosynthesis</span></div>
                    <div className={styles["points"]}><span className={styles["type"]}>Points:</span><span>90</span></div>
                    <div className={styles["date"]}><span className={styles["type"]}>Date:</span><span>2nd March 2023</span></div>
                </div>
                <div className={styles["score"]}><span style={{marginRight: 10}}>Score:</span><div className={styles["value"]}>57/100</div></div>
                <div className={styles["right"]}><a href='#'> <img src={RetryButton} alt="retry" className={styles["retry-button"]}/></a><img src={Avatar} alt={styles["avatar"]} className={styles["avatar"]}/></div>
            </div>
            <div className={styles["record-card"]}>
                <div className={styles["info"]}>
                    <div className={styles["topic"]}><span className={styles["type"]}>Topic:</span><span>Photosynthesis</span></div>
                    <div className={styles["points"]}><span className={styles["type"]}>Points:</span><span>90</span></div>
                    <div className={styles["date"]}><span className={styles["type"]}>Date:</span><span>2nd March 2023</span></div>
                </div>
                <div className={styles["score"]}><span style={{marginRight: 10}}>Score:</span><div className={styles["value"]}>57/100</div></div>
                <div className={styles["right"]}><a href='#'> <img src={RetryButton} alt="retry" className={styles["retry-button"]}/></a><img src={Avatar} alt={styles["avatar"]} className={styles["avatar"]}/></div>
            </div>
            <div className={styles["record-card"]}>
                <div className={styles["info"]}>
                    <div className={styles["topic"]}><span className={styles["type"]}>Topic:</span><span>Photosynthesis</span></div>
                    <div className={styles["points"]}><span className={styles["type"]}>Points:</span><span>90</span></div>
                    <div className={styles["date"]}><span className={styles["type"]}>Date:</span><span>2nd March 2023</span></div>
                </div>
                <div className={styles["score"]}><span style={{marginRight: 10}}>Score:</span><div className={styles["value"]}>57/100</div></div>
                <div className={styles["right"]}><a href='#'> <img src={RetryButton} alt="retry" className={styles["retry-button"]}/></a><img src={Avatar} alt={styles["avatar"]} className={styles["avatar"]}/></div>
            </div>
            <div className={styles["record-card"]}>
                <div className={styles["info"]}>
                    <div className={styles["topic"]}><span className={styles["type"]}>Topic:</span><span>Photosynthesis</span></div>
                    <div className={styles["points"]}><span className={styles["type"]}>Points:</span><span>90</span></div>
                    <div className={styles["date"]}><span className={styles["type"]}>Date:</span><span>2nd March 2023</span></div>
                </div>
                <div className={styles["score"]}><span style={{marginRight: 10}}>Score:</span><div className={styles["value"]}>57/100</div></div>
                <div className={styles["right"]}><a href='#'> <img src={RetryButton} alt="retry" className={styles["retry-button"]}/></a><img src={Avatar} alt={styles["avatar"]} className={styles["avatar"]}/></div>
            </div>
            <div className={styles["record-card"]}>
                <div className={styles["info"]}>
                    <div className={styles["topic"]}><span className={styles["type"]}>Topic:</span><span>Photosynthesis</span></div>
                    <div className={styles["points"]}><span className={styles["type"]}>Points:</span><span>90</span></div>
                    <div className={styles["date"]}><span className={styles["type"]}>Date:</span><span>2nd March 2023</span></div>
                </div>
                <div className={styles["score"]}><span style={{marginRight: 10}}>Score:</span><div className={styles["value"]}>57/100</div></div>
                <div className={styles["right"]}><a href='#'> <img src={RetryButton} alt="retry" className={styles["retry-button"]}/></a><img src={Avatar} alt={styles["avatar"]} className={styles["avatar"]}/></div>
            </div>
          </div>
        </div>
    </div>
    </Layout>
  );
}

export default SessionRecords;

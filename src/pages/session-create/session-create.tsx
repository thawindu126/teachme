import styles from './session-create.module.css';
import BlackBackButton from '../../assets/Black Back button.png';
import BackgroundPattern from '../../assets/Background-white.png';
import Avatar from '../../assets/Avatar.png';
import Next from '../../assets/next.png';
import Mic from '../../assets/mic.png';
import { Layout } from '@teachme/ui';

/* eslint-disable-next-line */
export interface SessionCreateProps {}

export function SessionCreate(props: SessionCreateProps) {
  return (
    <Layout>
    <div className={styles['background']} style={{ backgroundImage: `url(${BackgroundPattern})` }}>
      <img className={styles['back-button']} src={BlackBackButton} alt='back' />
      {/* <div className={styles['top-bar']}></div>
      <div className={styles['nav-bar']}></div> */}    
      <div className={styles['container']}>
          <div className={styles["content"]}>
              <div className={styles["enter-topic"]}>
                  <input className={styles["topic"]} type="text" placeholder="Enter you topic" />
                  <a href="#"><img className={styles["mic"]} src={Mic} alt='Mic'/></a>
                  <a href="../session/:id"><img className={styles["next"]} src={Next} alt='next'/></a>
              </div>
              <div className={styles["dialogue"]}>
                  <img src={Avatar} alt="avatar" className={styles["avatar"]} />
                  <div className={styles["speech-bubble"]}><span className={styles["text-inside"]}>What are you going to teach me today?</span></div>
              </div>
          </div>
      </div>
    </div>
    </Layout>
  );
}

export default SessionCreate;

import styles from './achievements.module.css';
import BackgroundPattern from '../../assets/Background-white.png';
import { Layout } from '@teachme/ui';
import DayOneDone from '../../assets/Day One Done.png';
import ProfilePic from '../../assets/profile pic.png';
import IronWill from '../../assets/Iron Will.png';
import MomentumMaker from '../../assets/Momentum Maker.png';
import MonthMarvel from '../../assets/Month Marvel.png';
import PerfectlyPolished from '../../assets/Perfectly Polished.png';
import PremIumPlayer from '../../assets/Premium Player.png';
import RealityCheck from '../../assets/Reality Check.png';
import SessionSensation from '../../assets/Session Sensation.png';
import SessionSizzler from '../../assets/Session Sizzler.png';
import SessionSlayer from '../../assets/Session Slayer.png';
import SessionSuperstar from '../../assets/Session Superstar.png';
import SevenDay from '../../assets/Seven-Day Sprinter.png';
import TwoSessionStar from '../../assets/Two-Sessino Star.png';
import TenSessionTitan from '../../assets/Ten-session Titan.png';

/* eslint-disable-next-line */
export interface AchievementsProps {}

export function Achievements(props: AchievementsProps) {
  return (
    <Layout>
        <div className={styles['background']} style={{ backgroundImage: `url(${BackgroundPattern})` }}>
          <div className={styles["container"]}>
            <div className={styles["content"]}>
              <div className={styles["top-half"]}>
                <span className={styles["heading"]}>Achievements</span>
                <div id={styles["profile"]}>
                  <div className={styles["profile-circle"]}></div>
                  <img className={styles["profile-pic"]} src={ProfilePic} alt='Profile Pic' />
                  <div className={styles["level"]}>IV</div>
                </div>
              </div>
              <div className={styles["bottom-half"]}>
                  <div className={styles["div1"]}>
                      <div className={styles["badge"]}><img className={styles["images"]} src={DayOneDone} alt="Day one done"/><span className={styles["achievement-name"]}>Day One Done</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={SessionSensation} alt="Day one done"/><span className={styles["achievement-name"]}>Session Sensation</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={SessionSizzler} alt="Day one done"/><span className={styles["achievement-name"]}>Session Sizzler</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={SessionSuperstar} alt="Day one done"/><span className={styles["achievement-name"]}>Session Superstar</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={SessionSlayer} alt="Day one done"/><span className={styles["achievement-name"]}>Session Slayer</span></div>
                   </div>
                   <div className={styles["div1"]}>
                      <div className={styles["badge"]}><img className={styles["images"]} src={MomentumMaker} alt="Day one done"/><span className={styles["achievement-name"]}>Momentum Maker</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={SevenDay} alt="Day one done"/><span className={styles["achievement-name"]}>Seven-Day Sprinter</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={MonthMarvel} alt="Day one done"/><span className={styles["achievement-name"]}>Fortnight Phenom</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={MonthMarvel} alt="Day one done"/><span className={styles["achievement-name"]}>Month Marvel</span></div>
                   </div>
                   <div className={styles["div1"]}>
                      <div className={styles["badge"]}><img className={styles["images"]} src={PerfectlyPolished} alt="Day one done"/><span className={styles["achievement-name"]}>Perfectly Polished</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={RealityCheck} alt="Day one done"/><span className={styles["achievement-name"]}>Reality Check</span></div>                  
                   </div>
                   <div className={styles["div1"]}>
                      <div className={styles["badge"]}><img className={styles["images"]} src={TwoSessionStar} alt="Day one done"/><span className={styles["achievement-name"]}>Two-Session Star</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={TwoSessionStar} alt="Day one done"/><span className={styles["achievement-name"]}>Five-Session Feat</span></div>
                      <div className={styles["badge"]}><img className={styles["images"]} src={TenSessionTitan} alt="Day one done"/><span className={styles["achievement-name"]}>Ten-Session Titan</span></div>
                  </div>
                  <div className={styles["div1"]}>
                      <div className={styles["badge"]}><img className={styles["images"]} src={PremIumPlayer} alt="Day one done"/><span className={styles["achievement-name"]}>Premium Player</span></div>
                 </div>
                 <div className={styles["div1"]}>
                      <div className={styles["badge"]}><img className={styles["images"]} src={IronWill} alt="Day one done"/><span className={styles["achievement-name"]}>Iron Will</span></div>
                 </div>
              </div>
            </div>
          </div>     
        </div>
    </Layout>
  );
}

export default Achievements;

import { Layout } from '@teachme/ui';
import styles from './session.module.css';
import BackgroundPattern from '../../assets/Background-white.png';
import Avatar from '../../assets/Avatar.png';
import ProfilePic from '../../assets/profile pic.png';
import Mic from '../../assets/mic.png';
import TextMode from '../../assets/Text mode button.png';

/* eslint-disable-next-line */
export interface SessionProps {}

export function Session(props: SessionProps) {
  return (
    <Layout>
      <div className={styles['background']} style={{ backgroundImage: `url(${BackgroundPattern})` }}>
        <div className={styles["container"]}>
          <div className={styles["heading"]}><span className={styles["topic"]}>Photosynthesis</span></div>
          <div className={styles["content"]}>   
            <div className={styles["student-speech"]}>
                <div className={styles["dialogue"]}> 
                    <div className={styles["speech-bubble"]}><span className={styles["text-inside"]}>What is photosynthesis? Can you explain</span></div>
                    <img src={Avatar} alt="avatar" className={styles["avatar"]}/>
                </div>
            </div>
            <div className={styles["your-speech"]}>
                <div className={styles["dialogue2"]}> 
                    <img src={ProfilePic} alt="Profile" className={styles["avatar2"]} />
                    <div className={styles["speech-bubble2"]}><p className={styles["text-inside2"]}>What are you going to teach me today? efnwe neivweoif efiwnfo diwdjwd wdiaoiwfj djqwdiwj whi eiejf eiwqfjoei wefiwefjiej eifjwe fpwifj eijwef pew yo wefjnweif efijwf ovefoh woufhwe wofheufhwo wida flsjefnwfn fweifjw fiwjf aifja lavj aiajef apivj eiajf awfjjdv fjawed weofi </p><input type="checkbox" className={styles["see-all"]} /><div className={styles["line"]} ></div></div>
                </div>
            </div>
            <div className={styles["student-speech"]}>
                <div className={styles["dialogue"]}> 
                    <div className={styles["speech-bubble"]}><span className={styles["text-inside"]}>What is photosynthesis? Can you explain</span></div>
                    <img src={Avatar} alt="avatar" className={styles["avatar"]}/>
                </div>
            </div>
            <div className={styles["your-speech"]}>
                <div className={styles["dialogue2"]}> 
                    <img src={ProfilePic} alt="Profile" className={styles["avatar2"]} />
                    <div className={styles["speech-bubble2"]}><p className={styles["text-inside2"]}>What are you going to teach me today? efnwe neivweoif efiwnfo diwdjwd wdiaoiwfj djqwdiwj whi eiejf eiwqfjoei wefiwefjiej eifjwe fpwifj eijwef pew yo wefjnweif efijwf ovefoh woufhwe wofheufhwo wida flsjefnwfn fweifjw fiwjf aifja lavj aiajef apivj eiajf awfjjdv fjawed weofi </p><input type="checkbox" className={styles["see-all"]} /><div className={styles["line"]} ></div></div>
                </div>
            </div>
            <div className={styles["student-speech"]}>
                <div className={styles["dialogue"]}> 
                    <div className={styles["speech-bubble"]}><span className={styles["text-inside"]}>What is photosynthesis? Can you explain</span></div>
                    <img src={Avatar} alt="avatar" className={styles["avatar"]}/>
                </div>
            </div>
            <div className={styles["your-speech"]}>
                <div className={styles["dialogue2"]}> 
                    <img src={ProfilePic} alt="Profile" className={styles["avatar2"]} />
                    <div className={styles["speech-bubble2"]}><p className={styles["text-inside2"]}>What are you going to teach me today? efnwe neivweoif efiwnfo diwdjwd wdiaoiwfj djqwdiwj whi eiejf eiwqfjoei wefiwefjiej eifjwe fpwifj eijwef pew yo wefjnweif efijwf ovefoh woufhwe wofheufhwo wida flsjefnwfn fweifjw fiwjf aifja lavj aiajef apivj eiajf awfjjdv fjawed weofi </p><input type="checkbox" className={styles["see-all"]} /><div className={styles["line"]} ></div></div>
                </div>
            </div>
            <div className={styles["student-speech"]}>
                <div className={styles["dialogue"]}> 
                    <div className={styles["speech-bubble"]}><span className={styles["text-inside"]}>What is photosynthesis? Can you explain</span></div>
                    <img src={Avatar} alt="avatar" className={styles["avatar"]}/>
                </div>
            </div>
            <div className={styles["your-speech"]}>
                <div className={styles["dialogue2"]}> 
                    <img src={ProfilePic} alt="Profile" className={styles["avatar2"]} />
                    <div className={styles["speech-bubble2"]}><p className={styles["text-inside2"]}>What are you going to teach me today? efnwe neivweoif efiwnfo diwdjwd wdiaoiwfj djqwdiwj whi eiejf eiwqfjoei wefiwefjiej eifjwe fpwifj eijwef pew yo wefjnweif efijwf ovefoh woufhwe wofheufhwo wida flsjefnwfn fweifjw fiwjf aifja lavj aiajef apivj eiajf awfjjdv fjawed weofi </p><input type="checkbox" className={styles["see-all"]} /><div className={styles["line"]} ></div></div>
                </div>
            </div>
            <div className={styles["bottom-bar"]}><span className={styles["time"]}>5:20</span><img className={styles["mic"]} src={Mic} alt="mic" /><a href="#"><img className={styles["text-mode"]} src={TextMode} alt="text mode" /></a></div>
          </div>
           
        </div> 
        
      </div>
    </Layout>
  );
}

export default Session;

import styles from './profile.module.css';
import BackgroundPattern from '../../assets/background-two-colours.png';
import ProfilePic from '../../assets/profile pic.png';
import Calendar from '../../assets/🦆 icon _calendar schedule_.png';
import Star from '../../assets/Total points.png';
import Slogan from '../../assets/Brand & Slogan.png';
import { Button } from '@teachme/ui';
import BackButton from '../../assets/Back button.png';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  return (
    <div className={styles['container']} style={{ backgroundImage: `url(${BackgroundPattern})` }}>
      <img className={styles['back-button']} src={BackButton} alt='back' />
      <div className={styles['top-bar']}></div>
      <div className={styles['nav-bar']}></div>
       <div className={styles['content']}>
        <div className={styles['top-half']}>
          <span className={styles['points']}>254/300</span>
          <div className={styles['profile']}><img className={styles['profile-pic']} src={ProfilePic} alt='ProfilePic' /><div className={styles['level']}>IV</div></div>
        </div>
          <div className={styles['bottom-half']}>
          <div className={styles['name']}>Jane Doe</div>
          <div className={styles['joined']}><img src={Calendar} alt='calendar' style={{height: 15, display: 'inline'}}/> <span>Joined: August 2022</span></div>
          <div className={styles['total-points']}><img src={Star} alt='Star' style={{height: 15, display: 'inline'}}/> <span>Total points: 799,002</span></div>
          <div className={styles['free-plan']}>Free plan</div>
          <Button
                type="submit"
                className={styles['button']}
              >Upgrade your plan</Button>
        </div>
      </div>
  <img className={styles['slogan']} src={Slogan} alt='slogan'/>  
    </div>
  );
}

export default Profile;

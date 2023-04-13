import styles from './subscription.module.css';
import BlackBackButton from '../../assets/Black Back button.png';
import BackgroundPattern from '../../assets/background-two-colours.png';
import { Button, Layout } from '@teachme/ui';
import Certified from '../../assets/certified.png';

/* eslint-disable-next-line */
export interface SubscriptionProps {}

export function Subscription(props: SubscriptionProps) {
  return (
    <Layout>
      <div className={styles['background']} style={{ backgroundImage: `url(${BackgroundPattern})` }}>
      <a href="#"><img className={styles["back-button"]} src={BlackBackButton}/></a>
    <div className={styles["container"]}>
        <div className={styles["card"]}>
            <div className={styles["top-half"]}><div className={styles["text-inside"]}>Free</div></div>
            <div className={styles["bottom-half"]}>
                <div className={styles["sessions-remaining"]}><img src={Certified} alt="certified" style={{width: 20, marginRight: 15}}/><span>10 sessions remaining</span></div>
                <div className={styles["price"]} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 47}}>0 USD<span className={styles["priceText"]} >per month</span></div>
                <div className={styles['button']}><Button className={styles['button-inside']}>Selected plan</Button></div>
                
            </div>
        </div>
        <div className={styles["card"]}>
            <div className={styles["top-half"]}><div className={styles["text-inside"]}>Free</div></div>
            <div className={styles["bottom-half"]}>
                <div className={styles["sessions-remaining"]}><img src={Certified} alt="certified" style={{width: 20, marginRight: 15}}/><span>10 sessions remaining</span></div>
                <div className={styles["price"]} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 47}}>0 USD<span className={styles["priceText"]} >per month</span></div>
                <div className={styles['button']}><Button className={styles['button-inside']}>Selected plan</Button></div>
                
            </div>
        </div>
        <div className={styles["card"]}>
            <div className={styles["top-half"]}><div className={styles["text-inside"]}>Free</div></div>
            <div className={styles["bottom-half"]}>
                <div className={styles["sessions-remaining"]}><img src={Certified} alt="certified" style={{width: 20, marginRight: 15}}/><span>10 sessions remaining</span></div>
                <div className={styles["price"]} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 47}}>0 USD<span className={styles["priceText"]} >per month</span></div>
                <div className={styles['button']}><Button className={styles['button-inside']}>Selected plan</Button></div>
                
            </div>
        </div>
    
    </div>
      </div>
    </Layout>
  );
}

export default Subscription;

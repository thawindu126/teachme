import styles from './onboarding.module.css';

/* eslint-disable-next-line */
export interface OnboardingProps {}

export function Onboarding(props: OnboardingProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Onboarding!</h1>
    </div>
  );
}

export default Onboarding;

import styles from './landing-page.module.css';
import HomePageScreenshot from '../../assets/home-page-screenshot.png';
import NewSessionScreenshot from '../../assets/new-session-screenshot.png';
import CurrentSessionScreenshot from '../../assets/current-session-screenshot.png';
import SessionSummaryScreenshot from '../../assets/session-summary-screenshot.png';
import SessionRecordsScreenshot from '../../assets/session-records-screenshot.png';
import AchievementsScreenshot from '../../assets/achievements-screenshot.png';
import SubscriptionPlansScreenshot from '../../assets/subscription-plans-screenshot.png';
import { ReactComponent as PhoneIcon } from '../../assets/phone.svg';
import { ReactComponent as MailIcon } from '../../assets/mail.svg';
import { ReactComponent as InstagramIcon } from '../../assets/instagram.svg';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg';
import { CarouselImage, Carousel, Button, Layout } from '@teachme/ui';
import { Link } from 'react-router-dom';
import { Path, SOCIALS } from '@teachme/types/constants';
import BackgroundPattern from '../../assets/background-pattern.png';

const SCREENSHOTS: CarouselImage[] = [
  {
    src: HomePageScreenshot,
    alt: 'Home page',
    description: 'Press the speaker button and start a new session',
  },
  {
    src: NewSessionScreenshot,
    alt: 'New session',
    description: 'Enter the topic you want to talk about and hit next',
  },
  {
    src: CurrentSessionScreenshot,
    alt: 'Current session',
    description:
      'Start talking and answering to your student. When you’re done you can review the session',
  },
  {
    src: SessionSummaryScreenshot,
    alt: 'Session summary',
    description: 'Go through each of the review points',
  },
  {
    src: SessionRecordsScreenshot,
    alt: 'Session records',
    description: 'You can also view your past sessions in the session records',
  },
  {
    src: AchievementsScreenshot,
    alt: 'Achievements',
    description:
      'Earn various badges as you broaden your knowledge (to be added)',
  },
];

/* eslint-disable-next-line */
export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  return (
    <Layout className={styles['container']} landingPage>
      <div className="relative flex flex-wrap text-dark overflow-auto lg:overflow-hidden">
        <div className="w-full lg:w-1/2 h-[calc(100vh-4rem)] flex justify-center items-center text-white px-16 py-8">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${BackgroundPattern})` }}
          />
          <Carousel
            images={SCREENSHOTS}
            label="App screenshots"
            hideThumbnails
          />
          <div className="absolute left-16 bottom-10">
            <h1 className="text-3xl font-bold">TeachMe</h1>
            <div className="text-center">I'm listening</div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:max-h-full text-center overflow-hidden lg:overflow-auto z-10">
          <div className="w-full bg-white rounded-tl-[40px]">
            <div className="relative max-w-lg h-[calc(100vh-4rem)] space-y-20 mx-auto py-44">
              <div className="space-y-14">
                <h1 className="font-bold text-4xl">The Feynman Technique</h1>
                <div className="text-2xl">
                  The Feynman Technique is considered to be one of the most
                  effective learning techniques out there. It uses a simple
                  4-step process for understanding any topic or concept quickly
                  and effectively.
                  <br />
                  Try it with us!
                </div>
              </div>
              <div className="space-y-2">
                <Link to={Path.SIGN_UP}>
                  <Button sizeClassName="text-xl">Sign up It's free</Button>
                </Link>
                <div className="text-sm">
                  <div>Already have an account?</div>
                  <Link to={Path.LOGIN}>
                    <Button secondary>Login here</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full h-[calc(100vh-12rem)]">
              <div className="flex-auto mx-auto space-y-8">
                <h1 className="font-bold text-2xl">Our Subscription Plans</h1>
                <img
                  src={SubscriptionPlansScreenshot}
                  alt="Our Subscription Plans"
                />
              </div>
              <div
                className="flex-1 space-y-8 justify-between text-white bg-cover bg-center bg-no-repeat pl-24 pr-48 py-4"
                style={{ backgroundImage: `url(${BackgroundPattern})` }}
              >
                <div className="space-y-2">
                  <div className="text-left">Contact us:</div>
                  <div className="flex justify-between pl-12">
                    <div className="inline-flex gap-x-8">
                      <a
                        href={`tel:${SOCIALS.phone.split(' ').join('')}`}
                        className="inline-flex items-center gap-x-2 hover:underline"
                      >
                        <PhoneIcon className="w-4.5 h-4.5" aria-hidden="true" />
                        <span>{SOCIALS.phone}</span>
                      </a>
                      <a
                        href={`mailto:${SOCIALS.email}`}
                        className="inline-flex items-center gap-x-2 hover:underline"
                      >
                        <MailIcon className="w-4.5 h-4.5" aria-hidden="true" />
                        <span>{SOCIALS.email}</span>
                      </a>
                    </div>
                    <div className="inline-flex items-center gap-x-2">
                      <a
                        href={SOCIALS.instagram}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <InstagramIcon
                          className="w-4.5 h-4.5"
                          aria-hidden="true"
                        />
                      </a>
                      <a
                        href={SOCIALS.facebook}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <FacebookIcon
                          className="w-4.5 h-4.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="inline-flex gap-x-20 mx-auto">
                  <Link
                    to={Path.TERMS_AND_CONDITIONS}
                    className="hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                  <Link to={Path.PRIVACY_POLICY} className="hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;

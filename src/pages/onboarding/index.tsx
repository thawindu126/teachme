import { NextSeo } from "next-seo";
import Image from "next/image";
import BackgroundPatternTransparent from "~/assets/background-pattern-transparent.png";
import Logo from "~/assets/logo.png";
import { classNames } from "~/lib/classNames";
import OnboardingForm from "~/pages/onboarding/OnboardingForm";

import styles from "./onboarding.module.css";

export default function Onboarding() {
  return (
    <>
      <NextSeo title="Onboarding | TeachMe" />
      <div className="bg-white">
        <div
          className={styles.container}
          style={{
            backgroundImage: `url(${BackgroundPatternTransparent.src})`,
          }}>
          <div
            className={styles.redStrip}
            style={{
              backgroundImage: `url(${BackgroundPatternTransparent.src})`,
            }}
          />
          <div className="absolute left-8 top-8 hidden text-center leading-tight text-white md:block lg:left-12 lg:top-12">
            <h1 className="text-3xl font-bold">TeachMe</h1>
            <div className="text-lg">I&apos;m listening</div>
          </div>
          <div>
            <div className={classNames("relative z-10 text-center text-xl text-white")}>
              <Image src={Logo} alt="logo" className={styles.logo} />
              <div>
                <div className={classNames("font-bold")}>Thank you for signing up!</div>
                <div className={classNames("")}>Can you give us a little more info about yourself?</div>
              </div>
            </div>
            <OnboardingForm />
          </div>
        </div>
      </div>
    </>
  );
}

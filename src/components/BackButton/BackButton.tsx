import { useRouter } from "next/router";
import { HiChevronLeft } from "react-icons/hi2";
import { classNames } from "~/lib/classNames";

import styles from "./BackButton.module.scss";

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  if ((globalThis.window?.history?.state as { idx: number })?.idx <= 0) {
    return null;
  }
  return (
    <button
      onClick={() => router.back()}
      className={classNames(
        "inline-flex w-fit items-center space-x-1 transition-colors",
        styles["back-button"],
        className
      )}>
      <HiChevronLeft className="h-6 w-6" aria-hidden="true" />
      <span>Back</span>
    </button>
  );
}

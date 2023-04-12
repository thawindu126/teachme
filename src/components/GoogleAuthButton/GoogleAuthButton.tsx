import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { classNames } from "~/lib/classNames";

import styles from "./GoogleAuthButton.module.scss";

interface GoogleAuthButtonProps {
  context: "login" | "signUp";
  className?: string;
}

export default function GoogleAuthButton({ context, className }: GoogleAuthButtonProps) {
  return (
    <button
      className={classNames(
        "flex h-10 w-96 items-center justify-between rounded border border-gray-200 bg-gray-50 px-3 text-sm transition-colors hover:bg-gray-100",
        styles.container,
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        void signIn("google");
      }}>
      <FcGoogle className="mr-2 h-[18px] w-[18px]" aria-hidden="true" />
      <span className="flex-auto">{context === "login" ? "Sign in" : "Sign up"} with Google</span>
    </button>
  );
}

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { Maybe } from "@trpc/server";
import { classNames } from "~/lib/classNames";
import { UserLevel } from "~/server/lib/user-level";

export type AvatarProps = {
  size: "xs" | "sm" | "md" | "mdLg" | "lg" | "xl";
  className?: string;
  imageSrc?: Maybe<string>;
  alt: string;
  levelDetails?: {
    points: number;
    level: UserLevel;
    pointsToNextLevel: number;
  };
};

const sizesPropsBySize = {
  xs: "w-4 h-4", // 16px
  sm: "w-6 h-6", // 24px
  md: "w-8 h-8", // 32px
  mdLg: "w-10 h-10", //40px
  lg: "w-16 h-16", // 64px
  xl: "w-24 h-24", // 96px
} as const;

export default function Avatar({ imageSrc, size, alt, className, levelDetails }: AvatarProps) {
  return (
    <span className={classNames("relative h-fit", sizesPropsBySize[size])}>
      <AvatarPrimitive.Root
        className={classNames(
          "item-center relative inline-flex aspect-square justify-center overflow-hidden rounded-full bg-white shadow",
          className,
          sizesPropsBySize[size]
        )}>
        <AvatarPrimitive.Image
          src={imageSrc ?? undefined}
          alt={alt}
          className={classNames(
            "relative z-10 aspect-square rounded-full",
            { "scale-90": !!levelDetails },
            sizesPropsBySize[size]
          )}
        />
        {levelDetails && (
          <div
            className="absolute left-0 top-0 z-0 h-full w-full bg-primary-500"
            style={{
              backgroundImage: `linear-gradient(180deg, transparent 50%, white 50%),
      linear-gradient(90deg, white 50%, transparent 50%)`,
            }}
          />
        )}
      </AvatarPrimitive.Root>
      {levelDetails && (
        <div className="absolute right-0 top-0 z-40 h-7 w-7 rounded-full bg-gray-300">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {LEVEL_ROMAN_NUMERALS[levelDetails.level]}
          </span>
        </div>
      )}
    </span>
  );
}

const LEVEL_ROMAN_NUMERALS: { [key in UserLevel]: string } = {
  [UserLevel.ONE]: "I",
  [UserLevel.TWO]: "II",
  [UserLevel.THREE]: "III",
  [UserLevel.FOUR]: "IV",
  [UserLevel.FIVE]: "V",
};

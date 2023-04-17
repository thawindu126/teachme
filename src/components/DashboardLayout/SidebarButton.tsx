import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, type SVGProps, forwardRef } from "react";
import type { NavigationItem } from "~/components/DashboardLayout/DashboardLayout";
import { classNames } from "~/lib/classNames";

export default forwardRef<HTMLAnchorElement, NavigationItem & { children?: ReactNode; className?: string }>(
  function SidebarButton({ icon: iconSrc, current, href, name, children, className }, ref) {
    return (
      <Link ref={ref} href={href} className={className} aria-current={current ? "page" : undefined}>
        <SidebarIcon src={iconSrc} alt={name} current={current} />
        {children}
      </Link>
    );
  }
);

function SidebarIcon({
  src,
  alt,
  current,
}: {
  src: ((props: SVGProps<SVGSVGElement>) => JSX.Element) | StaticImageData;
  alt: string;
  current: boolean;
}) {
  if (typeof src === "function") {
    const Src = src;
    return (
      <Src
        className={classNames("h-5 w-5", current ? "text-white" : "text-primary-900 group-hover:text-white")}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={classNames("h-5 w-5", {
        "[filter:invert(11%)_sepia(96%)_saturate(3169%)_hue-rotate(350deg)_brightness(85%)_contrast(107%)] group-hover:invert":
          !current,
        invert: current,
      })}
      aria-hidden="true"
    />
  );
}

import { Dialog, Transition } from "@headlessui/react";
import { UserStatus } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useMemo, useState, type ReactNode, type SVGProps } from "react";
import { HiXMark } from "react-icons/hi2";
import AchievementsIcon from "~/assets/achievements.png";
import ChaptersIcon from "~/assets/chapters-icon";
import DashboardIcon from "~/assets/dashboard-icon";
import Logo from "~/assets/logo.png";
import SessionRecordsIcon from "~/assets/session-records-icon";
import SessionsIcon from "~/assets/sessions-icon";
import SettingsIcon from "~/assets/settings-icon";
import Header from "~/components/Header/Header";
import { Tooltip, TooltipTheme } from "~/components/ui";
import { classNames } from "~/lib/classNames";
import { WEBAPP_URL } from "~/lib/constants";
import { api } from "~/utils/api";

function useRedirectToLoginIfUnauthenticated() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      void router.replace({
        pathname: "/auth/login",
        query: {
          callbackUrl: `${WEBAPP_URL}${location.pathname}${location.search}`,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, session]);
}
function useRedirectToOnboardingIfNeeded() {
  const router = useRouter();
  const query = api.me.useQuery(undefined, {
    retry(failureCount) {
      return failureCount > 3;
    },
  });

  useEffect(() => {
    if (query.data?.status === UserStatus.PENDING) {
      void router.replace({
        pathname: "/onboarding",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data?.status]);

  return {
    user: query.data,
  };
}

interface DashboardLayoutProps {
  children: ReactNode;
  headerContent?: JSX.Element | JSX.Element[];
  className?: string;
}

export default function DashboardLayout({ children, headerContent, className }: DashboardLayoutProps) {
  useRedirectToLoginIfUnauthenticated();
  const { user } = useRedirectToOnboardingIfNeeded();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = useCallback(
    (path: string, exact = false) => {
      const split = router.pathname.split("/").filter((str) => str.trim());
      if (exact) {
        return split?.[0] === path;
      }

      if (split.length === 1 && split[0] === path) {
        return true;
      }
      const index = split.indexOf(path);
      return index === -1 || index === 0 ? false : true;
    },
    [router.pathname]
  );

  const sidebarNavigation = useMemo(
    () => [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: DashboardIcon,
        current: isActive("dashboard", true),
      },
      {
        name: "New session",
        href: "/dashboard/sessions/new",
        icon: SessionsIcon,
        current: isActive("session"),
      },
      {
        name: "Session records",
        href: "/dashboard/sessions",
        icon: SessionRecordsIcon,
        current: isActive("session-records"),
      },
      {
        name: "Chapters",
        href: "/dashboard/chapters",
        icon: ChaptersIcon,
        current: isActive("chapters"),
      },
      {
        name: "Achievements",
        href: "/dashboard/achievements",
        icon: AchievementsIcon,
        current: isActive("achievements"),
      },
      {
        name: "Settings",
        href: "/dashboard/profile/settings",
        icon: SettingsIcon,
        current: isActive("settings"),
      },
    ],
    [isActive]
  );
  const [mainNavigation, settingsNavigation] = useMemo(
    () => [sidebarNavigation.slice(0, -1), sidebarNavigation[sidebarNavigation.length - 1]],
    [sidebarNavigation]
  );

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Narrow sidebar */}
      <div className="fixed bottom-0 left-0 z-30 hidden h-[calc(100vh-4rem)] w-20 overflow-y-auto overflow-x-hidden bg-primary-700 md:block">
        <div className="flex h-full w-full flex-col items-center py-6">
          <div className="flex w-full flex-1 flex-col items-center gap-y-2">
            {mainNavigation.map((item) => (
              <Tooltip key={item.name} content={item.name} theme={TooltipTheme.Dark} placement="right">
                <Link
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-primary-700 text-white"
                      : "text-primary-100 hover:bg-primary-700 hover:text-white",
                    "group flex h-20 w-20 flex-col items-center justify-center rounded-md p-3 text-xs font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}>
                  {/* <item.icon
                      className={classNames(
                        item.current
                          ? 'text-white'
                          : 'text-primary-300 group-hover:text-white',
                        'h-6 w-6'
                      )}
                      aria-hidden="true"
                    /> */}
                  <SidebarIcon src={item.icon} alt={item.name} current={item.current} />
                </Link>
              </Tooltip>
            ))}
            {settingsNavigation && (
              <Tooltip content={settingsNavigation.name} theme={TooltipTheme.Dark} placement="right">
                <Link
                  href={settingsNavigation.href}
                  className={classNames(
                    settingsNavigation.current
                      ? "bg-primary-700 text-white"
                      : "text-primary-100 hover:bg-primary-700 hover:text-white",
                    "group mt-auto flex h-20 w-20 flex-col items-center justify-center rounded-md p-3 text-xs font-medium"
                  )}
                  aria-current={settingsNavigation.current ? "page" : undefined}>
                  {/* <settingsNavigation.icon
                    className={classNames(
                      settingsNavigation.current
                        ? 'text-white'
                        : 'text-primary-300 group-hover:text-white',
                      'h-6 w-6'
                    )}
                    aria-hidden="true"
                  /> */}
                  <SidebarIcon
                    src={settingsNavigation.icon}
                    alt={settingsNavigation.name}
                    current={settingsNavigation.current}
                  />
                </Link>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-screen max-w-xs flex-1 flex-col bg-white pb-4 pt-5 sm:w-full">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute right-3 top-1 ml-4 flex pr-2 pt-4 sm:right-0 sm:-mr-12 sm:p-1">
                    <button
                      type="button"
                      className="rounded-md bg-gray-50 text-primary-700 ring-2 ring-primary-300 hover:text-primary-900 focus:outline-none sm:text-gray-500 sm:hover:text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}>
                      <span className="sr-only">Close panel</span>
                      <HiXMark className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="ml-4 flex w-fit flex-shrink-0 items-center px-2.5 py-2.5">
                  <div
                    style={{
                      backgroundImage: `url(${Logo.src})`,
                    }}
                    className="h-9 w-9 bg-contain bg-center bg-no-repeat text-white"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                  <nav className="flex flex-1 flex-col pb-4">
                    <div className="space-y-1">
                      {sidebarNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-primary-50 border-primary-500 text-primary-700"
                              : "border-transparent text-gray-500 hover:border-primary-300 hover:bg-gray-50 hover:text-gray-700",
                            "block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6",
                            "group flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}>
                          {/* <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-primary-700'
                                  : 'text-primary-300 group-hover:text-primary-500',
                                'mr-3 h-6 w-6'
                              )}
                              aria-hidden="true"
                            /> */}
                          <SidebarIcon src={item.icon} alt={item.name} current={item.current} />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </nav>
                  <div className="flex-1 border-t border-gray-200 pb-3 pt-4">
                    <div className="flex items-center gap-2.5 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                          {/* {avatar && <img src={avatar} alt="Avatar" />} */}
                        </span>
                      </div>
                      <div>
                        <div className="text-base font-medium text-gray-800">{/* {user?.name} */}</div>
                        <div className="text-sm font-medium text-gray-500">{/* {user?.email} */}</div>
                      </div>
                      {/* <Notifications /> */}
                    </div>
                    <div className="mt-3 space-y-1">
                      <button
                        className="block rounded-sm px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                        onClick={() => {
                          void signOut();
                        }}>
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Header
        avatar={user?.avatar}
        headerContent={headerContent}
        showMobileMenu
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Content area */}
      <main
        className={classNames(
          "ml-20 flex h-[calc(100vh-4rem)] w-[calc(100vw-5rem)] flex-col overflow-hidden",
          className
        )}>
        {/* Main content */}
        {children}
      </main>
    </div>
  );
}

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

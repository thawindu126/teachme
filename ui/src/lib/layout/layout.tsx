import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import AchievementsIcon from '../../assets/achievements.png';
import ChaptersIcon from '../../assets/chapters.svg';
import HomeIcon from '../../assets/home.svg';
import Logo from '../../assets/logo.png';
import LogoutIcon from '../../assets/logout.svg';
import SessionRecordsIcon from '../../assets/session-records.svg';
import SessionsIcon from '../../assets/sessions.svg';
import SettingsIcon from '../../assets/settings.svg';
import styles from './layout.module.css';
// import { AVATAR_URL } from 'constants/assistant-profile';
// import { Path } from 'constants/paths';
// import Notifications from 'modules/notifications/containers/notifications';
import { Tooltip, TooltipTheme } from '@teachme/ui';
// import useImageFromApi from 'modules/shared/hooks/use-image-from-api';
// import { useAppSelector, useLogout } from 'modules/state/hooks';
import { Path } from '@teachme/types/constants';
import { Fragment, ReactNode, useCallback, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import tailwindColors from 'tailwindcss/colors';

interface LayoutProps {
  children: ReactNode;
  headerContent?: JSX.Element | JSX.Element[];
  className?: string;
  landingPage?: boolean;
}

export function Layout({
  children,
  headerContent,
  className,
  landingPage,
}: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  // const user = useAppSelector((state) => state.auth.authData.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [avatar, { loading: avatarLoading }] = useImageFromApi({
  //   url: AVATAR_URL,
  //   deps: [stockAvatarIndex],
  // });
  const colorForFallbackAvatar = useMemo(
    () =>
      ['red', 'green', 'amber', 'purple', 'slate', 'sky'][
        Math.floor(Math.random() * 6)
      ],
    []
  );
  // const logout = useLogout();

  const isActive = useCallback(
    (path: string, exact = false) => {
      const split = location.pathname.split('/').filter((str) => str.trim());
      if (exact) {
        return split?.[0] === path;
      }

      if (split.length === 1 && split[0] === path) {
        return true;
      }
      const index = split.indexOf(path);
      return index === -1 || index === 0 ? false : true;
    },
    [location]
  );

  const userNavigation = [
    {
      name: 'Assistant Profile',
      onClick: () => navigate('/dashboard/assistant/profile/appearance'),
    },
    {
      name: 'My Profile',
      onClick: () => navigate('/dashboard/settings/my-profile'),
    },
    {
      name: 'Sign out',
      onClick: () => {
        /*  */
      },
      icon: LogoutIcon,
    },
  ];

  const sidebarNavigation = useMemo(
    () => [
      {
        name: 'Home',
        href: Path.HOME,
        icon: HomeIcon,
        current: isActive('dashboard', true),
      },
      {
        name: 'New session',
        href: Path.SESSION_CREATE,
        icon: SessionsIcon,
        current: isActive('session'),
      },
      {
        name: 'Session records',
        href: Path.SESSION_RECORDS,
        icon: SessionRecordsIcon,
        current: isActive('session-records'),
      },
      {
        name: 'Chapters',
        href: Path.CHAPTERS,
        icon: ChaptersIcon,
        current: isActive('chapters'),
      },
      {
        name: 'Achievements',
        href: Path.ACHIEVEMENTS,
        icon: AchievementsIcon,
        current: isActive('achievements'),
      },
      {
        name: 'Settings',
        href: Path.SETTINGS,
        icon: SettingsIcon,
        current: isActive('settings'),
      },
    ],
    [isActive]
  );
  const [mainNavigation, settingsNavigation] = useMemo(
    () => [
      sidebarNavigation.slice(0, -1),
      sidebarNavigation[sidebarNavigation.length - 1],
    ],
    [sidebarNavigation]
  );

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Narrow sidebar */}
      {!landingPage && (
        <div className="hidden md:block fixed left-0 bottom-0 z-30 w-20 h-[calc(100vh-4rem)] bg-primary-700 overflow-x-hidden overflow-y-auto">
          <div className="w-full h-full py-6 flex flex-col items-center">
            <div className="flex flex-col gap-y-2 items-center flex-1 w-full">
              {mainNavigation.map((item) => (
                <Tooltip
                  key={item.name}
                  content={item.name}
                  theme={TooltipTheme.Dark}
                  placement="right"
                >
                  <NavLink
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-primary-600 text-white'
                        : 'text-primary-100 hover:bg-primary-600 hover:text-white',
                      'group w-20 h-20 p-3 rounded-md flex flex-col justify-center items-center text-xs font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {/* <item.icon
                      className={classNames(
                        item.current
                          ? 'text-white'
                          : 'text-primary-300 group-hover:text-white',
                        'h-6 w-6'
                      )}
                      aria-hidden="true"
                    /> */}
                    <SidebarIcon
                      src={item.icon}
                      alt={item.name}
                      current={item.current}
                    />
                  </NavLink>
                </Tooltip>
              ))}
              <Tooltip
                content={settingsNavigation.name}
                theme={TooltipTheme.Dark}
                placement="right"
              >
                <NavLink
                  to={settingsNavigation.href}
                  className={classNames(
                    settingsNavigation.current
                      ? 'bg-primary-600 text-white'
                      : 'text-primary-100 hover:bg-primary-600 hover:text-white',
                    'group w-20 h-20 mt-auto p-3 rounded-md flex flex-col justify-center items-center text-xs font-medium'
                  )}
                  aria-current={settingsNavigation.current ? 'page' : undefined}
                >
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
                </NavLink>
              </Tooltip>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {!landingPage && (
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
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative max-w-xs w-screen sm:w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-1 right-3 sm:right-0 ml-4 pt-4 pr-2 flex sm:-mr-12 sm:p-1">
                      <button
                        type="button"
                        className="rounded-md bg-gray-50 text-primary-600 sm:text-gray-500 sm:hover:text-gray-700 hover:text-primary-900 focus:outline-none ring-2 ring-primary-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 ml-4 px-2.5 py-2.5 flex items-center w-fit">
                    <div
                      style={{
                        backgroundImage: `url(${Logo})`,
                      }}
                      className="w-9 h-9 text-white bg-contain bg-center bg-no-repeat"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                    <nav className="flex flex-col flex-1 pb-4">
                      <div className="space-y-1">
                        {sidebarNavigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-primary-50 border-primary-500 text-primary-700'
                                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-primary-300 hover:text-gray-700',
                              'block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6',
                              'group py-2 px-3 rounded-sm flex items-center text-sm font-medium gap-2'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {/* <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-primary-600'
                                  : 'text-primary-300 group-hover:text-primary-500',
                                'mr-3 h-6 w-6'
                              )}
                              aria-hidden="true"
                            /> */}
                            <img
                              src={item.icon}
                              alt={item.name}
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    </nav>
                    <div className="flex-1 pt-4 pb-3 border-t border-gray-200">
                      <div className="flex items-center px-4 sm:px-6 gap-2.5">
                        <div className="flex-shrink-0">
                          <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                            {/* {avatar && <img src={avatar} alt="Avatar" />} */}
                          </span>
                        </div>
                        <div>
                          <div className="text-base font-medium text-gray-800">
                            {/* {user?.name} */}
                          </div>
                          <div className="text-sm font-medium text-gray-500">
                            {/* {user?.email} */}
                          </div>
                        </div>
                        {/* <Notifications /> */}
                      </div>
                      <div className="mt-3 space-y-1">
                        <button
                          className="block px-4 py-2 text-base font-medium rounded-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                          // onClick={logout}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}

      <header className="w-full h-16">
        <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="w-20 h-16 inline-flex justify-center items-center">
            <div
              style={{ backgroundImage: `url(${Logo})` }}
              className="w-10 h-10 text-white bg-contain bg-center bg-no-repeat"
            />
          </div>
          <div className="flex-1 flex justify-between pr-4 sm:pr-6">
            <div className="flex-1">{headerContent}</div>
            <div className="hidden ml-2 md:flex items-center space-x-4 sm:ml-6 sm:space-x-6">
              {/* <Notifications /> */}
              {/* Profile dropdown */}
              {!landingPage && (
                <Menu as="div" className="relative flex-shrink-0 z-10">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <span className="sr-only">Open user menu</span>
                      {/* {(() => {
                        if (avatarLoading) {
                          return <Loader />;
                        }
                        if (!avatar) {
                          return (
                            <div
                              className="flex justify-center items-center w-12 h-12 rounded-2xl font-bold text-white text-2xl"
                              style={{
                                backgroundColor:
                                  getTailwindColors()[
                                    colorForFallbackAvatar as keyof ReturnType<
                                      typeof getTailwindColors
                                    >
                                  ][500],
                              }}
                            >
                              {user?.name[0].toUpperCase()}
                            </div>
                          );
                        }
                        return (
                          <img
                            className="w-12 h-12 rounded-2xl"
                            src={avatar}
                            alt={user?.name}
                          />
                        );
                      })()} */}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                              onClick={item.onClick}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-md'
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.icon}
                                  alt={item.name}
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </div>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content area */}
      <main
        className={classNames(
          'flex flex-col overflow-hidden h-[calc(100vh-4rem)]',
          styles['container'],
          className,
          landingPage ? 'w-screen' : 'w-[calc(100vw-5rem)] ml-20'
        )}
      >
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
  src: string;
  alt: string;
  current: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={classNames('w-5 h-5', {
        'invert-[9%] sepia-[58%] saturate-[5339%] hue-rotate-[352deg] brightness-[115%] contrast-[104%]':
          current,
        'invert group-hover:invert-[9%] group-hover:sepia-[58%] group-hover:saturate-[5339%] group-hover:hue-rotate-[352deg] group-hover:brightness-[115%] group-hover:contrast-[104%]':
          !current,
      })}
      aria-hidden="true"
    />
  );
}

function getTailwindColors() {
  const { lightBlue, warmGray, trueGray, coolGray, blueGray, ...colors } =
    tailwindColors;
  return colors;
}

export default Layout;

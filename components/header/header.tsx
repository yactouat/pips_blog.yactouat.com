import Link from "next/link";
import { useContext } from "react";

import AppNavLinks from "../app-nav-links/app-nav-links";
import AppDataContext from "@/app-state/app-data/app-data-context";
import HeaderProps from "./HeaderProps";
import LoginIcon from "../icons/login-icon";
import LogoutIcon from "../icons/logout-icon";
import ProfileIcon from "../icons/profile-icon";
import styles from "./header.module.css";
import UserProfileContext from "@/app-state/user-profile/user-profile-context";
import GitHubIcon from "../icons/github-icon";

const toggleMenu = () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerBtn = document.getElementById("hamburger-button");
  mobileMenu!.classList.toggle("hidden");
  mobileMenu!.classList.toggle("flex");
  hamburgerBtn!.classList.toggle("toggle-menu-btn");
};

const Header = ({ page }: HeaderProps) => {
  const { data: appData } = useContext(AppDataContext);
  const { userProfile } = useContext(UserProfileContext);

  if (process.env.NODE_ENV === "development") {
    console.debug("userProfile", userProfile);
    console.debug("page", page);
  }

  return (
    <header
      className={`bg-${
        appData!.theme
      } text-template-dneutral sticky top-0 z-10 h-16`}
    >
      <section className="max-w-4xl mx-auto p-2 flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl sm:font-medium">
          <Link href={`/#hero`} scroll={false}>
            {appData!.title}
          </Link>
        </h1>
        <div className={`w-1/2 ${styles.hamburgerMenuWrapper}`}>
          <button
            id="hamburger-button"
            className="text-3xl lg:hidden cursor-pointer relative w-8 h-8"
            onClick={toggleMenu}
          >
            <div className="bg-template-lbg w-8 h-1 rounded absolute top-4 transition-all duration-500 before:content-dash[''] before:bg-template-lbg before:w-8 before:h-1 before:rounded before:absolute before:-translate-x-4 before:-translate-y-3 before:transition-all before:duration-500 after:content-dash[''] after:bg-template-lbg after:w-8 after:h-1 after:rounded after:absolute after:-translate-x-4 after:translate-y-3 after:transition-all after:duration-500"></div>
          </button>
          <nav
            className="hidden lg:block space-x-8 text-xl"
            aria-label="top-nav"
          >
            <AppNavLinks links={appData!.navLinks} />
          </nav>
        </div>
        <Link
          href="https://github.com/yactouat?tab=repositories&q=pips&type=&language=&sort=name"
          className="hidden lg:block absolute top-1 right-2"
          target="_blank"
        >
          <GitHubIcon />
        </Link>
        {userProfile && page && page != "profile" && (
          <Link href="/profile" className="hidden lg:block">
            <ProfileIcon />
          </Link>
        )}
        {userProfile && page && page == "profile" && (
          <Link href="/logout" className="hidden lg:block">
            <LogoutIcon />
          </Link>
        )}
        {!userProfile && page != "login" && (
          <Link href="/login" className="hidden lg:block">
            <LoginIcon />
          </Link>
        )}
        {page == "login" && (
          <Link href="/login" className="invisible">
            <LoginIcon />
          </Link>
        )}
      </section>
      {/* `origin-top` tells where to start the animation from (e.g. from the top) */}
      <section
        id="mobile-menu"
        className="hidden absolute top-68 bg-template-dbg w-full text-5xl flex-col justify-center origin-top animate-open-menu"
        onClick={toggleMenu}
      >
        <nav
          className="flex flex-col min-h-screen items-center py-8"
          aria-label="mobile-top-nav"
        >
          {userProfile && page && page != "profile" && (
            <Link href="/profile">
              <ProfileIcon />
            </Link>
          )}
          {userProfile && page && page == "profile" && (
            <Link href="/logout">
              <LogoutIcon />
            </Link>
          )}
          {!userProfile && (
            <Link href="/login">
              <LoginIcon />
            </Link>
          )}
          <Link
            href={`/#hero`}
            scroll={false}
            className="w-full text-center py-6 hover:opacity-90"
          >
            Home
          </Link>
          <AppNavLinks mobile={true} links={appData!.navLinks} />
          <Link
            href="https://github.com/yactouat?tab=repositories&q=pips&type=&language=&sort=name"
            target="_blank"
            className="mt-4"
          >
            <GitHubIcon />
          </Link>
        </nav>
      </section>
    </header>
  );
};

export default Header;

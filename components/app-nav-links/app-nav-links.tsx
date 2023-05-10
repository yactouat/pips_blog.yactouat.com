import Link from "next/link";

import AppNavLinksProps from "./AppNavLinksProps";
import styles from "./app-nav-links.module.css";

const AppNavLinks = ({ links, mobile }: AppNavLinksProps) => {
  const mobileClass = mobile
    ? "w-full text-center py-6 hover:opacity-90"
    : `hover:opacity-90`;

  return (
    <div className={`text-right`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={mobileClass}
          scroll={false}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default AppNavLinks;

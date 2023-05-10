import { useContext } from "react";

import AppDataContext from "@/app-state/app-data/app-data-context";
import AppNavLinks from "./app-nav-links/app-nav-links";

const Footer = () => {
  const { data: appData } = useContext(AppDataContext);

  const currentYear =
    new Date().getFullYear() == 2023
      ? "2023"
      : `2023 - ${new Date().getFullYear()}`;

  return (
    <footer className={`bg-${appData!.theme} text-template-dneutral text-xl`}>
      <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between">
        <address className="mb-2">
          <h2>{appData!.legalInfo.name}</h2>
          {appData!.legalInfo.street && (
            <>
              {appData!.legalInfo.street} <br />
            </>
          )}
          {appData!.legalInfo.postalCode}
          <br />
          {appData!.legalInfo.city}, {appData!.legalInfo.country}
          <br />
          Email:{" "}
          <a href={`mailto:${appData!.legalInfo.email}`}>
            {appData!.legalInfo.email}
          </a>
          {appData!.legalInfo.phone && (
            <>
              <br />
              Phone:{" "}
              <a href={`tel:${appData!.legalInfo.phone}`}>
                {appData!.legalInfo.phone}
              </a>
            </>
          )}
        </address>
        <nav className="hidden md:flex flex-col gap-2" aria-label="footer">
          <AppNavLinks links={appData!.navLinks} />
        </nav>
        <div className="flex flex-col sm:gap-2">
          <p className="text-right">
            &copy; <span id="year">{currentYear}</span>, All Rights Reserved
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

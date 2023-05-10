import Image from "next/image";
import { useContext } from "react";

import AppDataContext from "@/app-state/app-data/app-data-context";

export default function Hero() {
  const { data: appData } = useContext(AppDataContext);

  return (
    <>
      <section
        id="hero"
        className="flex flex-col-reverse justify-center md:flex-row p-6 items-center gap-8 mb-12 scroll-mt-40 widescreen:section-min-height tallscreen:section-min-height"
      >
        <article className="sm:w-1/2">
          <h2
            className={`max-w-md text-4xl font-bold text-center sm:text-5xl sm:text-left text-template-lneutralt1 dark:text-template-dneutrals1`}
            dangerouslySetInnerHTML={{
              __html: appData!.mainHeadingHighlightedExpression
                ? appData!.mainHeadingText.replace(
                    appData!.mainHeadingHighlightedExpression,
                    `<span class="secondary-${appData!.theme}">${
                      appData!.mainHeadingHighlightedExpression
                    }</span>`
                  )
                : appData!.mainHeadingText,
            }}
          />
          <p className="max-w-md text-2xl mt-4 text-center sm:text-left text-template-lneutralt2 dark:text-template-dneutrals2">
            {appData!.mainHeadingSubText1}
          </p>
          <p className="max-w-md text-2xl mt-4 text-center sm:text-left text-template-lneutralt2 dark:text-template-dneutrals2">
            {appData!.mainHeadingSubText2
              ? appData!.mainHeadingSubText2
              : `By all means, feel free to use this template as a starting point for
            your next project !`}
          </p>
        </article>
        <Image
          priority
          src={
            appData!.landingImages.hero?.src
              ? appData!.landingImages.hero?.src
              : `https://cdn.jsdelivr.net/gh/yactouat/pips_theme_${
                  appData!.theme
                }@master/images/rocket_dab.jpg`
          }
          alt={
            appData!.landingImages.hero?.alt
              ? appData!.landingImages.hero?.alt
              : `Astronaut riding a rocket and dabbing`
          }
          width={500}
          height={500}
          className="rounded-full"
        />
      </section>
    </>
  );
}

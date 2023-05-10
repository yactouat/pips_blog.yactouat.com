import Image from "next/image";
import { useContext } from "react";

import AppDataContext from "@/app-state/app-data/app-data-context";
import TestimonialProps from "./TestimonialProps";

const Testimonial = ({ testimonial }: TestimonialProps) => {
  const { data: appData } = useContext(AppDataContext);

  return (
    <figure className="my-12">
      <blockquote
        className={`lbg-${
          appData!.theme
        } dark:bg-template-dbg pl-14 pr-8 py-12 rounded-3xl relative`}
      >
        <p className="text-2xl sm:text-3xl text-left mt-2 text-template-dneutral dark:text-template-dneutrals3 before:font-serif before:content-['\201C'] before:absolute before:top-0 before:left-0 before:text-9xl before:text-template-dneutral before:opacity-25 before:transform before:translate-x-2 before:translate-y-2 after:font-serif after:content-['\201D'] after:absolute after:-bottom-20 after:right-0 after:text-9xl after:text-template-dneutral after:opacity-25 after:transform after:-translate-y-2">
          {testimonial.contents}
        </p>
      </blockquote>
      <figcaption className="italic text-xl sm:text-2xl text-right mt-2 text-template-lneutralt3 dark:text-template-dneutrals3">
        &#8212; {testimonial.username}, {testimonial.usertitle}
      </figcaption>
    </figure>
  );
};

export default Testimonial;

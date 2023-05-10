import Image from "next/image";

import CardProps from "./CardProps";
import styles from "./card.module.css";

const Card = ({ data }: CardProps) => {
  return (
    <>
      <li className="w-5/6 sm:w-2/3 flex flex-col items-center border border-solid border-template-lneutralt1 dark:border-template-dneutrals1 bg-template-lbg dark:bg-template-dbg py-6 px-2 rounded-3xl shadow-xl">
        {data.image && (
          <Image
            className="mb-6 rounded-md"
            priority
            src={data.image.src}
            alt={data.image.alt}
            width={data.image.width ? data.image.width : 125}
            height={data.image.height ? data.image.height : 250}
          />
        )}
        <h3 className="text-3xl text-center text-template-lneutralt1 dark:text-template-dneutral">
          {data.title}
        </h3>
        <p className="hidden sm:block text-3xl mt-2 text-center text-template-lneutralt3 dark:text-template-dneutrals3">
          {data.subtext1}
        </p>
        {data.subtext2 && (
          <p className="sm:hidden text-2xl mt-2 text-center text-template-lneutralt3 dark:text-template-dneutrals3">
            {data.subtext2}
          </p>
        )}
      </li>
    </>
  );
};

export default Card;

import Image from "next/image";

import DataCardProps from "./DataCardProps";
import Date from "@/components/date";
import Link from "next/link";
import styles from "./data-card.module.css";

const DataCard = ({ baseUrl, data, dataKey }: DataCardProps) => {

  return (
    <Link
      href={`${baseUrl}/${dataKey}`}
      className={`h-40 sm:h-60 w-full ${styles.dataCard} border border-solid border-template-lneutralt1 dark:border-template-dneutrals1 bg-template-lbg dark:bg-template-dbg px-2 rounded-3xl shadow-xl`}
    >
      <li className="flex flex-col items-center justify-end h-full py-2">
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
        <h3 className="text-ellipsis overflow-hidden h-3/5 text-2xl text-center text-template-lneutralt1 dark:text-template-dneutral flex items-start">
          <span>{data.title}</span>
        </h3>
        <div className="sm:block text-2xl mt-2 text-center text-template-lneutralt3 dark:text-template-dneutrals3">
          <p className="">
            <Date dateString={data.subtext1} />
          </p>
        </div>
        {data.subtext2 && (
          <p className="sm:hidden text-2xl mt-2 text-center text-template-lneutralt3 dark:text-template-dneutrals3"></p>
        )}
      </li>
    </Link>
  );
};

export default DataCard;

import Link from "next/link";

import GoToAuthProps from "./GoToAuthProps";
import styles from "./go-to-auth.module.css";

const GoToAuth = ({ message, page, theme }: GoToAuthProps) => {
  return (
    <p className="mt-8 text-base">
      {`${message} ? go to`}
      <Link href={`/${page}`} className={`secondary-${theme} p-2 w-48`}>
        {page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ")}
      </Link>
    </p>
  );
};

export default GoToAuth;

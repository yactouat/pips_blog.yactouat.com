import Image from "next/image";

import BlogPostCardProps from "./BlogPostCardProps";
import styles from "./blog-post-card.module.css";
import Date from "@/components/date";
import Link from "next/link";

const BlogPostCard = ({ data, slug }: BlogPostCardProps) => {
  return (
    <Link
      href={`/posts/${slug}`}
      className="h-40 sm:h-60 w-full sm:w-2/6 border border-solid border-template-lneutralt1 dark:border-template-dneutrals1 bg-template-lbg dark:bg-template-dbg px-2 rounded-3xl shadow-xl"
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
        <h3 className="text-ellipsis overflow-hidden h-3/5 text-3xl text-center text-template-lneutralt1 dark:text-template-dneutral flex items-start">
          <span>{data.title}</span>
        </h3>
        <div className="sm:block text-3xl mt-2 text-center text-template-lneutralt3 dark:text-template-dneutrals3">
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

export default BlogPostCard;

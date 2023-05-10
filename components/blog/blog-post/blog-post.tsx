import Date from "@/components/date";
import BlogPostProps from "./BlogPostProps";
import styles from "./blog-post.module.css";

const BlogPost = ({ contents, date }: BlogPostProps) => {
  return (
    <article>
      <div className="text-template-lneutralt3 dark:text-template-dneutrals3 underline my-8 text-lg">
        <span>Last updated: </span>
        <Date dateString={date} />
      </div>
      <div
        className={`blogPostContainer prose prose-lg text-template-lneutralt3 dark:text-template-dneutrals1 ${styles.blogPostContainer}`}
        dangerouslySetInnerHTML={{ __html: contents }}
      />
    </article>
  );
};

export default BlogPost;

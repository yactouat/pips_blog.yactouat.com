import AppSection from "../../app-section/app-section";
import BlogPostCard from "../blog-post-card/blog-post-card";
import BlogPostsListProps from "./BlogPostsListProps";
import styles from "./blog-posts-list.module.css";

const BlogPostsList = ({ posts }: BlogPostsListProps) => {
  return (
    <AppSection id="articles" title={"Articles"}>
      <ul className={`list-none mx-auto my-12 gap-8 ${styles.list}`}>
        {posts.map((post) => (
          <BlogPostCard
            key={post.slug}
            data={{
              subtext1: post.date,
              title: post.title,
            }}
            slug={post.slug}
          />
        ))}
      </ul>
    </AppSection>
  );
};

export default BlogPostsList;

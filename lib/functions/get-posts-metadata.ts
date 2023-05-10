import { BlogPostMetaDto } from "pips_shared/dist/dtos";

const getPostsMetadata = async (): Promise<BlogPostMetaDto[]> => {
  try {
    const postsDataAPICall = await fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/blog-posts/published"
        : "https://api.yactouat.com/blog-posts/published"
    );
    const postsDataJSON = await postsDataAPICall.json();
    const postsData = postsDataJSON.data;
    return postsData.map((post: BlogPostMetaDto) => {
      return {
        date: post.date,
        slug: post.slug,
        status: post.status,
        title: post.title,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getPostsMetadata;

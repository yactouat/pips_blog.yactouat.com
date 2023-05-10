import getPostsMetadata from "./get-posts-metadata";

export const getAllPostsSlugs = async () => {
  const postsMetadata = await getPostsMetadata();
  return postsMetadata.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
};

export default getAllPostsSlugs;

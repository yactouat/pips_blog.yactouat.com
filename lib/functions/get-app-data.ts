import postProcessBlogPostImagesUrls from "pips_shared/dist/functions/post-process-blog-post-images-urls";
import remarkParse from "remark-parse";
import remarkHtml, { Root } from "remark-html";
import {Plugin, unified} from "unified";

import BlogArticleAppData from "../interfaces/business/blog-article-app-data";
import BlogArticlesAppData from "../interfaces/business/blog-articles-app-data";
import getPostsMetadata from "./get-posts-metadata";
import getPublishedPostData from "pips_shared/dist/functions/get-published-post-data";
import STATIC_APP_DATA from "@/STATIC_APP_DATA";

const processor = unified()
  .use(remarkParse)
  .use(remarkHtml as Plugin<[], Root, string>);

const getAppData = async (
  withBlogPostsList: boolean = false,
  singlePostSlug?: string
): Promise<{
  props: {
    appData: BlogArticlesAppData | BlogArticleAppData;
  };
}> => {
  if (
    !process.env.APP_THEME ||
    !process.env.APP_TITLE ||
    !process.env.APP_THEME_COLOR ||
    !process.env.APP_DESCRIPTION ||
    !process.env.APP_URL ||
    (process.env.NODE_ENV != "development" && !process.env.PUBSUB_TOKEN_AUDIENCE) ||
    (process.env.NODE_ENV != "development" && !process.env.PUBSUB_TOKEN_EMAIL)
  ) {
    throw new Error("all env vars must be set");
  }
  try {
    if (withBlogPostsList) {
      const blogPostsList = await getPostsMetadata();
      const appData = { ...STATIC_APP_DATA, blogPostsList };
      return {
        props: {
          appData,
        },
      };
    }
    if (singlePostSlug) {
      const blogPostData = await getPublishedPostData(singlePostSlug);
      let blogPost = (await processor.process(blogPostData.contents))
        .toString()
        // adding target="_blank" to all content links
        .replace(
          /<a href="/g,
          '<a class="content-links" target="_blank" href="'
        );
      // setting correct image paths
      blogPost = postProcessBlogPostImagesUrls(
        blogPost,
        process.env.BLOG_POSTS_IMAGES_BASE_URL as string
      );
      const appData = { ...STATIC_APP_DATA, blogPost, blogPostData };
      return {
        props: {
          appData,
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      appData: STATIC_APP_DATA,
    },
  };
};

export default getAppData;

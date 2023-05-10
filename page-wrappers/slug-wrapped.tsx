import { useContext } from "react";

import AppDataContext from "@/app-state/app-data/app-data-context";
import AppSection from "@/components/app-section/app-section";
import BlogArticleAppData from "@/lib/interfaces/business/blog-article-app-data";
import BlogPost from "@/components/blog/blog-post/blog-post";
import Date from "@/components/date";
import Head from "next/head";
import MainLayout from "@/components/main-layout/main-layout";

const SlugWrapped = () => {
  const { data: appData } = useContext(AppDataContext);

  const blogPostContents = (appData as BlogArticleAppData)!.blogPost!;
  const blogPostData = (appData as BlogArticleAppData)!.blogPostData;
  const siteTitle = appData!.title;

  return (
    <MainLayout themeColor={appData!.themeColor} page="slug">
      <Head>
        <title>
          {siteTitle} | {blogPostData.title}
        </title>
        <meta
          property="og:title"
          content={siteTitle + " | " + blogPostData.title}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://blog.yactouat.com/posts/${blogPostData.slug}`}
        />
        <meta
          name="description"
          content={siteTitle + " | " + blogPostData.title}
        />
      </Head>
      <AppSection id="post" title={blogPostData.title}>
        <BlogPost contents={blogPostContents} date={blogPostData.date} />
      </AppSection>
    </MainLayout>
  );
};

export default SlugWrapped;

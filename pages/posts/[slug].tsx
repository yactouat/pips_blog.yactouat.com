import AppDataProvider from "@/app-state/app-data/app-data-provider";
import UserProfileProvider from "@/app-state/user-profile/user-profile-provider";

import getAllPostsSlugs from "@/lib/functions/get-all-posts-slugs";
import SlugWrapped from "@/page-wrappers/slug-wrapped";
import getAppData from "@/lib/functions/get-app-data";
import BlogArticleAppData from "@/lib/interfaces/business/blog-article-app-data";

// getting all possible slugs for posts in order to generate static pages
export async function getStaticPaths() {
  const paths = await getAllPostsSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const appData = await getAppData(false, params.slug);
  return appData;
}

// export default function Post({ post }: { post: BlogPostDto }) {
export default function Slug({ appData }: { appData: BlogArticleAppData }) {
  return (
    <AppDataProvider appData={appData}>
      <UserProfileProvider>
        <SlugWrapped />
      </UserProfileProvider>
    </AppDataProvider>
  );
}

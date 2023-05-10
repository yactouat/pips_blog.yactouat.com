import AppDataProvider from "@/app-state/app-data/app-data-provider";
import BlogArticlesAppData from "@/lib/interfaces/business/blog-articles-app-data";
import getAppData from "@/lib/functions/get-app-data";
import LandingWrapped from "@/page-wrappers/landing-wrapped";
import UserProfileProvider from "@/app-state/user-profile/user-profile-provider";

/**
 * static generation of the home page
 *
 * executes server-side at build time;
 * if you need to execute server-side at request time, use `getServerSideProps`;
 * also, if you need client-side data fetching, use `useSWR` instead
 *
 * @returns the list of blog posts metadata as props to pass to the Home component
 */
export async function getStaticProps() {
  const appData = await getAppData(true);
  return appData;
}

export default function Landing({ appData }: { appData: BlogArticlesAppData }) {
  // passing the app data to the AppDataProvider at this stage to avoid hydration errors
  return (
    <AppDataProvider appData={appData}>
      <UserProfileProvider>
        <LandingWrapped />
      </UserProfileProvider>
    </AppDataProvider>
  );
}

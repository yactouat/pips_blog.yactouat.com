import AppData from "@/lib/interfaces/business/app-data";
import AppDataProvider from "@/app-state/app-data/app-data-provider";
import getAppData from "@/lib/functions/get-app-data";
import SignupWrapped from "@/page-wrappers/signup-wrapped";
import UserProfileProvider from "@/app-state/user-profile/user-profile-provider";

export async function getStaticProps() {
  return getAppData();
}

export default function Login({ appData }: { appData: AppData }) {
  return (
    <AppDataProvider appData={appData}>
      <UserProfileProvider>
        <SignupWrapped />
      </UserProfileProvider>
    </AppDataProvider>
  );
}

import AppData from "@/lib/interfaces/business/app-data";
import AppDataProvider from "@/app-state/app-data/app-data-provider";
import getAppData from "@/lib/functions/get-app-data";
import PasswordResetWrapped from "@/page-wrappers/password-reset-wrapped";
import UserProfileProvider from "@/app-state/user-profile/user-profile-provider";

export async function getStaticProps() {
  return getAppData();
}

export default function Login({ appData }: { appData: AppData }) {
  return (
    <AppDataProvider appData={appData}>
      <UserProfileProvider>
        <PasswordResetWrapped />
      </UserProfileProvider>
    </AppDataProvider>
  );
}

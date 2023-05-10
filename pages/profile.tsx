import AppData from "@/lib/interfaces/business/app-data";
import AppDataProvider from "@/app-state/app-data/app-data-provider";
import AppFeedbackProvider from "@/app-state/app-feedback/app-feedback-provider";
import getAppData from "@/lib/functions/get-app-data";
import ProfileWrapped from "@/page-wrappers/profile-wrapped";
import UserProfileProvider from "@/app-state/user-profile/user-profile-provider";

export async function getStaticProps() {
  return getAppData();
}

export default function Profile({ appData }: { appData: AppData }) {
  return (
    <AppDataProvider appData={appData}>
      <AppFeedbackProvider>
        <UserProfileProvider>
          <ProfileWrapped />
        </UserProfileProvider>
      </AppFeedbackProvider>
    </AppDataProvider>
  );
}

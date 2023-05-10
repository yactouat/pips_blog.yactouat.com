import Head from "next/head";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import AppDataContext from "@/app-state/app-data/app-data-context";
import AppSection from "@/components/app-section/app-section";
import MainLayout from "@/components/main-layout/main-layout";
import UserProfileContext from "@/app-state/user-profile/user-profile-context";
import FormWarningMessage from "@/components/form/form-warning-message/form-warning-message";

const LogoutWrapped = () => {
  const router = useRouter();

  const { signOut } = useContext(UserProfileContext);
  const { data: appData } = useContext(AppDataContext);

  useEffect(() => {
    signOut();
    router.push("/");
  }, []);

  return (
    <MainLayout themeColor={appData!.themeColor}>
      <Head>
        <title>{appData!.title} | Log out</title>
      </Head>
      <AppSection id="logout" title={"Logout"}>
        <FormWarningMessage contents="logging you out..." />
      </AppSection>
    </MainLayout>
  );
};

export default LogoutWrapped;

import UserProfileContext from "@/app-state/user-profile/user-profile-context";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import AppDataContext from "@/app-state/app-data/app-data-context";
import CreateProfileData from "@/components/profile-data/create-profile-data";
import MainLayout from "@/components/main-layout/main-layout";

const SignupWrapped = () => {
  const { autoSignIn } = useContext(UserProfileContext);

  const { data: appData } = useContext(AppDataContext);

  const [loading, setLoading] = useState(false);

  // auto sign in on page load
  useEffect(() => {
    setLoading(true);
    autoSignIn().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout themeColor={appData!.themeColor}>
      <Head>
        <title>{appData!.title} | Signup</title>
      </Head>
      {loading && <p>loading...</p>}
      {!loading && <CreateProfileData />}
    </MainLayout>
  );
};

export default SignupWrapped;

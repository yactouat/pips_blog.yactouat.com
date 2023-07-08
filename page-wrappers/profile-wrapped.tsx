import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserProfileModificationType } from "pips_shared/dist/types";

import AppDataContext from "@/app-state/app-data/app-data-context";
import AppFeedbackContext from "@/app-state/app-feedback/app-feedback-context";
import AppSection from "@/components/app-section/app-section";
import {
  COULD_NOT_FETCH_PROFILE_DATA_ERR,
  COULD_NOT_REQUEST_PROFILE_DELETION,
  COULD_NOT_UPDATE_PROFILE_DATA,
  LOADING_OUTPUT,
  PROFILE_DELETED,
  PROFILE_DELETION_REQUEST_SENT,
  PROFILE_UPDATED,
  PROFILE_UPDATED_WITH_MODS,
  WELCOME_BACK,
} from "@/lib/constants/user_messages_constants";
import EditProfileData from "@/components/profile-data/edit-profile-data";
import MainLayout from "@/components/main-layout/main-layout";
import ReadProfileData from "@/components/profile-data/read-profile-data";
import UserProfileContext from "@/app-state/user-profile/user-profile-context";
import UserProfileData from "@/lib/interfaces/business/user-profile-data";

const ProfileWrapped = () => {
  const router = useRouter();

  const { data: appData } = useContext(AppDataContext);

  const {
    autoSignIn,
    confirmUserProfileModification,
    requestUserProfileDeletion,
    updateUserProfile,
    userProfile,
  } = useContext(UserProfileContext);

  const { closeModal, openModal, setModalText } =
    useContext(AppFeedbackContext);

  // UI state
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mainFeedbackOutput, setMainFeedbackOutput] = useState(LOADING_OUTPUT);

  const confirmUserProfileModificationLocal = async (
    urlEmail: string,
    userProfileModificationType: UserProfileModificationType,
    urlToken: string,
    urlUserId: string
  ): Promise<void> => {
    openModal(LOADING_OUTPUT);
    try {
      await confirmUserProfileModification(
        urlEmail,
        userProfileModificationType,
        urlToken,
        urlUserId
      );
      switch (userProfileModificationType) {
        case "authtoken":
          setModalText(WELCOME_BACK);
          toggleEditMode();
          break;
        case "deletetoken":
          setModalText(PROFILE_DELETED);
          break;
        case "modifytoken":
        case "veriftoken":
          setModalText(PROFILE_UPDATED);
          break;
      }
    } catch (err) {
      setModalText(COULD_NOT_UPDATE_PROFILE_DATA);
    }
    setIsLoading(false);
    closeModal();
  };

  const requestUserProfileDeletionLocal = async (): Promise<void> => {
    openModal(LOADING_OUTPUT);
    try {
      await requestUserProfileDeletion(userProfile!);
      setModalText(PROFILE_DELETION_REQUEST_SENT);
    } catch (error) {
      setModalText(COULD_NOT_REQUEST_PROFILE_DELETION);
    }
    setIsLoading(false);
    closeModal();
  };

  const toggleEditMode = (): void => {
    setIsEditMode((prevState) => !prevState);
  };

  const updateUserProfileLocal = async (
    updatedUserData: UserProfileData
  ): Promise<void> => {
    openModal(LOADING_OUTPUT);
    setMainFeedbackOutput(LOADING_OUTPUT);
    let feedbackText = LOADING_OUTPUT;
    try {
      updatedUserData.id = userProfile!.id;
      await updateUserProfile(updatedUserData);
      feedbackText = PROFILE_UPDATED;
      if (userProfile?.hasPendingModifications) {
        feedbackText = PROFILE_UPDATED_WITH_MODS;
      }
    } catch (err) {
      console.error("ERROR ON UPDATING USER PROFILE", err);
      feedbackText = COULD_NOT_UPDATE_PROFILE_DATA;
    }
    setModalText(feedbackText);
    toggleEditMode();
    setIsLoading(false);
    closeModal();
  };

  // auto sign in on page load
  useEffect(() => {
    autoSignIn().then(() => {
      setIsLoading(false);
      if (!userProfile) {
        setMainFeedbackOutput(COULD_NOT_FETCH_PROFILE_DATA_ERR);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // parsing verification token navigation
  useEffect(() => {
    let urlEmail;
    let urlToken;
    let urlUserId: string;
    let modType: "veriftoken" | "modifytoken" | "deletetoken" | "authtoken";
    if (process.env.NODE_ENV === "development") {
      const queryStrings = new URL(window.location.href).searchParams;
      urlToken =
        (queryStrings.get("veriftoken") as string) ??
        (queryStrings.get("modifytoken") as string) ??
        (queryStrings.get("deletetoken") as string) ??
        (queryStrings.get("authtoken") as string) ??
        "";
      modType = queryStrings.get("veriftoken")
        ? "veriftoken"
        : queryStrings.get("modifytoken")
        ? "modifytoken"
        : queryStrings.get("deletetoken")
        ? "deletetoken"
        : "authtoken";
      urlEmail = queryStrings.get("email") as string;
      urlUserId = queryStrings.get("userid") as string;
    } else {
      urlToken =
        (router.query.veriftoken as string) ??
        (router.query.modifytoken as string) ??
        (router.query.deletetoken as string) ??
        (router.query.authtoken as string) ??
        "";
      modType = router.query.veriftoken
        ? "veriftoken"
        : router.query.modifytoken
        ? "modifytoken"
        : router.query.deletetoken
        ? "deletetoken"
        : "authtoken";
      urlEmail = router.query.email as string;
      urlUserId = router.query.userid as string;
    }
    if (
      urlEmail != null &&
      urlToken != null &&
      urlUserId != null &&
      /^\d+$/.test(urlUserId)
    ) {
      confirmUserProfileModificationLocal(
        urlEmail,
        modType,
        urlToken,
        urlUserId
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <MainLayout page="profile" themeColor={appData!.themeColor}>
      <Head>
        <title>{appData!.title} | Profile</title>
        {/* scripts that need to be loaded ASAP should go here */}
        <meta name="robots" content="noindex" />
      </Head>
      {(isLoading || !userProfile) && (
        <AppSection id="profile-error" title="Profile Error">
          <p>{mainFeedbackOutput}</p>
        </AppSection>
      )}
      {!isLoading && userProfile && !isEditMode && (
        <ReadProfileData toggleEditMode={toggleEditMode} />
      )}

      {!isLoading && userProfile && userProfile.verified && isEditMode && (
        <EditProfileData
          requestUserProfileDeletionLocal={requestUserProfileDeletionLocal}
          toggleEditMode={toggleEditMode}
          updateUserProfileLocal={updateUserProfileLocal}
        />
      )}
    </MainLayout>
  );
};

export default ProfileWrapped;

import { FormEventHandler, useContext, useState } from "react";
import Link from "next/link";
import { SocialHandleType } from "pips_shared/dist/types";
import { useRouter } from "next/router";

import AppDataContext from "@/app-state/app-data/app-data-context";
import AppSection from "../app-section/app-section";
import Button from "../button/button";
import FormInput from "../form/form-input/form-input";
import FormField from "@/components/form/form-field/form-field";
import FormLabel from "@/components/form/form-label/form-label";
import FormMicroCopy from "@/components/form/form-microcopy/form-microcopy";
import FormSelect from "../form/form-select/form-select";
import FormSubmitSection from "../form/form-submit-section/form-submit-section";
import FormWarningMessage from "../form/form-warning-message/form-warning-message";
import FormWrapper from "../form/form-wrapper/form-wrapper";
import GoToAuth from "@/components/go-to-auth/go-to-auth";
import Hr from "../hr";
import FormPasswordConstraints from "../form/form-password-constraints";
import styles from "./profile-data.module.css";
import UserProfileContext from "@/app-state/user-profile/user-profile-context";
import ProfileSocialHandleField from "./profile-social-handle-field";
import FormPassword from "../form/form-password/form-password";

const CreateProfileData = () => {
  const router = useRouter();

  const { createUserProfile, userProfile } = useContext(UserProfileContext);

  const { data: appData } = useContext(AppDataContext);

  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [email, setUserEmail] = useState("");
  const [userSocialHandle, setUserSocialHandle] = useState("");
  const [userSocialHandleType, setUserSocialHandleType] = useState<
    SocialHandleType | ""
  >("");
  const [userSocialHandleTypeError, setUserSocialHandleTypeError] = useState<
    string | null
  >(null);

  const createUserProfileLocal = async () => {
    setSignupLoading(true);
    try {
      await createUserProfile({
        email,
        password,
        socialhandle: userSocialHandle,
        socialhandletype: userSocialHandleType as SocialHandleType,
      });
      router.push("/");
    } catch (error) {
      setSignupError(true);
      setSignupLoading(false);
    }
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (userSocialHandleType) {
      await createUserProfileLocal();
    } else {
      setUserSocialHandleTypeError("please select a social handle type");
    }
  };

  return (
    <AppSection id="profile-create" title="">
      {signupLoading && <FormWarningMessage contents="signing you up..." />}
      {!signupLoading && userProfile && (
        <>
          <FormWarningMessage contents="please logout before creating a new account" />{" "}
          {/* TODO test */}
          <Button text="Logout" clickHandler={() => router.push("/logout")} />
        </>
      )}
      {!userProfile && !signupLoading && (
        <>
          <FormWrapper
            handleSubmit={handleSubmit}
            submitBtnText="Create Profile"
            title="Create your profile"
          >
            {signupError && (
              <FormWarningMessage
                contents="something went wrong, could not sign you up"
                small={true}
              />
            )}
            {userSocialHandleTypeError && (
              <FormWarningMessage
                contents={userSocialHandleTypeError}
                small={true}
              />
            )}
            <FormField>
              <FormLabel htmlFor="email" text="email" />
              <FormInput
                autocomplete="email"
                id="email"
                name="email"
                onChange={(e) => setUserEmail(e.target.value)}
                required={true}
                type="email"
                value={email}
              />
            </FormField>

            <ProfileSocialHandleField
              setUserSocialHandle={setUserSocialHandle}
              setUserSocialHandleType={setUserSocialHandleType}
              userSocialHandle={userSocialHandle}
              userSocialHandleType={userSocialHandleType}
            />

            <FormPassword
              autocomplete="new-password"
              id="new-password"
              name="new-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormWrapper>
          <Hr />
          <div className="flex flex-col items-center">
            <GoToAuth
              message="already have an account"
              page="login"
              theme={appData!.theme}
            />
          </div>
        </>
      )}
    </AppSection>
  );
};

export default CreateProfileData;

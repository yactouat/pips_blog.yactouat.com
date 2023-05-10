import {
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import { SocialHandleType } from "pips_shared/dist/types";

import AppSection from "../app-section/app-section";
import Button from "@/components/button/button";
import EditProfileDataProps from "./EditProfileDataProps";
import FormField from "@/components/form/form-field/form-field";
import FormInput from "../form/form-input/form-input";
import FormLabel from "@/components/form/form-label/form-label";
import FormPasswordConstraints from "../form/form-password-constraints";
import FormWarningMessage from "../form/form-warning-message/form-warning-message";
import FormWrapper from "../form/form-wrapper/form-wrapper";
import Hr from "../hr";
import ProfileSocialHandleField from "./profile-social-handle-field";
import styles from "./profile-data.module.css";
import UserProfileContext from "@/app-state/user-profile/user-profile-context";
import UserProfileData from "@/lib/interfaces/business/user-profile-data";
import FormPassword from "../form/form-password/form-password";

const EditProfileData = ({
  requestUserProfileDeletionLocal,
  toggleEditMode,
  updateUserProfileLocal,
}: EditProfileDataProps) => {
  const { userProfile } = useContext(UserProfileContext);

  const [userEmail, setUserEmail] = useState(userProfile!.email);
  const [password, setPassword] = useState("");
  const [userSocialHandle, setUserSocialHandle] = useState(
    userProfile!.socialhandle
  );
  const [userSocialHandleType, setUserSocialHandleType] = useState<
    SocialHandleType | ""
  >(userProfile!.socialhandletype ?? "");

  const handleDelete: MouseEventHandler = (e) => {
    e.preventDefault();
    requestUserProfileDeletionLocal();
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (userSocialHandleType != "") {
      let updatePayload: UserProfileData = {
        email: userEmail,
        socialhandle: userSocialHandle,
        socialhandletype: userSocialHandleType,
      };
      if (password != "") {
        updatePayload.password = password;
      }
      updateUserProfileLocal(updatePayload);
    }
  };

  return (
    <AppSection id="profile-edits" title="">
      <FormWrapper
        title="Edit your profile data"
        handleSubmit={handleSubmit}
        submitBtnText="Update Profile"
      >
        <div className={`${styles.readableContainer}`}>
          <div className="flex">
            <h3 className={`${styles.headingUnderlined}`}>read profile</h3>
            <span
              className={`${styles.readable}`}
              onClick={toggleEditMode}
              title="read profile"
            >
              {" "}
            </span>
          </div>
          <Button
            clickHandler={handleDelete}
            danger={true}
            text="Delete profile"
          />
        </div>
        {userProfile!.hasPendingModifications && (
          <FormWarningMessage
            contents="your profile has pending modifications that require to be confirmed via an email sent to your inbox"
            small={true}
          />
        )}
        <FormField>
          <FormLabel htmlFor="userEmail" text="email" />
          <FormInput
            id="userEmail"
            name="userEmail"
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            value={userEmail}
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
          required={false}
          value={password}
        />
      </FormWrapper>
    </AppSection>
  );
};

export default EditProfileData;

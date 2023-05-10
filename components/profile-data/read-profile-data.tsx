import { useContext } from "react";

import AppSection from "../app-section/app-section";
import ReadProfileDataProps from "./ReadProfileDataProps";
import styles from "./profile-data.module.css";
import UserProfileContext from "@/app-state/user-profile/user-profile-context";
import FormWrapper from "../form/form-wrapper/form-wrapper";
import FormField from "../form/form-field/form-field";
import FormLabel from "../form/form-label/form-label";
import FormInput from "../form/form-input/form-input";
import FormSelect from "../form/form-select/form-select";
import FormWarningMessage from "../form/form-warning-message/form-warning-message";

const ReadProfileData = ({ toggleEditMode }: ReadProfileDataProps) => {
  const { userProfile } = useContext(UserProfileContext);

  return (
    <AppSection id="profile-edits" title="">
      <FormWrapper title="Read your profile data">
        {userProfile!.verified && (
          <div className={`${styles.editableContainer}`}>
            <h3 className={`${styles.headingUnderlined}`}>edit profile</h3>
            <span
              className={`${styles.editable}`}
              onClick={toggleEditMode}
              title="edit profile"
            >
              {" "}
            </span>
          </div>
        )}
        <FormField>
          <FormLabel htmlFor="userEmail" text="email" />
          <FormInput
            id="userEmail"
            name="userEmail"
            readonly={true}
            type="email"
            value={userProfile!.email}
          />
        </FormField>

        <FormField>
          <FormLabel htmlFor="userSocialHandle" text="social handle" />
          <FormInput
            id="userSocialHandle"
            name="userSocialHandle"
            readonly={true}
            required={true}
            type="text"
            value={userProfile!.socialhandle}
          />
          <FormLabel htmlFor="userSocialHandleType" text="on" />
          <FormSelect
            id="userSocialHandleType"
            name="userSocialHandleType"
            options={[
              { displayed: "GitHub", value: "GitHub" },
              { displayed: "LinkedIn", value: "LinkedIn" },
            ]}
            readonly={true}
            selected={userProfile!.socialhandletype}
          />
        </FormField>
        <FormField>
          <div className="flex">
            <FormLabel
              htmlFor="userVerified"
              small={true}
              text="profile is verified"
            />
            <b>{userProfile!.verified ? "✅" : "❌"}</b>
          </div>
          {!userProfile!.verified && (
            <FormWarningMessage
              contents="please click on the verification link sent to your mailbox to verify your profile"
              small={true}
            />
          )}
        </FormField>
      </FormWrapper>
    </AppSection>
  );
};

export default ReadProfileData;

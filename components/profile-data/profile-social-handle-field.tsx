import { Dispatch, SetStateAction } from "react";

import FormField from "../form/form-field/form-field";
import FormInput from "../form/form-input/form-input";
import FormLabel from "../form/form-label/form-label";
import FormMicroCopy from "../form/form-microcopy/form-microcopy";
import FormSelect from "../form/form-select/form-select";
import { SocialHandleType } from "pips_shared/dist/types";
import styles from "./profile-data.module.css";

const ProfileSocialHandleField = ({
  setUserSocialHandle,
  setUserSocialHandleType,
  userSocialHandle,
  userSocialHandleType,
}: {
  setUserSocialHandle: (value: SetStateAction<string>) => void;
  setUserSocialHandleType: Dispatch<SetStateAction<"" | SocialHandleType>>;
  userSocialHandle: string;
  userSocialHandleType: "" | SocialHandleType;
}) => {
  return (
    <FormField>
      <FormLabel htmlFor="userSocialHandle" text="social handle" />
      <FormMicroCopy text="(your social handle is your username on one of the supported social networks)" />
      <FormInput
        id="userSocialHandle"
        name="userSocialHandle"
        onChange={(e) => setUserSocialHandle(e.target.value)}
        required={true}
        type="text"
        value={userSocialHandle}
      />{" "}
      <FormLabel htmlFor="userSocialHandleType" text="on" />
      <FormSelect
        id="userSocialHandleType"
        name="userSocialHandleType"
        onChange={(e) =>
          setUserSocialHandleType(e.target.value as SocialHandleType)
        }
        options={[
          { displayed: "GitHub", value: "GitHub" },
          { displayed: "LinkedIn", value: "LinkedIn" },
        ]}
        value={userSocialHandleType}
        required={true}
      />
    </FormField>
  );
};

export default ProfileSocialHandleField;

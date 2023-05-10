import { SocialHandleType } from "pips_shared/dist/types";

interface UserProfileData {
  id?: number;
  email: string;
  hasPendingModifications?: boolean;
  password?: string;
  socialhandle: string;
  socialhandletype: SocialHandleType;
  verified?: boolean;
}

export default UserProfileData;

import UserProfileModificationType from "@/lib/types/UserProfileModificationType";
import UserProfileData from "../../business/user-profile-data";

interface UserProfileContext {
  autoSignIn: () => Promise<void>;
  confirmUserProfileModification: (
    urlEmail: string,
    userProfileModificationType: UserProfileModificationType,
    urlToken: string,
    urlUserId: string
  ) => Promise<void>;
  createUserProfile: (user: UserProfileData) => Promise<void>;
  requestUserProfileDeletion: (user: UserProfileData) => Promise<void>;
  signOut: () => void;
  updateUserProfile: (user: UserProfileData) => Promise<void>;
  userProfile: UserProfileData | null;
}

export default UserProfileContext;

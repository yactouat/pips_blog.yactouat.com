import { createContext } from "react";
import { UserProfileModificationType } from "pips_shared/dist/types";

import UserProfileContextInterface from "@/lib/interfaces/state/user-profile/user-profile-context";
import UserProfileDataInterface from "@/lib/interfaces/business/user-profile-data";

const UserProfileContext = createContext<UserProfileContextInterface>({
  autoSignIn: async () => new Promise(() => null),
  confirmUserProfileModification: async (
    urlEmail: string,
    userProfileModificationType: UserProfileModificationType,
    urlToken: string,
    urlUserId: string
  ) => new Promise(() => null),
  createUserProfile: async (user: UserProfileDataInterface) =>
    new Promise(() => null),
  requestUserProfileDeletion: async (user: UserProfileDataInterface) =>
    new Promise(() => null),
  signOut: () => null,
  updateUserProfile: async (user: UserProfileDataInterface) =>
    new Promise(() => null),
  userProfile: null,
});

export default UserProfileContext;

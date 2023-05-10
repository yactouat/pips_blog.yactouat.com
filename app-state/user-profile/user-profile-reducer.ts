import UserProfileActionInterface from "@/lib/interfaces/state/user-profile/user-profile-action";
import UserProfileStateInterface from "@/lib/interfaces/state/user-profile/user-profile-state";
import {
  deletePersistedUserData,
  persistUserCredentials,
} from "@/lib/functions/localStorage";

const userProfileReducer = (
  state: UserProfileStateInterface,
  action: UserProfileActionInterface
): UserProfileStateInterface => {
  switch (action.type) {
    case "UNSET_USER_PROFILE":
      deletePersistedUserData();
      return {
        token: "",
        userProfile: null,
      };
    case "REFRESH_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload!.userProfile,
      };
    case "SET_USER_PROFILE":
      persistUserCredentials(
        action.payload!.token!,
        action.payload!.userProfile!.id!
      );
      return {
        ...state,
        token: action.payload!.token,
        userProfile: action.payload!.userProfile,
      };
    default:
      return state;
  }
};

export default userProfileReducer;

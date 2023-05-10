import UserProfileData from "../../business/user-profile-data";

interface UserProfileAction {
  payload?: {
    token?: string;
    userProfile: UserProfileData | null;
  };
  /**
   * the difference between `REFRESH_USER_PROFILE` and `SET_USER_PROFILE` is that
   * `SET_USER_PROFILE` not only refreshes the user profile state, but also
   * processes auth tokens that the backend API may return,
   * and persists the user id and the token in the browser's local storage
   */
  type: "UNSET_USER_PROFILE" | "REFRESH_USER_PROFILE" | "SET_USER_PROFILE";
}

export default UserProfileAction;

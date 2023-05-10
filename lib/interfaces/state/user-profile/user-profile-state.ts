import UserProfileData from "../../business/user-profile-data";

interface UserProfileState {
  hasPendingDeletion?: boolean;
  token?: string;
  userProfile: UserProfileData | null;
}

export default UserProfileState;

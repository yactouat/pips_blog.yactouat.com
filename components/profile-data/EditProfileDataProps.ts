import UserProfileData from "@/lib/interfaces/business/user-profile-data";

interface EditProfileDataProps {
  requestUserProfileDeletionLocal: () => void;
  toggleEditMode: () => void;
  updateUserProfileLocal: (updatedUserData: UserProfileData) => void;
}

export default EditProfileDataProps;

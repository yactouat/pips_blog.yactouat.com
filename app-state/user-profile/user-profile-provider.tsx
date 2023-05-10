import axios from "axios";
import { ReactNode, useReducer } from "react";

import getAuthHeaders from "@/lib/functions/get-auth-headers";
import {
  getPersistedUserAuthToken,
  getPersistedUserId,
} from "@/lib/functions/localStorage";
import signUserInCall from "@/lib/functions/sign-user-in-call";
import UserProfileContext from "./user-profile-context";
import UserProfileData from "@/lib/interfaces/business/user-profile-data";
import UserProfileModificationType from "@/lib/types/UserProfileModificationType";
import userProfileReducer from "./user-profile-reducer";
import { USERS_API_ENDPOINT } from "@/lib/constants/conf_constants";

const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userProfileReducer, {
    userProfile: null,
  });

  const autoSignIn = async (): Promise<void> => {
    const token = getPersistedUserAuthToken();
    const userId = getPersistedUserId();
    if (token == "" || !userId) {
      dispatch({
        type: "UNSET_USER_PROFILE",
      });
      return;
    }
    const fetchedUser = await signUserInCall(token, userId);
    if (fetchedUser) {
      dispatch({
        type: "REFRESH_USER_PROFILE",
        payload: {
          userProfile: fetchedUser,
        },
      });
    } else {
      dispatch({
        type: "UNSET_USER_PROFILE",
      });
    }
  };

  const confirmUserProfileModification = async (
    urlEmail: string,
    userProfileModificationType: UserProfileModificationType,
    urlToken: string,
    urlUserId: string
  ): Promise<void> => {
    const confirmModCall = await axios.put(
      `${USERS_API_ENDPOINT}${urlUserId}/process-token`,
      {
        email: urlEmail,
        [userProfileModificationType]: urlToken,
      }
    );
    if (confirmModCall.status === 200) {
      const resPayload = confirmModCall.data.data;
      dispatch({
        type: "SET_USER_PROFILE",
        payload: {
          token: resPayload.token,
          userProfile: resPayload.user,
        },
      });
    } else if (confirmModCall.status === 204) {
      dispatch({
        type: "UNSET_USER_PROFILE",
      });
    } else {
      throw new Error("ERROR ON USER PROFILE MODIFICATION CONFIRMATION");
    }
  };

  const createUserProfile = async (user: UserProfileData): Promise<void> => {
    const createUserProfileCall = await axios.post(`${USERS_API_ENDPOINT}`, {
      email: user.email,
      password: user.password,
      socialhandle: user.socialhandle,
      socialhandletype: user.socialhandletype,
    });
    if (createUserProfileCall.status === 201) {
      dispatch({
        type: "SET_USER_PROFILE",
        payload: {
          token: createUserProfileCall.data.data.token,
          userProfile: createUserProfileCall.data.data.user,
        },
      });
    } else {
      throw new Error("ERROR ON USER PROFILE CREATION");
    }
  };

  const requestUserProfileDeletion = async (
    user: UserProfileData
  ): Promise<void> => {
    const userProfileDeletionCall = await axios.delete(
      `${USERS_API_ENDPOINT}${user.id}`,
      getAuthHeaders(getPersistedUserAuthToken())
    );
    if (userProfileDeletionCall.status === 200) {
      dispatch({
        type: "REFRESH_USER_PROFILE",
        payload: {
          userProfile: userProfileDeletionCall.data.data,
        },
      });
      return;
    }
    throw new Error("ERROR ON USER PROFILE DELETION");
  };

  const signOut = () => {
    dispatch({
      type: "UNSET_USER_PROFILE",
    });
  };

  const updateUserProfile = async (user: UserProfileData): Promise<void> => {
    const updateUserProfileCall = await axios.put(
      `${USERS_API_ENDPOINT}${user.id!}`,
      user,
      getAuthHeaders(getPersistedUserAuthToken())
    );
    if (updateUserProfileCall.status === 200) {
      dispatch({
        type: "SET_USER_PROFILE",
        payload: {
          token: updateUserProfileCall.data.data.token,
          userProfile: updateUserProfileCall.data.data.user,
        },
      });
    } else {
      throw new Error("ERROR ON USER PROFILE UPDATE");
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        autoSignIn,
        confirmUserProfileModification,
        createUserProfile,
        requestUserProfileDeletion,
        signOut,
        updateUserProfile,
        userProfile: state.userProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;

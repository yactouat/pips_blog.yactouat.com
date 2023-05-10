import axios from "axios";

import getAuthHeaders from "./get-auth-headers";
import UserProfileDataInterface from "../interfaces/business/user-profile-data";
import { USERS_API_ENDPOINT } from "../constants/conf_constants";

const signUserInCall = async (
  userAuthToken: string,
  userId: number
): Promise<UserProfileDataInterface | null> => {
  try {
    const call = await axios.get(
      `${USERS_API_ENDPOINT}${userId}`,
      getAuthHeaders(userAuthToken)
    );
    if (call.status === 200) {
      console.info("SIGN IN CALL RESULT", call.data.data);
      return call.data.data;
    }
    return null;
  } catch (error) {
    console.error("SIGN IN CALL ERROR", error);
    return null;
  }
};

export default signUserInCall;

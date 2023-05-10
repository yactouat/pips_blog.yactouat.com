const getAuthHeaders = (userAuthToken: string) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userAuthToken}`,
    },
  };
};

export default getAuthHeaders;

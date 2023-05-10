export const MODAL_TIMEOUT = 2000;
export const TOKENS_API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8080/tokens/`
    : `https://api.yactouat.com/tokens/`;
export const USERS_API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8080/users/`
    : `https://api.yactouat.com/users/`;

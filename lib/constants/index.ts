export const api_endpoints = {
  CREATE_USER: "/users/create",
  UPDATE_USER: "/users/update",
  GET_USER_BY_TOKEN: "/users/", // pass user's token as a param
  GET_ALL_USERS: "/users",
  GET_ALL_MESSAGES: "/messages",
  SAVE_CALL: "/calls/save",
  DELETE_CALL: "/calls/delete",
};

export const CRYPTO_SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;

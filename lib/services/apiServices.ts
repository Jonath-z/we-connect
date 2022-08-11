import { ICreateUser, ISaveCall, IUpdateUser } from "lib/models";
import http from "./http";
import { api_endpoints } from "lib/constants";

const {
  CREATE_USER,
  UPDATE_USER,
  GET_USER_BY_TOKEN,
  GET_ALL_USERS,
  GET_ALL_MESSAGES,
  SAVE_CALL,
  DELETE_CALL,
} = api_endpoints;

class ApiService {
  async createUser(user: ICreateUser) {
    try {
      const response = await http.put(CREATE_USER, user);

      return {
        response,
        error: null,
      };
    } catch (err) {
      console.log("err when creatating a user", err);
      return {
        response: null,
        error: err,
      };
    }
  }

  async findAllUser() {
    try {
      const response = await http.get(GET_ALL_USERS);

      console.log("all users", response.data);

      return {
        response: response.data,
        error: null,
      };
    } catch (err) {
      console.log("error when finding all users", err);

      return {
        response: null,
        error: err,
      };
    }
  }

  async updateUser(user: IUpdateUser) {
    try {
      const response = await http.post(UPDATE_USER, user);

      return {
        response,
        error: null,
      };
    } catch (err) {
      console.log("getting error on update user ", err);
      return {
        response: null,
        error: err,
      };
    }
  }

  async findByTokenOrUsername(userTokenOrUsername: string) {
    try {
      const response = await http.get(GET_USER_BY_TOKEN + userTokenOrUsername);

      return {
        response: response.data.user,
        error: null,
      };
    } catch (err) {
      console.log("err", err);
      return {
        response: null,
        error: err,
      };
    }
  }

  async findAllMessages() {
    try {
      const response = await http.get(GET_ALL_MESSAGES);

      return {
        response: response.data,
        error: null,
      };
    } catch (err) {
      return {
        response: null,
        error: err,
      };
    }
  }

  async savecall(call: ISaveCall) {
    try {
      const response = await http.put(SAVE_CALL, call);

      return {
        response: response.data,
        error: null,
      };
    } catch (err) {
      return {
        response: null,
        error: err,
      };
    }
  }

  async deleteCall(id: number) {
    try {
      const response = await http.delete(DELETE_CALL + id);

      return {
        response: response.data,
        error: null,
      };
    } catch (err) {
      return {
        response: null,
        error: err,
      };
    }
  }
}

const apiServices = new ApiService();

export default apiServices;

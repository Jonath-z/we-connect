import { ICreateUser, IUpdateUser } from "lib/models";
import http from "./http";
import { api_endpoints } from "lib/constants";

const { CREATE_USER, UPDATE_USER, GET_USER_BY_TOKEN } = api_endpoints;

class ApiService {
  async createUser(user: ICreateUser) {
    try {
      const response = await http.put(CREATE_USER, user);

      console.log("user creation response", response);

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

  async findUserByTokenId(userToken: string) {
    try {
      const response = await http.get(GET_USER_BY_TOKEN + userToken);

      return {
        response,
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

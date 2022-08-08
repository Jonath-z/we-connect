import { ICreateUser } from "lib/models";
import apiServices from "./apiServices";
import localStorageServices from "./localStorage";
import * as rand from "random-key";

class Auth {
  onGoogleLoginSuccess(response: any) {
    console.log("login success", response);

    const user: ICreateUser = {
      username: response.profileObj.givenName,
      userProfileUrl: response.profileObj.imageUrl,
      userToken: rand.generate(),
    };

    (async () => {
      const { response, error } = await apiServices.createUser(user);

      if (error) {
        console.log("getting error", error);
      } else {
        window.location.href = `/home/${response?.data.user.userToken}`;
        localStorageServices.setItem(
          "_we_connect_account_id",
          response?.data.user.userToken
        );
      }
    })();
  }

  onGoogleLoginFailure(response: any) {
    console.log("login fail", response);
  }
}

const auth = new Auth();

export default auth;
